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
    const prompt = prepareInstructions({ jobTitle, jobDescription }) + "\n\nResume Content:\n" + pdfText;

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
      max_completion_tokens: 2000, // Adjust based on resume length
      response_format: { type: "json_object" }, // ✅ Forces JSON output
    });

    const content = completion.choices[0]?.message?.content ?? "";

    try {
      return {
        success: true,
        message: "AI analysis generated successfully",
        data: JSON.parse(content), // ✅ Parse JSON safely
      };
    } catch (jsonErr) {
      console.error("JSON Parse Error:", content);
      return {
        success: false,
        message: "AI returned invalid JSON",
        data: content, // Return raw output for debugging
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
