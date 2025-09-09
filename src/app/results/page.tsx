"use client"
import { useSearchParams } from "next/navigation";

export default function ResultsPage() {
  const searchParams = useSearchParams();
  const rawData = searchParams.get("data");
  const analysis = rawData ? JSON.parse(rawData) : null;

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">AI Resume Analysis</h1>
      {analysis ? (
        <pre className=" p-4 rounded-lg whitespace-pre-wrap">
          {JSON.stringify(analysis, null, 2)}
        </pre>
      ) : (
        <p>No analysis found.</p>
      )}
    </div>
  );
}
