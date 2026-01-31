import React from 'react';
import { motion } from 'framer-motion';

const Fireworks: React.FC = () => {
  const fireworks = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 80,
    delay: Math.random() * 3,
    color: ['#FF6B6B', '#4ECDC4', '#FFE66D', '#A29BFE', '#FD79A8'][i % 5],
  }));

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden -z-10">
      {fireworks.map((fw) => (
        <Firework key={fw.id} {...fw} />
      ))}
    </div>
  );
};

const Firework = ({ x, y, delay, color }: { x: number, y: number, delay: number, color: string }) => {
  const particles = Array.from({ length: 20 }).map((_, i) => ({
    id: i,
    angle: (i / 20) * Math.PI * 2,
    dist: 100 + Math.random() * 50,
  }));

  return (
    <div className="absolute" style={{ left: `${x}%`, top: `${y}%` }}>
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1.5 h-1.5 rounded-full"
          style={{ backgroundColor: color }}
          initial={{ scale: 0, x: 0, y: 0 }}
          animate={{
            scale: [0, 1, 0],
            x: Math.cos(p.angle) * p.dist,
            y: Math.sin(p.angle) * p.dist,
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            delay: delay,
            ease: "easeOut"
          }}
        />
      ))}
    </div>
  );
};

export default Fireworks;