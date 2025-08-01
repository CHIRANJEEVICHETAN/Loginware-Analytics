"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";

export function LampDemo() {
  return (
    <LampContainer>
      <motion.h1
        initial={{ opacity: 0.5, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="mt-8 bg-gradient-to-br from-slate-300 to-slate-500 py-4 bg-clip-text text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
      >
        Industry 4.0 <br /> Analytics Platform
      </motion.h1>
    </LampContainer>
  );
}

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  
  return (
    <div
      className={cn(
        "relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-transparent w-full rounded-md",
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-y-125 items-center justify-center isolate z-0 ">
        <motion.div
          initial={{ opacity: 0, width: "0rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.3, // Reduced from 0.5
            duration: 1.2, // Reduced from 1.5
            ease: "easeOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto right-1/2 h-56 overflow-visible w-[30rem] bg-gradient-conic from-blue-600 via-transparent to-transparent dark:from-cyan-500 text-white [--conic-position:from_70deg_at_center_top]"
        >
          <div className="absolute  w-[100%] left-0 bg-white dark:bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute  w-40 h-[100%] left-0 bg-white dark:bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, width: "0rem" }}
          animate={{ opacity: 1, width: "30rem" }}
          transition={{
            delay: 0.6, // Reduced from 0.8
            duration: 1.2, // Reduced from 1.5
            ease: "easeOut",
          }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`,
          }}
          className="absolute inset-auto left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-blue-600 dark:to-cyan-500 text-white [--conic-position:from_290deg_at_center_top]"
        >
          <div className="absolute  w-40 h-[100%] right-0 bg-white dark:bg-slate-950  bottom-0 z-20 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute  w-[100%] right-0 bg-white dark:bg-slate-950 h-40 bottom-0 z-20 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-white dark:bg-slate-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-blue-600 dark:bg-cyan-500 opacity-50 blur-3xl"></div>
        <motion.div
          initial={{ width: "0rem" }}
          animate={{ width: "16rem" }}
          transition={{
            delay: 0.9, // Reduced from 1.2
            duration: 1.0, // Reduced from 1.2
            ease: "easeOut",
          }}
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-blue-500 dark:bg-cyan-400 blur-2xl"
        ></motion.div>
        <motion.div
          initial={{ width: "0rem" }}
          animate={{ width: "30rem" }}
          transition={{
            delay: 1.1, // Reduced from 1.5
            duration: 1.0, // Reduced from 1.2
            ease: "easeOut",
          }}
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-[7rem] bg-blue-500 dark:bg-cyan-400 "
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-white dark:bg-slate-950 "></div>
      </div>

      <div className="relative z-50 flex -translate-y-72 flex-col items-center px-5">
        {children}
      </div>
    </div>
  );
}; 