import React from 'react';
import { motion } from 'framer-motion';

const SurpriseBanner: React.FC = () => {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.5, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
      className="relative z-30 w-full flex items-center justify-center mb-8"
    >
      <div className="relative">
        {/* Left Tail */}
        <div className="absolute top-2 -left-4 w-10 h-16 bg-amber-700 rounded-l-md transform -skew-y-6 origin-right shadow-md z-0"></div>
        
        {/* Right Tail */}
        <div className="absolute top-2 -right-4 w-10 h-16 bg-amber-700 rounded-r-md transform skew-y-6 origin-left shadow-md z-0"></div>

        {/* Main Ribbon Body */}
        <div className="relative bg-gradient-to-b from-amber-400 to-amber-500 text-amber-900 px-12 py-4 shadow-xl z-10 flex items-center justify-center transform hover:scale-105 transition-transform duration-300 border-t border-amber-300">
           
           {/* Stitching Effect */}
           <div className="absolute inset-1 border-2 border-dashed border-amber-700/30 pointer-events-none"></div>

           {/* Text */}
           <h2 className="font-handwriting text-3xl md:text-5xl font-bold tracking-wider drop-shadow-sm whitespace-nowrap">
             Surprise I love you baby
           </h2>

           {/* Shine effect */}
           <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent w-full h-full animate-[shimmer_2s_infinite]"></div>
        </div>

        {/* Fold Triangles (Darker parts) */}
        <div className="absolute top-full left-0 w-0 h-0 border-t-[16px] border-t-amber-800 border-l-[20px] border-l-transparent transform -translate-y-2 z-0"></div>
        <div className="absolute top-full right-0 w-0 h-0 border-t-[16px] border-t-amber-800 border-r-[20px] border-r-transparent transform -translate-y-2 z-0"></div>
      </div>
      
      {/* Decorative floating sparkles */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-yellow-200 rounded-full shadow-[0_0_10px_gold]"
          style={{ width: Math.random() * 6 + 4 + 'px', height: Math.random() * 6 + 4 + 'px' }}
          animate={{
            scale: [0, 1.2, 0],
            opacity: [0, 1, 0],
            y: [0, -20, 0]
          }}
          transition={{
            duration: 1.5 + Math.random(),
            repeat: Infinity,
            delay: Math.random() * 2,
          }}
          // Random positions around the ribbon
          initial={{ 
             top: Math.random() > 0.5 ? -20 : '100%', 
             left: `${Math.random() * 100}%` 
          }}
        />
      ))}
    </motion.div>
  );
};

export default SurpriseBanner;