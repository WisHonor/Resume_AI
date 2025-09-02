"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

function MainButton() {
  return (
    <div className="text-center">
      <Link href="/dashboard" passHref>
        <motion.div
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="inline-block"
        >
          <Button
            className="
            
              font-bold 
              cursor-pointer 
              px-12 py-6 
              bg-pink-500 
              text-white 
              rounded-lg 
              shadow-lg 
              transition 
              duration-300 
              ease-in-out 
              hover:bg-pink-600 
              hover:shadow-xl
              focus:outline-none 
              focus:ring-2 
              focus:ring-pink-400 
              focus:ring-opacity-50
              text-2xl
            "
          >
            Get Started
          </Button>
        </motion.div>
      </Link>
    </div>
  );
}

export default MainButton;