"use client";

import { useState } from "react";

export default function TestAIPage() {
    const [result, setResult] = useState<any>(null);
    const [loading, setLoading] = useState(false);

    const testAnalysis = async () => {
        setLoading(true);
        try {
            const response = await fetch('/api/test-analysis', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    pdfText: `John Doe
Software Developer
Email: john@example.com
Phone: (555) 123-4567

EXPERIENCE
Software Developer at Tech Corp (2020-2023)
- Developed web applications using React and Node.js
- Worked with databases and APIs
- Collaborated with team members

EDUCATION
Bachelor of Computer Science
University of Technology (2016-2020)

SKILLS
JavaScript, React, Node.js, Python, SQL`,
                    jobTitle: "Senior Software Developer",
                    jobDescription: "We are looking for a Senior Software Developer with experience in React, Node.js, and modern web technologies. The ideal candidate should have strong problem-solving skills and experience with agile development methodologies."
                })
            });

            const data = await response.json();
            setResult(data);
        } catch (error) {
            console.error('Test failed:', error);
            setResult({ success: false, error: error.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen p-8 bg-gray-50">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold mb-8">AI Analysis Test</h1>
                
                <button
                    onClick={testAnalysis}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
                >
                    {loading ? 'Testing...' : 'Test AI Analysis'}
                </button>

                {result && (
                    <div className="mt-8">
                        <h2 className="text-xl font-semibold mb-4">Result:</h2>
                        <pre className="bg-gray-100 p-4 rounded-lg overflow-auto text-sm">
                            {JSON.stringify(result, null, 2)}
                        </pre>
                    </div>
                )}
            </div>
        </div>
    );
}
