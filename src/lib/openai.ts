import OpenAI from "openai";
import { prepareInstructions } from "../../constants/prompts";


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

export async function generateResumeAnalysis(
  pdfText: string,
  jobTitle: string,
  jobDescription: string
) {
  try {
    // Combine your instruction + resume text
    const prompt = prepareInstructions({ jobTitle, jobDescription, resumeText: pdfText }) + "\n\nResume Content:\n" + pdfText;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o", // ✅ GPT-4o
      messages: [
        {
          role: "system",
          content: "You are a strict JSON generator. Always return valid JSON matching the schema exactly."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      max_completion_tokens: 6000, // Increased for comprehensive analysis with 12+ tips and 20+ examples per section
      response_format: { type: "json_object" }, // ✅ Forces JSON output
    });

    const content = completion.choices[0]?.message?.content ?? "";

    try {
      const parsedData = JSON.parse(content);
      return {
        success: true,
        message: "AI analysis generated successfully",
        data: parsedData,
      };
    } catch (jsonErr) {
      console.error("JSON Parse Error:", jsonErr);
      console.error("Raw AI Response (first 1000 chars):", content.substring(0, 1000));
      console.error("Raw AI Response (last 500 chars):", content.substring(Math.max(0, content.length - 500)));
      console.error("Response length:", content.length);

      // Try to identify if it's a truncation issue
      const isTruncated = !content.trim().endsWith('}') && !content.trim().endsWith(']');
      const errorMessage = isTruncated
        ? "AI response was truncated - increase token limit"
        : "AI returned invalid JSON format";

      return {
        success: false,
        message: errorMessage,
        data: {
          error: errorMessage,
          rawResponse: content.substring(0, 500) + "...", // First 500 chars for debugging
          responseLength: content.length,
          isTruncated
        },
      };
    }
  } catch (error: any) {
    console.error("Error in AI request:", error);
    return {
      success: false,
      message: `Error analyzing PDF: ${error.message}`,
      data: null,
    };
  }
}
