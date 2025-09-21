"use client"
import { useSearchParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { ChevronDown, Trophy, Target, Zap, FileText, Brain, Star, ArrowLeft } from "lucide-react";

import { FlippableCard } from "@/components/ui/flippable-card";
import { ClickableTip } from "@/components/ui/clickable-tip";

// Enhanced Card component with glassmorphism
function Card({ children, className = "", variant = "default" }: {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "glass" | "gradient"
}) {
    const baseStyles = "rounded-2xl backdrop-blur-sm border shadow-lg p-6 relative overflow-hidden";

    const variants = {
        default: "bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50",
        glass: "bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/30 backdrop-blur-md",
        gradient: "bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border-gray-200/30 dark:border-gray-700/30"
    };

    return (

        <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
            whileHover={{ y: -4, scale: 1.02 }}
            className={`${baseStyles} ${variants[variant]} ${className}`}
        >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-purple-500/5 to-pink-500/5 opacity-0 transition-opacity duration-300 hover:opacity-100" />
            <div className="relative z-10">
                {children}
            </div>
        </motion.div>
    );
}

// Enhanced Progress component with gradient and glow
function Progress({ value, size = "default" }: { value: number; size?: "default" | "large" }) {
    const v = Math.max(0, Math.min(100, Math.round(value)));
    const height = size === "large" ? "h-4" : "h-3";

    const getGradient = (score: number) => {
        if (score >= 80) return "from-emerald-500 via-green-400 to-teal-500";
        if (score >= 60) return "from-blue-500 via-cyan-400 to-blue-600";
        if (score >= 40) return "from-amber-500 via-yellow-400 to-orange-500";
        return "from-red-500 via-pink-400 to-red-600";
    };

    return (
        <div className="w-full">
            <div
                className={`w-full ${height} rounded-full bg-gray-200/50 dark:bg-gray-700/50 overflow-hidden relative`}
                role="progressbar"
                aria-valuenow={v}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${v} out of 100`}
            >
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${v}%` }}
                    transition={{ type: "spring", stiffness: 80, damping: 20, delay: 0.2 }}
                    className={`${height} bg-gradient-to-r ${getGradient(v)} relative overflow-hidden`}
                >
                    <motion.div
                        animate={{ x: [-100, 200] }}
                        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                        className="absolute inset-0 w-20 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
                    />
                </motion.div>
            </div>
        </div>
    );
}

// Score badge component
function ScoreBadge({ score }: { score: number }) {
    const getColor = (s: number) => {
        if (s >= 80) return "bg-emerald-500 text-white";
        if (s >= 60) return "bg-blue-500 text-white";
        if (s >= 40) return "bg-amber-500 text-white";
        return "bg-red-500 text-white";
    };

    return (
        <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-bold ${getColor(score)} shadow-lg`}
        >
            {score}
        </motion.div>
    );
}

type Tip = { type?: "good" | "improve"; tip?: string; explanation?: string };

function Section({ title, score, tips, examples, icon }: {
    title: string;
    score?: number;
    tips?: Tip[];
    examples?: string[];
    icon: React.ReactNode;
}) {
    const [expanded, setExpanded] = useState(true);
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
            className="group h-full flex flex-col min-h-[600px]"
            examples={examples || []}
            title={`${title} - Examples & Suggestions`}
            onFlip={handleFlip}
        >
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-600 dark:text-blue-400"
                    >
                        {icon}
                    </motion.div>
                    <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                        {title}
                    </h3>
                </div>
                <div className="flex items-center gap-4">
                    {typeof score === "number" && (
                        <div className="flex items-center gap-3">
                            <ScoreBadge score={score} />
                            <div className="w-32" aria-label={`${title} score ${score} out of 100`}>
                                <Progress value={score} />
                            </div>
                        </div>
                    )}
                    <motion.button
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setExpanded(!expanded)}
                        className="p-2 rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 transition-colors"
                    >
                        <motion.div
                            animate={{ rotate: expanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <ChevronDown className="w-5 h-5" />
                        </motion.div>
                    </motion.button>
                </div>
            </div>

            <AnimatePresence>
                {expanded && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {Array.isArray(tips) && tips.length > 0 ? (
                            <div className="flex-1 overflow-y-auto max-h-[450px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
                                <ul className="space-y-3">
                                    {tips.map((t, idx) => (
                                        <ClickableTip
                                            key={idx}
                                            tip={t}
                                            index={idx}
                                            onClick={handleTipClick}
                                        />
                                    ))}
                                </ul>
                            </div>
                        ) : (
                            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                                <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                                <p>No specific tips available for this section</p>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </FlippableCard>
    );
}

export default function ResultsPage() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const rawData = searchParams.get("data");

    const analysis = useMemo(() => {
        try {
            const parsed = rawData ? JSON.parse(rawData) : null;
            return parsed?.data?.aiFeedback?.data ?? null;
        } catch {
            return null;
        }
    }, [rawData]);


    if (!analysis) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 flex items-center justify-center">
                <div className="fixed top-4 left-4 z-50">
                    <button
                        onClick={() => router.push('/dashboard')}
                        aria-label="Go back to home"
                        className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:text-gray-900 hover:bg-pink-400 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span className="hidden sm:inline">Back</span>
                    </button>
                </div>
                <Card variant="glass" className="text-center max-w-md mx-auto">
                    <FileText className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                    <h1 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">No Analysis Found</h1>
                    <p className="text-gray-600 dark:text-gray-400">Please upload a resume to get started with the AI analysis.</p>
                </Card>
            </div>
        );
    }

    const sections = [
        { key: "ATS", title: "ATS Compatibility", score: analysis?.ATS?.score, tips: analysis?.ATS?.tips, examples: analysis?.ATS?.examples, icon: <Target className="w-5 h-5" /> },
        { key: "toneAndStyle", title: "Tone & Style", score: analysis?.toneAndStyle?.score, tips: analysis?.toneAndStyle?.tips, examples: analysis?.toneAndStyle?.examples, icon: <Brain className="w-5 h-5" /> },
        { key: "content", title: "Content Quality", score: analysis?.content?.score, tips: analysis?.content?.tips, examples: analysis?.content?.examples, icon: <Star className="w-5 h-5" /> },
        { key: "structure", title: "Structure & Formatting", score: analysis?.structure?.score, tips: analysis?.structure?.tips, examples: analysis?.structure?.examples, icon: <FileText className="w-5 h-5" /> },
        { key: "skills", title: "Skills Alignment", score: analysis?.skills?.score, tips: analysis?.skills?.tips, examples: analysis?.skills?.examples, icon: <Zap className="w-5 h-5" /> },
    ];

    const overall = Number.isFinite(analysis?.overallScore) ? Math.round(analysis.overallScore) : undefined;

    return (
        <div className="min-h-screen bg-gradient-to-br  dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
            <div className="fixed top-4 left-4 z-50">
                <button
                    onClick={() => router.push('/dashboard')}
                    aria-label="Go back to dashboard"
                    className="inline-flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium cursor-pointer hover:text-gray-900 hover:bg-pink-400 focus:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50"
                >
                    <ArrowLeft className="w-5 h-5" />
                    <span className="hidden sm:inline">Back</span>
                </button>
            </div>
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
                    className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-600/20 rounded-full blur-3xl"
                />
                <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
                    className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-indigo-600/20 rounded-full blur-3xl"
                />
            </div>

            <div className="relative z-10 p-6 md:p-10 max-w-[1400px] mx-auto">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-black mb-5 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Resume Analysis
                    </h1>
                    <p className="text-xl dark:text-gray-300 max-w-2xl mx-auto">
                        AI-powered insights to make your resume stand out to both ATS systems and human recruiters
                    </p>
                </motion.div>

                {/* Overall Score Hero Section */}
                {overall !== undefined && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, duration: 0.6 }}
                        className="mb-10"
                    >
                        <Card variant="glass" className="text-center py-12 bg-gradient-to-br from-white/80 to-blue-50/80 dark:from-gray-800/80 dark:to-gray-900/80">
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                                className="inline-flex items-center justify-center w-32 h-32 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-white mb-6 shadow-2xl"
                            >
                                <span className="text-4xl font-black">{overall}</span>
                            </motion.div>

                            <h2 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">
                                Overall Score
                            </h2>

                            <div className="max-w-md mx-auto mb-6">
                                <Progress value={overall} size="large" />
                            </div>

                            <div className="flex items-center justify-center gap-2 text-lg text-gray-600 dark:text-gray-300">
                                <Trophy className="w-6 h-6 text-yellow-500" />
                                <span>
                  {overall >= 80 ? "Excellent" :
                      overall >= 60 ? "Good" :
                          overall >= 40 ? "Needs Improvement" : "Needs Work"}
                </span>
                            </div>
                        </Card>
                    </motion.div>
                )}

                {/* Quick Stats */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-1 md:grid-cols-3 items-stretch gap-6 mb-10"
                >
                    {sections
                        .filter((s) => typeof s.score === "number")
                        .sort((a, b) => (b.score as number) - (a.score as number))
                        .slice(0, 3)
                        .map((s, i) => (
                            <Card key={i} variant="gradient" className="text-center h-full flex flex-col min-h-[140px]">
                                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                                    {s.score}/100
                                </div>
                                <div className="text-gray-600 dark:text-gray-300">
                                    {s.title}
                                </div>
                                <div className="mt-3">
                                    <Progress value={s.score as number} />
                                </div>
                            </Card>
                        ))}
                    {sections.every((s) => typeof s.score !== "number") && (
                        <Card variant="gradient" className="text-center md:col-span-3 h-full flex flex-col">
                            <div className="text-gray-500 dark:text-gray-400">No highlights available.</div>
                        </Card>
                    )}
                </motion.div>


                {/* Main Analysis Sections */}
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={{
                        hidden: { opacity: 0 },
                        show: { opacity: 1, transition: { staggerChildren: 0.1 } },
                    }}
                    className="grid grid-cols-1 xl:grid-cols-2 items-stretch auto-rows-fr gap-10"
                >
                    {sections.map((s, idx) => {
                        const isLastOdd = sections.length % 2 === 1 && idx === sections.length - 1;

                        return (
                            <motion.div
                                key={s.key}
                                variants={{
                                    hidden: { opacity: 0, y: 30 },
                                    show: { opacity: 1, y: 0 },
                                }}
                                className={`h-full flex flex-col ${isLastOdd ? "xl:col-span-2" : ""}`}
                            >
                                <Section
                                    title={s.title}
                                    score={s.score as number | undefined}
                                    tips={s.tips as Tip[]}
                                    examples={s.examples as string[]}
                                    icon={s.icon}
                                />
                            </motion.div>
                        );
                    })}
                </motion.div>


            </div>
        </div>
    );
}