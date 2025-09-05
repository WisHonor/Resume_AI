"use server";

import { extractText } from "@/lib/langchain";
import { prisma } from "@/lib/db";

interface UploadResponse {
  fileUrl: string;
  fileName: string;
}

export async function generateAnalysis({ fileUrl, fileName }: UploadResponse) {
  if (!fileUrl) {
    return {
      success: false,
      message: "File upload failed (no URL found)",
      data: null,
    };
  }

  try {
    // 🔍 Find the file in DB
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

    // ✅ Extract text from PDF
    const pdfText = await extractText(fileUrl);

    // ✅ Update the DB entry with extracted text (optional)
    const updatedFile = await prisma.file.update({
      where: { id: existingFile.id },
      data: {
        fileName,
        updatedAt: new Date(),
        // If you added `content` column in Prisma:
        // content: pdfText,
      },
    });

    return {
      success: true,
      message: "File analyzed successfully",
      data: {
        file: updatedFile,
        pdfText,
      },
    };
  } catch (err: any) {
    console.error("Error analyzing PDF:", err);

    return {
      success: false,
      message: "Error analyzing PDF",
      data: null,
    };
  }
}
