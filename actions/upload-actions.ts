"use server";

import { extractText } from "@/lib/langchain";
import { prisma } from "@/lib/db";
import { generateResumeAnalysis } from "@/lib/openai";

interface UploadResponse {
  fileUrl: string;
  fileName: string;
  userId: string;
  jobTitle?: string;       // ✅ pass from client
  jobDescription?: string; // ✅ pass from client
}

export async function generateAnalysis({ fileUrl, fileName, userId, jobTitle = "", jobDescription = "" }: UploadResponse) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed (no URL found)",
      data: null,
    };
  }

  try {
    // 🔍 Find file in DB
    const existingFile = await prisma.file.findUnique({
      where: { fileUrl },
    });

    if (!existingFile) {
      return {
        success: false,
        message: "File not found in database",
        data: null,
      };
    }

    // ✅ Extract text
    const pdfText = await extractText(fileUrl);

    // ✅ Update DB entry (optional)
    const updatedFile = await prisma.file.update({
      where: { id: existingFile.id },
      data: {
        fileName,
        updatedAt: new Date(),
        // content: pdfText, // if you added this column
      },
    });

    // 🤖 Run AI analysis with the extracted text
    const aiFeedback = await generateResumeAnalysis(pdfText, jobTitle, jobDescription);

    return {
      success: true,
      message: "File analyzed successfully",
      data: {
        file: updatedFile,
        pdfText,
        aiFeedback, // ✅ JSON feedback from AI
      },
    };
  } catch (err: any) {
    console.error("Error analyzing PDF:", err); // ✅ full stack trace
    return {
      success: false,
      message: `Error analyzing PDF: ${err.message ?? "Unknown error"}`,
      data: null,
    };
  }
  
}
