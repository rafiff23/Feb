import React, { useState } from 'react';
import { motion } from 'framer-motion';
import BirthdayHat from './BirthdayHat';

interface PolaroidProps {
  imageSrc: string;
  caption: string;
  onCaptionChange: (text: string) => void;
}

const Polaroid: React.FC<PolaroidProps> = ({ imageSrc, caption, onCaptionChange }) => {
  return (
    <motion.div
      className="relative bg-white p-4 pb-16 shadow-2xl rotate-3 w-full max-w-sm mx-auto"
      initial={{ scale: 0.8, opacity: 0, rotate: -10 }}
      animate={{ scale: 1, opacity: 1, rotate: 3 }}
      whileHover={{ scale: 1.02, rotate: 0 }}
      transition={{ type: "spring", stiffness: 200, damping: 15 }}
    >
      {/* Tape Effect */}
      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-8 bg-white/30 backdrop-blur-sm border border-white/40 shadow-sm rotate-1 z-10"></div>

      {/* Birthday Hat */}
      <div className="absolute -top-12 -right-12 z-20 pointer-events-none">
         <motion.div
            animate={{ rotate: [40, 50, 40] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
         >
             <BirthdayHat className="w-24 h-24" />
         </motion.div>
      </div>

      {/* Photo Area */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden shadow-inner border-2 border-gray-100">
        <img
          src={imageSrc}
          alt="Birthday Memory"
          className="w-full h-full object-cover transition-transform duration-700"
        />
      </div>

      {/* Caption Area */}
      <div className="mt-6 text-center">
        <input
            type="text"
            value={caption}
            onChange={(e) => onCaptionChange(e.target.value)}
            className="w-full text-center font-handwriting text-3xl text-gray-800 bg-transparent border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:outline-none placeholder-gray-400 transition-colors"
            placeholder="Happy Birthday!"
        />
      </div>
    </motion.div>
  );
};

export default Polaroid;