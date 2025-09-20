"use client"
import React, { useState } from 'react';
import UploadFormInput from './upload-form-input';
import z from 'zod';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from "sonner";
import { generateAnalysis } from '../../../actions/upload-actions';
import { useRouter } from "next/navigation";
import { LoadingSpinner } from '../components/loading';
import { motion } from "framer-motion";
import { UploadCloud, ArrowLeft } from "lucide-react";
import { useUser } from "@clerk/nextjs";

const schema = z.object({
    file: z.instanceof(File, { message: "Invalid file" })
        .refine((file) => file.size <= 4 * 1024 * 1024, "File must be less than 4MB")
        .refine((file) => file.type.startsWith("application/pdf"), {
            message: "File must be a PDF",
        }),
});

export default function Upload() {
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const router = useRouter();
    const { isSignedIn } = useUser();

    const { startUpload } = useUploadThing("pdfUploader", {
        onClientUploadComplete: () => {
            console.log("uploaded successfully!");
        },
        onUploadError: (err) => {
            console.error("error occurred while uploading", err);
            toast.error("Error occurred during upload", {
                description: err.message,
            });
        },
        onUploadBegin: (fileKey: string) => {
            console.log("upload has begun for", fileKey);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Check authentication status before starting upload/analysis
        if (!isSignedIn) {
            toast.error("Not logged in", {
                description: "Please sign in to analyze your resume.",
            });
            return;
        }
        setIsAnalyzing(true);

        const formData = new FormData(e.currentTarget);
        const file = formData.get('file') as File;
        const jobTitle = (formData.get('jobTitle') as string) || "";
        const jobDescription = (formData.get('jobDescription') as string) || "";

        const validatedFields = schema.safeParse({ file });

        if (!validatedFields.success) {
            toast.error("Something went wrong", {
                description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File",
            });
            setIsAnalyzing(false);
            return;
        }

        toast("Uploading your resume...", {
            description: "Your resume is being uploaded...",
        });

        const response = await startUpload([file]).catch((err) => {
            console.error("Upload failed", err);
            return null;
        });
        if (!response) {
            toast.error("Error occurred during upload", {
                description: "Use a different file",
            });
            setIsAnalyzing(false);
            return;
        }

        toast("Processing your resume...", {
            description: "This may take a few seconds",
        });

        const uploadedFile = response[0];
        const fileUrl = uploadedFile?.url;
        const fileName = uploadedFile?.name ?? "unknown.pdf";
        const userId = uploadedFile?.serverData?.userId;

        // Extra safety: if upload succeeded but server reports no user
        if (!userId) {
            toast.error("Not logged in", {
                description: "Please sign in to analyze your resume.",
            });
            setIsAnalyzing(false);
            return;
        }

        if (fileUrl) {
            try {
                const analysis = await generateAnalysis({
                    fileUrl,
                    fileName,
                    userId,
                    jobTitle,
                    jobDescription,
                });

                console.log("AI Analysis:", analysis);
                // Store analysis in sessionStorage to avoid long URLs that can trigger HTTP 431
                if (typeof window !== 'undefined') {
                    try {
                        sessionStorage.setItem('latestAnalysis', JSON.stringify(analysis));
                    } catch (e) {
                        console.warn('Failed to store analysis in sessionStorage', e);
                    }
                }
                // Navigate without large query strings
                router.replace(`/results`);
                return; // ensure no further code runs on this page
            } catch (err) {
                console.error("Analysis failed", err);
                toast.error("Analysis failed", { description: "Please try again." });
                setIsAnalyzing(false);
            }
        } else {
            setIsAnalyzing(false);
        }
    };

    return (
        <div className="font-sans min-h-screen flex flex-col items-center text-center px-6">
            <div className="fixed top-4 left-4">
                <button
                    onClick={() => router.push('/')}
                    aria-label="Go back to home"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:text-gray-900 hover:bg-pink-400 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back</span>
                </button>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-3xl mt-28 mb-16"
            >
                <div className="text-center mb-10">
                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-4xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent"
                    >
                        Upload Your Resume
                    </motion.h1>
                    <p className="mt-2 text-sm">
                        Provide the job title and description so we can tailor the analysis.
                    </p>
                </div>

                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 }}
                    className="rounded-2xl  backdrop-blur-sm border border-gray-200 shadow-lg p-8 text-left"
                >
                    <div className="flex justify-center mb-6">
                        <div className="flex items-center gap-2 text-pink-500">
                            <UploadCloud className="w-6 h-6" />
                            <span className="font-medium">PDF Upload</span>
                        </div>
                    </div>
                    <UploadFormInput onSubmit={handleSubmit} />
                </motion.div>
            </motion.div>

            {isAnalyzing && (
                <LoadingSpinner />
            )}
        </div>
    );
}
