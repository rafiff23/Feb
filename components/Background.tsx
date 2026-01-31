import React from 'react';
import { motion } from 'framer-motion';

const Background: React.FC = () => {
  // Generate modern abstract orbs instead of random shapes
  const orbs = Array.from({ length: 6 }).map((_, i) => ({
    id: i,
    size: Math.random() * 300 + 200,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 20,
    delay: Math.random() * 5,
    color: ['bg-purple-200', 'bg-blue-200', 'bg-pink-200', 'bg-indigo-200'][i % 4]
  }));

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-[#fafafa]">
      {/* Mesh Gradient Base */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-gray-50 to-gray-100 opacity-80"></div>
      
      {orbs.map((orb) => (
        <motion.div
          key={orb.id}
          className={`absolute rounded-full mix-blend-multiply filter blur-[80px] opacity-30 ${orb.color}`}
          style={{
            left: `${orb.x}%`,
            top: `${orb.y}%`,
            width: orb.size,
            height: orb.size,
          }}
          animate={{
            x: [0, 50, -50, 0],
            y: [0, -50, 50, 0],
            scale: [1, 1.2, 0.9, 1],
          }}
          transition={{
            duration: orb.duration,
            repeat: Infinity,
            ease: "easeInOut",
            delay: orb.delay,
          }}
        />
      ))}
      
      {/* Subtle Noise Texture overlay for modernization */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} 
      />
    </div>
  );
};

export default Background;