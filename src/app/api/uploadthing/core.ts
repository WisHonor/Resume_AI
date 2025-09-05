import { currentUser } from "@clerk/nextjs/server";
import {createUploadthing, type FileRouter} from "uploadthing/next";
import {UploadThingError} from "uploadthing/server";
import { prisma } from "@/lib/db";

const f = createUploadthing();

export const ourFileRouter = {
    pdfUploader : f({pdf: {maxFileSize: "4MB",}})
    .middleware(async ({req}) => {

        const user = await currentUser();

        if(!user) throw new UploadThingError("Unauthorized");

        return {userId: user.id};

        })
    .onUploadComplete(async({metadata, file}) => {
        console.log("upload completeted for user id", metadata.userId);
        console.log("file url", file.url);
        
        try {
            // Get the user from the database using clerkId
            const user = await prisma.user.findUnique({
                where: {
                    clerkId: metadata.userId
                }
            });

            if (!user) {
                throw new Error("User not found in database");
            }

            // Save file information to database
            const savedFile = await prisma.file.create({
                data: {
                    userId: user.id,
                    fileUrl: file.url,
                    fileName: file.name,
                },
            });

            console.log("File saved to database:", savedFile.id);
            
            return {
                userId: metadata.userId,
                fileUrl: file.url,
                fileName: file.name,
                fileId: savedFile.id,
            };
        } catch (error) {
            console.error("Error saving file to database:", error);
            throw new UploadThingError("Failed to save file information to database");
        }
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;