
import React from 'react';
import { motion } from 'motion/react';

const AnimatedAvatar: React.FC = () => {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-black overflow-hidden">
      {/* Background animated patterns */}
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 90, 0],
          opacity: [0.1, 0.2, 0.1]
        }}
        transition={{ 
          duration: 10, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 border-[1px] border-accent/20 rounded-full scale-150"
      />
      
      <motion.div 
        animate={{ 
          scale: [1.2, 1, 1.2],
          rotate: [0, -90, 0],
          opacity: [0.05, 0.15, 0.05]
        }}
        transition={{ 
          duration: 15, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute inset-0 border-[1px] border-white/10 rounded-full scale-125"
      />

      {/* The Avatar SVG */}
      <motion.svg
        viewBox="0 0 200 200"
        className="w-4/5 h-4/5 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <defs>
          <linearGradient id="avatarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#6366f1" />
            <stop offset="100%" stopColor="#818cf8" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>

        {/* Head/Shoulders Silhouette */}
        <motion.path
          d="M100,40 C125,40 145,60 145,85 C145,110 125,130 100,130 C75,130 55,110 55,85 C55,60 75,40 100,40 Z M40,180 C40,150 60,135 100,135 C140,135 160,150 160,180 L40,180 Z"
          fill="white"
          fillOpacity="0.05"
          stroke="url(#avatarGradient)"
          strokeWidth="1.5"
          animate={{
            strokeDasharray: ["0 500", "500 500"],
            strokeDashoffset: [500, 0]
          }}
          transition={{
            duration: 2,
            ease: "easeInOut"
          }}
        />

        {/* Abstract Tech Elements */}
        <motion.circle
          cx="100"
          cy="85"
          r="55"
          fill="none"
          stroke="white"
          strokeWidth="0.5"
          strokeOpacity="0.2"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 4, repeat: Infinity }}
        />

        {/* Floating particles/data points */}
        {[...Array(5)].map((_, i) => (
          <motion.circle
            key={i}
            r="1.5"
            fill="#6366f1"
            filter="url(#glow)"
            animate={{
              x: [Math.random() * 200, Math.random() * 200],
              y: [Math.random() * 200, Math.random() * 200],
              opacity: [0, 0.8, 0]
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        ))}
      </motion.svg>

      {/* Scanline effect */}
      <motion.div 
        animate={{ y: ["-100%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 w-full h-1 bg-gradient-to-r from-transparent via-accent/20 to-transparent z-20"
      />
    </div>
  );
};

export default AnimatedAvatar;
