import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 z-50">
      {/* Glowing Scanner */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-72 h-96 rounded-xl relative overflow-hidden shadow-2xl border-4 border-transparent bg-clip-padding"
        style={{ borderImage: "linear-gradient(to right, #8b5cf6, #3b82f6, #ec4899) 1" }}
      >
        {/* Scanning beam */}
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-20 bg-gradient-to-b from-purple-400/30 via-blue-400/20 to-transparent"
        />

        {/* Decorative glowing borders */}
        <div className="pointer-events-none absolute inset-0 rounded-xl border-2 border-transparent animate-pulse"
             style={{ borderImage: "linear-gradient(to right, rgba(168,85,247,0.6), rgba(59,130,246,0.6), rgba(236,72,153,0.6)) 1" }}
        />
      </motion.div>

      {/* AI Text */}
      <motion.p
        className="mt-8 text-lg tracking-wide font-medium bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"
        animate={{ opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Analyzing your resume with AI...
      </motion.p>
    </div>
  );
}
