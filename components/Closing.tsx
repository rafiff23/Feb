import React, { useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { Heart, Stars, Infinity as InfinityIcon } from 'lucide-react';

interface ClosingProps {
  onPrev: () => void;
}

const Closing: React.FC<ClosingProps> = ({ onPrev }) => {
  const [revealEnd, setRevealEnd] = useState(false);

  // Animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 2.5,
        delayChildren: 0.5,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
        opacity: 1, 
        y: 0, 
        transition: { duration: 1.5, ease: "easeOut" } 
    },
  };

  // Generate stars
  const stars = Array.from({ length: 100 }).map((_, i) => ({
    id: i,
    top: `${Math.random() * 100}%`,
    left: `${Math.random() * 100}%`,
    size: Math.random() * 2 + 1,
    delay: Math.random() * 3,
  }));

  return (
    <div className="min-h-screen bg-[#050505] text-gray-200 flex flex-col items-center justify-center p-6 relative overflow-hidden font-sans">
      
      {/* Starry Night Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Deep Gradients */}
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-slate-950 via-[#0a0a0a] to-slate-950 opacity-90" />
        
        {/* Stars */}
        {stars.map((star) => (
            <div
                key={star.id}
                className="absolute bg-white rounded-full animate-twinkle"
                style={{
                    top: star.top,
                    left: star.left,
                    width: `${star.size}px`,
                    height: `${star.size}px`,
                    animationDelay: `${star.delay}s`,
                    opacity: Math.random() * 0.7 + 0.3
                }}
            />
        ))}

        {/* Nebula Glows */}
        <motion.div 
            animate={{ opacity: [0.1, 0.2, 0.1], scale: [1, 1.1, 1] }}
            transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-[-10%] left-[20%] w-[500px] h-[500px] bg-indigo-900/20 rounded-full blur-[120px]" 
        />
         <motion.div 
            animate={{ opacity: [0.1, 0.15, 0.1], scale: [1, 1.2, 1] }}
            transition={{ duration: 20, repeat: Infinity, delay: 5 }}
            className="absolute bottom-[-10%] right-[10%] w-[600px] h-[600px] bg-purple-900/10 rounded-full blur-[120px]" 
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-2xl text-center space-y-16 z-10 w-full"
      >
        {/* 1. Calm Opening */}
        <motion.div variants={itemVariants} className="space-y-6">
            <h2 className="text-4xl md:text-6xl font-handwriting text-white mb-6 tracking-wide drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">
                In Case You Ever Doubt
            </h2>
            <p className="text-gray-400 text-xs md:text-sm tracking-[0.3em] uppercase border-b border-gray-800 inline-block pb-2">
                The Truth
            </p>
            <p className="text-lg md:text-2xl font-light leading-relaxed text-gray-300">
                You’ve read the words. You’ve seen the memories. <br />
                <span className="text-white font-medium">So here’s the truth.</span>
            </p>
        </motion.div>

        {/* 2. The Emotional Core */}
        <motion.div variants={itemVariants} className="relative py-12">
            {/* Connecting Line - Lightened up */}
            <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-transparent via-white/40 to-transparent shadow-[0_0_8px_rgba(255,255,255,0.5)]"></div>
            
            <div className="bg-[#050505]/80 backdrop-blur-md border border-white/10 relative z-10 inline-block px-8 py-6 rounded-lg shadow-2xl">
                <Heart className="w-6 h-6 text-red-500/80 fill-red-500/20 mx-auto mb-4" />
                <h3 className="text-3xl font-handwriting text-white mb-4">"Why?"</h3>
                <p className="text-gray-300 leading-relaxed max-w-lg mx-auto text-lg font-light">
                    I don’t love you because you’re perfect.<br />
                    I love you because being with you feels like <span className="text-white font-semibold underline decoration-indigo-500/50 underline-offset-4">home</span> — even on the hard days.
                </p>
            </div>
        </motion.div>

        {/* 3. Reassurance */}
        <motion.div variants={itemVariants} className="bg-gradient-to-br from-gray-900/50 to-gray-800/50 border border-white/10 p-10 rounded-2xl backdrop-blur-md shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
            <Stars className="w-6 h-6 text-yellow-200/70 mx-auto mb-6" />
            <p className="text-xl md:text-2xl text-gray-200 font-handwriting leading-relaxed">
                “On days you feel unsure, tired, or not enough — <br />
                I hope you remember that someone chose you,<br />
                and <span className="text-indigo-200 drop-shadow-md">keeps choosing you</span>.”
            </p>
        </motion.div>

        {/* 4. Presence */}
        <motion.div variants={itemVariants} className="pt-8">
            <p className="text-2xl md:text-3xl font-handwriting text-white tracking-wide">
                Right now, today, I’m here. <br />
                <span className="text-gray-400 text-xl block mt-2 font-sans font-light">And I’m happy it’s you.</span>
            </p>
        </motion.div>

        {/* 5. Interactive Ending */}
        <motion.div variants={itemVariants} className="pt-16 min-h-[200px]">
            <AnimatePresence mode="wait">
                {!revealEnd ? (
                    <motion.button
                        key="end-btn"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.1)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setRevealEnd(true)}
                        className="group px-10 py-4 border border-white/20 rounded-full text-gray-400 hover:text-white hover:border-white/60 transition-all duration-500 uppercase tracking-[0.2em] text-xs font-medium relative overflow-hidden"
                    >
                        <span className="relative z-10">The End</span>
                        <div className="absolute inset-0 bg-white/5 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-500" />
                    </motion.button>
                ) : (
                    <motion.div
                        key="forever-msg"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="flex flex-col items-center gap-6 max-w-lg mx-auto"
                    >
                        <div className="flex flex-col items-center gap-2">
                             <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <InfinityIcon className="w-10 h-10 text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.5)]" />
                            </motion.div>
                            <p className="text-indigo-200 font-medium text-lg tracking-wide uppercase">
                                There is no end. I'm still here.
                            </p>
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="text-gray-400 text-sm md:text-base leading-relaxed font-light border-t border-white/10 pt-6 mt-2"
                        >
                            <p className="mb-4">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                            </p>
                            <p>
                                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Closing;