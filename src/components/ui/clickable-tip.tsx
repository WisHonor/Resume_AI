"use client";

import React from "react";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";

interface ClickableTipProps {
  tip: {
    type?: "good" | "improve";
    tip?: string;
    explanation?: string;
  };
  index: number;
  onClick: () => void;
}

export function ClickableTip({ tip, index, onClick }: ClickableTipProps) {
  return (
    <motion.li
      key={index}
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.1 }}
      className="group"
    >
      <motion.div
        whileHover={{ scale: 1.02, x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="flex items-start gap-3 p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 border border-gray-200/50 dark:border-gray-700/50 cursor-pointer hover:bg-white/70 dark:hover:bg-gray-800/70 hover:border-gray-300/60 dark:hover:border-gray-600/60 transition-all duration-200"
      >
        <span
          className={`mt-1 p-1 rounded-full ${
            tip?.type === "good"
              ? "bg-emerald-500 text-white"
              : "bg-amber-500 text-white"
          }`}
        >
          {tip?.type === "good" ? "✓" : "!"}
        </span>
        
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <p className="font-semibold text-gray-900 dark:text-white leading-tight">
              {tip?.tip ?? "Suggestion"}
            </p>
            <motion.div
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              whileHover={{ x: 2 }}
            >
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>
          {tip?.explanation && (
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1 leading-relaxed">
              {tip.explanation}
            </p>
          )}
          <div className="mt-2 text-xs text-blue-600 dark:text-blue-400 opacity-70 group-hover:opacity-100 transition-opacity">
            Click to see examples →
          </div>
        </div>
      </motion.div>
    </motion.li>
  );
}
