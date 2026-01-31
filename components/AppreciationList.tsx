import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, ArrowLeft, ArrowRight } from 'lucide-react';

interface AppreciationListProps {
  onPrev: () => void;
  onNext: () => void;
}

interface AppreciationItem {
  id: string;
  label: string;
  description: string;
}

const items: AppreciationItem[] = [
  { 
    id: 'eyes', 
    label: 'Your Eyes', 
    description: 'They feel honest. Like they see right through me, but never in a way that scares me. More like… you understand before I even explain.' 
  },
  { 
    id: 'smile', 
    label: 'Your Smile', 
    description: 'It sneaks up on me. One second I’m fine, the next I’m melting. It makes hard days feel lighter without even trying.' 
  },
  { 
    id: 'voice', 
    label: 'Your Voice', 
    description: 'It calms me. Even when you’re not saying anything important, I just like hearing you exist on the other side.' 
  },
  { 
    id: 'mind', 
    label: 'Your Mind', 
    description: 'It’s beautiful. The way you think, the way you care, the way you see the world deeper than most people do. I get lost there sometimes, in a good way.' 
  },
  { 
    id: 'hands', 
    label: 'Your Hands', 
    description: 'They feel safe. Whether you’re holding mine or just resting them near me, they make me feel like everything’s gonna be okay.' 
  },
  { 
    id: 'cheeks', 
    label: 'Your Cheeks', 
    description: 'They’re my weakness. Especially when you smile. I catch myself wanting to touch them, just to make sure that moment is real.' 
  },
];

const AppreciationList: React.FC<AppreciationListProps> = ({ onPrev, onNext }) => {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [viewedItems, setViewedItems] = useState<Set<string>>(new Set());
  const [showFinal, setShowFinal] = useState(false);

  const handleItemClick = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
    
    // Add to viewed set
    const newViewed = new Set(viewedItems);
    newViewed.add(id);
    setViewedItems(newViewed);
  };

  const allViewed = items.every(item => viewedItems.has(item.id));

  return (
    <div className="fixed inset-0 z-50 bg-gray-950 text-white overflow-y-auto overflow-x-hidden">
      {/* Ambient background glow */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] right-[-10%] w-[500px] h-[500px] bg-purple-900/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-blue-900/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md mx-auto px-6 py-12 pb-32 min-h-screen flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-4xl font-handwriting bg-clip-text text-transparent bg-gradient-to-r from-purple-200 to-pink-200 leading-relaxed py-2">
            What I Adore
          </h2>
          <p className="text-gray-400 text-sm mt-2">Tap to reveal</p>
        </motion.div>

        <div className="flex-1 space-y-4">
          {items.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <button
                onClick={() => handleItemClick(item.id)}
                className={`w-full p-5 flex items-center justify-between transition-all duration-300 relative z-10 
                  ${expandedId === item.id 
                    ? 'bg-gray-800 rounded-t-2xl rounded-b-none' 
                    : 'bg-gray-800/80 hover:bg-gray-800 rounded-2xl'
                  }`}
              >
                <span className="text-lg font-medium tracking-wide">{item.label}</span>
                {viewedItems.has(item.id) ? (
                  <Heart className="w-5 h-5 text-pink-500 fill-pink-500/20" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-600" />
                )}
              </button>

              <AnimatePresence>
                {expandedId === item.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden bg-gray-800/40 rounded-b-2xl backdrop-blur-sm"
                  >
                    <div className="p-5 pt-2 text-gray-300 leading-relaxed text-sm border-t border-gray-700/50 font-serif">
                      {item.description}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Spacer for scroll */}
          <div className="h-8"></div>

          {/* Final Button Area */}
          <AnimatePresence>
            {allViewed && (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", bounce: 0.5 }}
                className="mt-8 pb-12"
              >
                {!showFinal ? (
                  <button
                    onClick={() => setShowFinal(true)}
                    className="w-full py-6 rounded-2xl bg-gradient-to-r from-pink-600 via-purple-600 to-indigo-600 text-white font-bold text-xl shadow-[0_0_20px_rgba(168,85,247,0.4)] hover:shadow-[0_0_30px_rgba(168,85,247,0.6)] transform transition-all active:scale-95 flex items-center justify-center gap-3"
                  >
                    <span>One Last Thing...</span>
                    <Sparkles className="w-6 h-6 animate-pulse" />
                  </button>
                ) : (
                   <motion.div
                     initial={{ opacity: 0, scale: 0.9 }}
                     animate={{ opacity: 1, scale: 1 }}
                     className="bg-white/10 backdrop-blur-md rounded-3xl p-8 text-center border border-white/20"
                   >
                     <motion.div 
                        animate={{ 
                            scale: [1, 1.2, 1],
                            rotate: [0, 10, -10, 0] 
                        }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="inline-block mb-4"
                     >
                        <Heart className="w-16 h-16 text-red-500 fill-red-500" />
                     </motion.div>
                     <h3 className="text-3xl md:text-5xl font-handwriting text-white mb-2">Everything.</h3>
                     <p className="text-gray-300">I love everything about you.</p>
                   </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating Buttons */}
      <motion.button
        onClick={onPrev}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-8 left-8 w-16 h-16 bg-white text-black rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center z-50 hover:bg-gray-200 transition-colors"
      >
        <ArrowLeft size={32} />
      </motion.button>

      {/* Next Button - Only shown when 'Everything' has been revealed */}
      <AnimatePresence>
        {showFinal && (
          <motion.button
            key="next-btn"
            onClick={onNext}
            initial={{ scale: 0, rotate: 180 }}
            animate={{ scale: 1, rotate: 0 }}
            exit={{ scale: 0, rotate: -180 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full shadow-[0_0_15px_rgba(255,255,255,0.3)] flex items-center justify-center z-50 hover:bg-gray-200 transition-colors"
          >
            <ArrowRight size={32} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppreciationList;