"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Lightbulb, CheckCircle2, AlertCircle } from "lucide-react";

interface FlippableCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "glass" | "gradient";
  examples?: string[];
  title?: string;
  onFlip?: (isFlipped: boolean) => void;
}

export function FlippableCard({ 
  children, 
  className = "", 
  variant = "default",
  examples = [],
  title = "Examples & Suggestions",
  onFlip
}: FlippableCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  const baseStyles = "rounded-2xl backdrop-blur-sm border shadow-lg relative overflow-hidden cursor-pointer";
  
  const variants = {
    default: "bg-white/90 dark:bg-gray-900/90 border-gray-200/50 dark:border-gray-700/50",
    glass: "bg-white/10 dark:bg-gray-900/10 border-white/20 dark:border-gray-700/30 backdrop-blur-md",
    gradient: "bg-gradient-to-br from-white/95 to-gray-50/95 dark:from-gray-900/95 dark:to-gray-800/95 border-gray-200/30 dark:border-gray-700/30"
  };

  const handleFlip = () => {
    const newFlippedState = !isFlipped;
    setIsFlipped(newFlippedState);
    onFlip?.(newFlippedState);
  };

  const parseExample = (example: string) => {
    const parts = example.split('. Improved: ');
    if (parts.length === 2) {
      return {
        weak: parts[0].replace('Weak: ', ''),
        improved: parts[1]
      };
    }
    return { weak: example, improved: '' };
  };

  return (
    <div className={`${baseStyles} ${variants[variant]} ${className}`} style={{ perspective: '1000px' }}>
      <motion.div
        className="relative w-full h-full"
        style={{ transformStyle: 'preserve-3d' }}
        animate={{ rotateY: isFlipped ? 180 : 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 w-full h-full p-6"
          style={{ backfaceVisibility: 'hidden' }}
          onClick={examples.length > 0 ? handleFlip : undefined}
        >
          {children}
          {examples.length > 0 && (
            <div className="absolute bottom-4 right-4 opacity-60 hover:opacity-100 transition-opacity">
              <motion.div
                whileHover={{ scale: 1.1 }}
                className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400"
              >
                <Lightbulb className="w-4 h-4" />
                <span>Click for examples</span>
              </motion.div>
            </div>
          )}
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 w-full h-full p-6"
          style={{ 
            backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)'
          }}
        >
          <div className="h-full flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleFlip}
                  className="p-2 rounded-lg bg-blue-500/20 text-blue-600 dark:text-blue-400 hover:bg-blue-500/30 transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                </motion.button>
                <h3 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                  {title}
                </h3>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                <Lightbulb className="w-4 h-4" />
                <span>{examples.length} examples</span>
              </div>
            </div>

            {/* Examples */}
            <div className="flex-1 overflow-y-auto max-h-[500px] pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-transparent">
              <AnimatePresence>
                {examples.length > 0 ? (
                  <div className="space-y-4">
                    {examples.map((example, idx) => {
                      const { weak, improved } = parseExample(example);
                      return (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: idx * 0.1 }}
                          className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50"
                        >
                          {/* Weak Example */}
                          <div className="mb-3">
                            <div className="flex items-start gap-3">
                              <div className="mt-1 p-1 rounded-full bg-red-500/20 text-red-600 dark:text-red-400">
                                <AlertCircle className="w-3 h-3" />
                              </div>
                              <div className="flex-1">
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                  Before:
                                </p>
                                <p className="text-sm text-gray-800 dark:text-gray-200 bg-red-50 dark:bg-red-900/20 p-2 rounded border-l-2 border-red-300 dark:border-red-600">
                                  {weak}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Improved Example */}
                          {improved && (
                            <div>
                              <div className="flex items-start gap-3">
                                <div className="mt-1 p-1 rounded-full bg-green-500/20 text-green-600 dark:text-green-400">
                                  <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                                    After:
                                  </p>
                                  <p className="text-sm text-gray-800 dark:text-gray-200 bg-green-50 dark:bg-green-900/20 p-2 rounded border-l-2 border-green-300 dark:border-green-600">
                                    {improved}
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-gray-500 dark:text-gray-400">
                    <Lightbulb className="w-12 h-12 mb-3 opacity-50" />
                    <p className="text-center">No specific examples available for this section</p>
                  </div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
