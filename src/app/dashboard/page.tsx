"use client"
import React from 'react';
import UploadFormInput from './upload-form-input';
import z from 'zod';
import { useUploadThing } from '@/utils/uploadthing';
import { toast } from "sonner";  // ✅ import directly from sonner
import { generateAnalysis } from '../../../actions/upload-actions';

const schema = z.object({
  file: z.instanceof(File, { message: "Invalid file" })
    .refine((file) => file.size <= 4 * 1024 * 1024, "File must be less than 4MB")
    .refine((file) => file.type.startsWith("application/pdf"), {
      message: "File must be a PDF",
    }),
});

export default function Upload() {
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
    
    const formData = new FormData(e.currentTarget);
    const file = formData.get('file') as File;

    const validatedFields = schema.safeParse({ file });

    if (!validatedFields.success) {
      toast.error("Something went wrong", {
        description: validatedFields.error.flatten().fieldErrors.file?.[0] ?? "Invalid File",
      });
      return;
    }

    toast("Uploading your resume...", {
      description: "Your resume is being uploaded...",
    });

    const response = await startUpload([file]);
    if (!response) {
      toast.error("Error occurred during upload", {
        description: "Use a different file",
      });
      return;
    }

    toast("Processing your resume...", {
      description: "This may take a few seconds",
    });
  

    const uploadedFile = response[0];
    const fileUrl = uploadedFile?.url;
    const fileName = uploadedFile?.name ?? "unknown.pdf";

   
    

    if (fileUrl) {
      const analysis = await generateAnalysis({
        fileUrl,
        fileName,
      
      });
      console.log("AI Analysis:", analysis);
    }
  };

  return (
    <div className='flex flex-col gap-8 w-full max-w-2xl'>
      <UploadFormInput onSubmit={handleSubmit} />
    </div>
  );
}