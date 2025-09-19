'use client';

import { Button } from "@/components/ui/button";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { UserControl } from "./user-control";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        duration: 0.8, 
        ease: [0.23, 1, 0.32, 1],
        type: "spring",
        stiffness: 100
      }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? '  border-b border-gray-200/50 dark:border-gray-800/50 backdrop-blur-xl shadow-lg' 
          : 'bg-transparent border-b border-transparent backdrop-blur-sm'
      }`}
    >
      {/* Gradient overlay for extra visual appeal */}
      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-blue-500/5" />
      
      <div className="max-w-6xl mx-auto w-full flex justify-between items-center px-6 py-4 relative">
        
        {/* Logo with enhanced hover effects */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
          className="relative"
        >
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              className="relative"
              whileHover={{ rotate: [0, -5, 5, 0] }}
              transition={{ duration: 0.5 }}
            >

              {/* Glow effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
            </motion.div>
            <motion.span 
              className="font-bold text-2xl bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 bg-clip-text text-transparent group-hover:from-purple-500 group-hover:to-cyan-500 transition-all duration-300"
              whileHover={{ x: 2 }}
            >
              ResuMate
            </motion.span>
          </Link>
        </motion.div>

        {/* Center Nav Links with modern styling */}
       <SignedIn>
           {/*
        <motion.div
          className="hidden md:flex items-center gap-4 px-4 py-2 rounded-full
                      backdrop-blur-md
                    border border-white/20 shadow-lg"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {[
            { href: "/dashboard", label: "Start Uploading" },
            { href: "/pricing", label: "Pricing" }
          ].map((item, index) => (
            <motion.div
              key={item.href}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link
                href={item.href}
                className="relative px-6 py-2 rounded-full text-base font-semibold
                           dark:text-white
                          transition-all duration-300 hover:text-white group"
              >
                <span className="relative z-10">{item.label}</span>


                <motion.div
                  className="absolute inset-0 rounded-full
                            bg-gradient-to-r from-purple-500 to-blue-500
                            opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  whileHover={{ scale: 1.05 }}
                />


                <div className="absolute inset-0 rounded-full
                                bg-gradient-to-r from-purple-600/40 to-blue-600/40
                                opacity-0 group-hover:opacity-100 blur-md transition-opacity duration-300" />
              </Link>
            </motion.div>
          ))}
        </motion.div>
        */}
      </SignedIn>

        {/* Auth Buttons with enhanced styling */}
        <SignedOut>
          <motion.div 
            className="flex gap-3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <SignUpButton>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <Button
                  variant="outline"
                  size="sm"
                  className="relative cursor-pointer border-2 border-gray-300 hover:border-purple-400 dark:border-gray-600 dark:hover:border-purple-400 transition-all duration-300 hover:shadow-lg hover:shadow-purple-400/25 backdrop-blur-sm"
                >
                  <span className="relative z-10 font-semibold">Sign Up</span>
                  <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/10 to-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </Button>
              </motion.div>
            </SignUpButton>
            
            <SignInButton>
              <motion.div
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="relative group"
              >
                <Button
                  size="sm"
                  className="relative cursor-pointer bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 border-0 font-semibold"
                >
                  <span className="relative z-10">Sign In</span>
                  <motion.div
                    className="absolute inset-0 rounded-md bg-white/20"
                    initial={false}
                    whileHover={{ scale: 1.05, opacity: 0.3 }}
                    transition={{ duration: 0.2 }}
                  />
                </Button>
              </motion.div>
            </SignInButton>
          </motion.div>
        </SignedOut>

        {/* User Dropdown with animation */}
        <SignedIn>
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0, duration: 0.5, type: "spring" }}
            whileHover={{ scale: 1.05 }}
            className="relative"
          >
            <div>
              <UserControl showName />
            </div>
          </motion.div>
        </SignedIn>
      </div>

      {/* Bottom border animation */}
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-transparent via-purple-500 to-transparent"
        initial={{ width: 0 }}
        animate={{ width: isScrolled ? "100%" : "0%" }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      />
    </motion.nav>
  );
};