"use client";

import { useState } from "react";
import { FlippableCard } from "@/components/ui/flippable-card";
import { ClickableTip } from "@/components/ui/clickable-tip";
import { Target, Brain, Star, FileText, Zap } from "lucide-react";
import sampleData from "@/test-data/sample-analysis.json";

type Tip = { type?: "good" | "improve"; tip?: string; explanation?: string };

function TestSection({ title, score, tips, examples, icon }: {
    title: string;
    score?: number;
    tips?: Tip[];
    examples?: string[];
    icon: React.ReactNode;
}) {
    const [isFlipped, setIsFlipped] = useState(false);

    const handleTipClick = () => {
        setIsFlipped(true);
    };

    const handleFlip = (flipped: boolean) => {
        setIsFlipped(flipped);
    };

    return (
        <FlippableCard 
            variant="gradient" 
            className="group h-full flex flex-col min-h-[400px]"
            examples={examples || []}
            title={`${title} - Examples & Suggestions`}
            onFlip={handleFlip}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400">
                        {icon}
                    </div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {title}
                    </h3>
                </div>
                {typeof score === "number" && (
                    <div className="flex items-center gap-3">
                        <div className="inline-flex items-center px-3 py-1 rounded-full text-sm font-bold bg-blue-500 text-white shadow-lg">
                            {score}
                        </div>
                    </div>
                )}
            </div>

            <div className="flex-1">
                {Array.isArray(tips) && tips.length > 0 ? (
                    <ul className="space-y-4">
                        {tips.map((t, idx) => (
                            <ClickableTip
                                key={idx}
                                tip={t}
                                index={idx}
                                onClick={handleTipClick}
                            />
                        ))}
                    </ul>
                ) : (
                    <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                        <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>No specific tips available for this section</p>
                    </div>
                )}
            </div>
        </FlippableCard>
    );
}

export default function TestFlipPage() {
    const sections = [
        { 
            key: "ATS", 
            title: "ATS Compatibility", 
            score: sampleData.ATS.score, 
            tips: sampleData.ATS.tips, 
            examples: sampleData.ATS.examples, 
            icon: <Target className="w-5 h-5" /> 
        },
        { 
            key: "toneAndStyle", 
            title: "Tone & Style", 
            score: sampleData.toneAndStyle.score, 
            tips: sampleData.toneAndStyle.tips, 
            examples: sampleData.toneAndStyle.examples, 
            icon: <Brain className="w-5 h-5" /> 
        },
        { 
            key: "content", 
            title: "Content Quality", 
            score: sampleData.content.score, 
            tips: sampleData.content.tips, 
            examples: sampleData.content.examples, 
            icon: <Star className="w-5 h-5" /> 
        },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-8">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-4">
                        Card Flip Test
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 text-lg">
                        Click on any tip to flip the card and see detailed examples
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                    {sections.map((section) => (
                        <TestSection
                            key={section.key}
                            title={section.title}
                            score={section.score}
                            tips={section.tips as Tip[]}
                            examples={section.examples}
                            icon={section.icon}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
