import { motion } from "framer-motion";

export function LoadingSpinner() {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-black to-gray-800 z-50">
      {/* Glowing Scanner */}
      <motion.div
        animate={{ y: [0, 20, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="w-72 h-96 rounded-xl border-4 border-blue-500 relative overflow-hidden shadow-2xl"
      >
        {/* Scanning beam */}
        <motion.div
          animate={{ y: ["-100%", "100%"] }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="absolute inset-x-0 h-20 bg-gradient-to-b from-blue-400/30 to-transparent"
        />

        {/* Decorative glowing borders */}
        <div className="absolute inset-0 rounded-xl border-2 border-blue-500/50 animate-pulse" />
      </motion.div>

      {/* AI Text */}
      <motion.p
        className="mt-8 text-lg text-blue-300 tracking-wide font-medium"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        Analyzing your resume with AI...
      </motion.p>
    </div>
  );
}
