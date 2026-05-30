"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AnimatedGlowBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      
      {/* 
        Top Left Glow 
        Primary / Royal Purple Mix
      */}
      <motion.div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] md:w-[800px] md:h-[800px] rounded-full blur-[100px] opacity-40 md:opacity-50"
        style={{
          background: "radial-gradient(circle, #5D22D8 0%, #2D136F 100%)",
        }}
        animate={{
          x: [0, 50, 0, -30, 0],
          y: [0, 30, -50, 20, 0],
          scale: [1, 1.05, 0.95, 1.02, 1],
          opacity: [0.4, 0.5, 0.45, 0.5, 0.4]
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 
        Center Right Glow 
        Accent Pink / Coral
      */}
      <motion.div
        className="absolute bottom-[20%] right-[-10%] w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full blur-[120px] opacity-30 md:opacity-40"
        style={{
          background: "radial-gradient(circle, #EC2F8F 0%, rgba(255,90,95,0.8) 100%)",
        }}
        animate={{
          x: [0, -40, 20, -10, 0],
          y: [0, 40, -20, 30, 0],
          scale: [1, 1.1, 0.95, 1.05, 1],
          opacity: [0.3, 0.35, 0.25, 0.4, 0.3]
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      {/* 
        Bottom Left Glow 
        Royal Purple / Primary
      */}
      <motion.div
        className="absolute bottom-[-20%] left-[10%] w-[600px] h-[600px] md:w-[800px] md:h-[800px] rounded-full blur-[120px] opacity-30 md:opacity-40"
        style={{
          background: "radial-gradient(circle, #2D136F 0%, rgba(93,34,216,0.5) 100%)",
        }}
        animate={{
          x: [0, 30, -20, 40, 0],
          y: [0, -30, 40, -10, 0],
          scale: [1, 1.05, 0.95, 1.05, 1],
          opacity: [0.3, 0.4, 0.3, 0.45, 0.3]
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />
      
      {/* Subtle Noise Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
