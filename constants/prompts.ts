// Keep the same name so your existing code doesn’t break.
// Stronger constraints + exact shape + ranges.
export const AIResponseFormat = `
Return a JSON object ONLY, with EXACTLY these fields and nothing else:

{
  "overallScore": number,            // integer 0-100
  "ATS": {
    "score": number,                 // integer 0-100
    "tips": [
      { "type": "good" | "improve", "tip": string }    // 3-4 items, tip is 4-12 words
    ]
  },
  "toneAndStyle": {
    "score": number,                 // integer 0-100
    "tips": [
      { "type": "good" | "improve", "tip": string, "explanation": string } // 3-4 items, 1-3 sentences
    ]
  },
  "content": {
    "score": number,                 // integer 0-100
    "tips": [
      { "type": "good" | "improve", "tip": string, "explanation": string } // 3-4 items, 1-3 sentences
    ]
  },
  "structure": {
    "score": number,                 // integer 0-100
    "tips": [
      { "type": "good" | "improve", "tip": string, "explanation": string } // 3-4 items, 1-3 sentences
    ]
  },
  "skills": {
    "score": number,                 // integer 0-100
    "tips": [
      { "type": "good" | "improve", "tip": string, "explanation": string } // 3-4 items, 1-3 sentences
    ]
  }
}

STRICT RULES:
- Output MUST be valid JSON (no backticks, no trailing commas, no comments).
- Numbers MUST be integers between 0 and 100.
- Each "tips" array MUST have 3 or 4 items, not fewer or more.
- "tip" should be a short title (4-12 words), "explanation" (when present) MUST be 1-3 sentences and <= 80 words.
- Do NOT add fields or change key names.
- Use clear, neutral English.
`;

// Enhanced instructions. Accepts optional resumeText (recommended).
export const prepareInstructions = ({
  jobTitle,
  jobDescription,
  resumeText,
}: {
  jobTitle: string;
  jobDescription: string;
  resumeText?: string; // optional, but strongly recommended
}) => `
You are an expert in ATS (Applicant Tracking Systems) and professional resume writing.
Analyze the resume with respect to modern ATS parsing and recruiter expectations.
Be candid and specific. Low scores are acceptable when warranted.

INPUTS:
- Job Title: "${jobTitle || ""}"
- Job Description: "${jobDescription || ""}"
- Resume Text: ${resumeText ? `"""${resumeText}"""` : "(not provided)"}

EVALUATION PRINCIPLES:
1) Scoring rubric (0-100 integers):
   - ATS: Keyword coverage vs. job description, section labeling (standard headings), parsability (no images-only content, minimal columns/tables, simple bullets), contact info present, consistent encoding.
   - Tone & Style: Active voice, concise bullet points, impactful verbs, tense consistency (past for past roles, present for current), professional tone, no “I/my” usage.
   - Content: Accomplishments over duties, quantified impact (numbers/metrics), relevance to job, elimination of fluff, no contradictions or gaps left unexplained.
   - Structure: Logical sections (Summary, Experience, Education, Skills, optional Projects/Certs), clear hierarchy, consistent formatting, bullet length (ideally <= 2 lines), whitespace, 1–2 pages max.
   - Skills: Alignment with job description (hard skills first), seniority-appropriate tools, no obsolete tech, avoid buzzwords without evidence in experience.

2) ATS alignment:
   - Infer 8–15 high-signal hard skills from the job description (if provided).
   - Penalize ATS score if these are missing from the resume OR present but unsupported in experience.
   - Reward precise terminology matching the job description (e.g., “React” vs “frontend library”).

3) Specificity:
   - Prefer precise, actionable feedback over generic advice.
   - When suggesting improvements, specify where (e.g., “Experience > X Corp, bullet 2” or “Summary section”).

4) Output format:
   - Use EXACTLY the schema below—no extra keys or text.
   - Each "tips" array MUST have 3–4 items.
   - "tip" = short title; "explanation" = why/how to fix (1–3 sentences, <= 80 words).

RETURN FORMAT (STRICT):
${AIResponseFormat}

Return ONLY the JSON object. Do NOT include any other text, code fences, or commentary.
`;
