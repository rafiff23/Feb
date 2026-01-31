import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface CelebrationProps {
  onComplete: () => void;
}

const Celebration: React.FC<CelebrationProps> = ({ onComplete }) => {
  const [popCount, setPopCount] = useState(0);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPopCount(1), 800),
      setTimeout(() => setPopCount(2), 1600),
      setTimeout(() => {
        setPopCount(3);
        // Delay onComplete slightly to let the last confetti settle/start
        setTimeout(onComplete, 1000);
      }, 2400),
    ];
    return () => timers.forEach(clearTimeout);
  }, [onComplete]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      <Trumpet side="left" popCount={popCount} />
      <Trumpet side="right" popCount={popCount} />
    </div>
  );
};

const Trumpet = ({ side, popCount }: { side: 'left' | 'right', popCount: number }) => {
  const isLeft = side === 'left';
  
  // Confetti particles configuration
  const generateParticles = (count: number) => Array.from({ length: count }).map((_, i) => ({
    id: i,
    angle: isLeft ? -45 - Math.random() * 60 : -135 + Math.random() * 60,
    velocity: Math.random() * 350 + 250,
    color: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#FF9F43', '#FF70A6'][Math.floor(Math.random() * 5)],
    shape: Math.random() > 0.5 ? 'circle' : 'square',
    delay: Math.random() * 0.2
  }));

  // We show particles for each pop
  const pops = [
    generateParticles(30),
    generateParticles(30),
    generateParticles(30)
  ];

  return (
    <div className={`absolute bottom-0 ${isLeft ? 'left-0' : 'right-0'}`}>
      {/* Trumpet/Popper Body */}
      <motion.div
        initial={{ y: 200, x: isLeft ? -50 : 50, rotate: isLeft ? 45 : -45 }}
        animate={{ 
          y: 0, 
          scale: popCount > 0 ? [1, 1.2, 0.9, 1] : 1,
        }}
        transition={{ 
          y: { type: "spring", stiffness: 60, damping: 12, delay: 0.2 },
          scale: { 
            duration: 0.3, 
            repeat: popCount > 0 && popCount < 3 ? 2 : 0, 
            repeatType: "mirror" 
          }
        }}
        className="w-40 h-40 md:w-56 md:h-56 relative origin-bottom"
      >
        <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-2xl">
          <defs>
            <linearGradient id={`grad-${side}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" style={{ stopColor: '#FF9A9E', stopOpacity: 1 }} />
              <stop offset="100%" style={{ stopColor: '#FECFEF', stopOpacity: 1 }} />
            </linearGradient>
          </defs>
          <path d="M80 180 L120 180 L160 60 L40 60 Z" fill={`url(#grad-${side})`} stroke="white" strokeWidth="4" />
          <ellipse cx="100" cy="60" rx="60" ry="15" fill="#FFF0F5" stroke="#FF9A9E" strokeWidth="2" />
          <ellipse cx="100" cy="180" rx="20" ry="5" fill="#FF9A9E" />
        </svg>
      </motion.div>

      {/* Multiple Confetti Explosions */}
      {pops.map((particles, popIdx) => (
        popCount > popIdx && (
          <React.Fragment key={popIdx}>
            {particles.map((p) => (
              <motion.div
                key={`${popIdx}-${p.id}`}
                className={`absolute top-[10%] left-[50%] w-3 h-3 ${p.shape === 'circle' ? 'rounded-full' : 'rounded-sm'}`}
                style={{ backgroundColor: p.color }}
                initial={{ scale: 0, x: 0, y: 0 }}
                animate={{
                  x: Math.cos(p.angle * Math.PI / 180) * p.velocity,
                  y: Math.sin(p.angle * Math.PI / 180) * p.velocity,
                  opacity: [1, 1, 0],
                  rotate: [0, 720],
                  scale: [1, 1, 0]
                }}
                transition={{ duration: 2.5, ease: "easeOut", delay: p.delay }}
              />
            ))}
          </React.Fragment>
        )
      ))}
    </div>
  );
};

export default Celebration;