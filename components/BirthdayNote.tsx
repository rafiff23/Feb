import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, ChevronDown, CheckCircle2, Feather, Star } from 'lucide-react';

interface BirthdayNoteProps {
  onBack: () => void; 
  onPrev: () => void;
  onNext: () => void;
}

const BirthdayNote: React.FC<BirthdayNoteProps> = ({ onBack, onPrev, onNext }) => {
  const [view, setView] = useState<'letter' | 'poem'>('letter');
  const [hasReadExtraText, setHasReadExtraText] = useState(false);

  const handleNext = () => {
    if (view === 'letter') {
      setView('poem');
    } else {
      if (hasReadExtraText) {
        onNext();
      }
    }
  };

  const handlePrev = () => {
    if (view === 'poem') {
      setView('letter');
    } else {
      onPrev();
    }
  };

  return (
    <div className="w-full h-full relative z-20 flex flex-col justify-center items-center py-8">
      {/* Floating Magic Dust */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(20)].map((_, i) => (
            <motion.div
                key={i}
                className="absolute bg-white/40 rounded-full blur-[1px]"
                initial={{ opacity: 0, scale: 0, x: Math.random() * 100 + "%", y: "110%" }}
                animate={{ 
                    opacity: [0, 0.8, 0], 
                    scale: [0, Math.random() + 0.5, 0],
                    y: "-10%" 
                }}
                transition={{ 
                    duration: Math.random() * 10 + 10, 
                    repeat: Infinity, 
                    delay: Math.random() * 10 
                }}
                style={{ width: Math.random() * 4 + 1 + "px", height: Math.random() * 4 + 1 + "px" }}
            />
        ))}
      </div>

      <AnimatePresence mode="wait">
        {view === 'letter' ? (
          <LetterView key="letter" />
        ) : (
          <PoemView 
            key="poem" 
            hasReadExtraText={hasReadExtraText} 
            setHasReadExtraText={setHasReadExtraText} 
          />
        )}
      </AnimatePresence>

      <motion.button
        onClick={handlePrev}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-32 left-8 w-14 h-14 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full shadow-2xl flex items-center justify-center z-50 hover:bg-white/20 transition-colors md:bottom-8"
      >
        <ArrowLeft size={28} />
      </motion.button>

      <div className="fixed bottom-32 right-8 z-50 md:bottom-8">
        <AnimatePresence>
          {(view === 'letter' || (view === 'poem' && hasReadExtraText)) && (
            <motion.button
                key="next-arrow-btn"
                onClick={handleNext}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="w-14 h-14 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:brightness-110 transition-all relative z-10 border border-white/20"
            >
                <ArrowRight size={28} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const LetterView = () => {
  return (
    <motion.div 
        initial={{ y: 50, opacity: 0, scale: 0.95 }} 
        animate={{ y: 0, opacity: 1, scale: 1 }} 
        exit={{ y: -50, opacity: 0, scale: 0.95 }} 
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-3xl mx-auto px-4 h-[80vh]"
    >
      <div className="relative bg-[#faf9f6] h-full shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] rounded-lg overflow-hidden border border-[#e8e6e1] ring-1 ring-white/50">
        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='200' height='200' viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='1'/%3E%3C/svg%3E")` }}></div>
        
        {/* Elegant Header Accent */}
        <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300"></div>

        <div className="relative h-full pt-16 px-8 md:px-16 pb-24 overflow-y-auto no-scrollbar scroll-smooth">
            <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                transition={{ delay: 0.3 }}
                className="mb-8 text-center"
            >
                <Star className="w-8 h-8 mx-auto text-yellow-400 fill-yellow-200 mb-4 animate-spin-slow" style={{ animationDuration: '8s' }} />
                <h2 className="font-handwriting text-3xl md:text-5xl text-gray-800 leading-tight">Happy birthday to my most beautiful girl 🤍</h2>
            </motion.div>

            <div className="font-serif text-lg md:text-xl text-gray-700 leading-loose space-y-8 whitespace-pre-wrap text-justify relative z-10">
                <p>And I don’t just mean beautiful like “pretty” (though yeah… you absolutely are). I mean the kind of beautiful that shows up in the way you think, the way you care, the way you keep going even when things feel heavy.</p>
                
                <p>You’re the prettiest, the smartest, and honestly… one of the closest people I know to “almost perfect.” And I know nobody’s actually perfect—but you’re dangerously close, and it still surprises me sometimes.</p>
                
                <div className="my-8 pl-6 border-l-2 border-purple-200 italic text-gray-600">
                    "I hope the things you want don’t always have to be so hard. I hope what you work for feels lighter."
                </div>
                
                <p>Good luck on your journey, love. I know it’s not simple. I know there are days you doubt yourself (even if you don’t always say it out loud). But I believe in you. Fully. One day, you’re going to be an <span className="font-bold text-gray-900 bg-yellow-100 px-1 rounded-sm">eye doctor</span>—and not just any doctor. You’re going to be that one. The kind people remember.</p>
                
                <p>I wish you health—real health, not just “not being sick,” but feeling strong, calm, and at peace in your own body. I wish you rest when you’re tired, confidence when you’re unsure, and courage when things get scary. I wish you laughter that makes your stomach hurt and quiet moments that make you feel safe.</p>
                
                <p>And… I wish you know this, always: you’re not alone. I’m here. Cheering for you. Choosing you. Every step.</p>
                
                <div className="font-handwriting text-2xl md:text-3xl text-right pt-8 text-gray-800">
                    Happy birthday, my girl.<br/>I’m so grateful you exist.
                </div>
            </div>
        </div>
        
        {/* Bottom Fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#faf9f6] to-transparent pointer-events-none flex items-end justify-center pb-8">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}>
                <ChevronDown className="text-gray-400 w-8 h-8" />
            </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

const PoemView = ({ hasReadExtraText, setHasReadExtraText }: { hasReadExtraText: boolean, setHasReadExtraText: (v: boolean) => void }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [canFlip, setCanFlip] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 50) setCanFlip(true);
  };

  return (
    <div className="w-full max-w-5xl mx-auto h-[80vh] flex flex-col items-center px-4">
      <div className="w-full h-full perspective-2000 relative">
        <motion.div 
            animate={{ rotateY: isFlipped ? 180 : 0 }} 
            transition={{ duration: 1, type: "spring", stiffness: 40, damping: 10 }} 
            className="relative w-full h-full preserve-3d"
        >
          {/* FRONT (POEM) */}
          <div className={`absolute inset-0 backface-hidden rounded-[2rem] bg-gradient-to-b from-gray-900 via-[#1a1a2e] to-gray-900 border border-white/10 shadow-2xl overflow-hidden ${isFlipped ? 'pointer-events-none' : ''}`}>
             {/* Animated Background Mesh */}
             <div className="absolute inset-0 opacity-20">
                <div className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(76,29,149,0.2),transparent_50%)] animate-[spin_60s_linear_infinite]"></div>
             </div>

            {/* Scrollable Container Content */}
            <div ref={scrollRef} onScroll={handleScroll} className="relative h-full overflow-y-auto no-scrollbar p-8 md:p-12">
                <motion.div 
                    initial={{ y: -20, opacity: 0 }} 
                    animate={{ y: 0, opacity: 1 }} 
                    className="flex flex-col items-center mb-10 w-full"
                >
                    <Feather className="w-10 h-10 text-indigo-300 mb-2" />
                    <h2 className="text-3xl md:text-5xl font-handwriting text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-purple-200 to-pink-200 text-center drop-shadow-lg">
                        I Carry You Everywhere
                    </h2>
                </motion.div>

                <div className="flex-1 space-y-8 text-indigo-100/90 font-serif text-lg md:text-2xl text-center pb-24 leading-relaxed px-4">
                    {/* Staggered text appearance */}
                    <motion.div initial="hidden" animate="visible" variants={{
                        visible: { transition: { staggerChildren: 0.1 } }
                    }}>
                        <PoemStanza>I like the way your kindness feels<br/>quiet but heavy<br/>like it stays with me after you leave the room</PoemStanza>
                        
                        <PoemStanza>You don’t even try to be great<br/>you just are<br/>and somehow that makes me want to be near you<br/>all the time<br/>everywhere<br/>even when everywhere is far away</PoemStanza>
                        
                        <PoemStanza>We don’t meet every day<br/>and yeah, sometimes that hurts<br/>but I carry you anyway<br/>in my heart first<br/>then my watch when I check the time<br/>my phone when I scroll too long<br/>my laptop when I’m pretending to work but really just thinking about you</PoemStanza>
                        
                        <PoemStanza>You’re always there<br/>low volume<br/>steady<br/>like a song I don’t skip</PoemStanza>
                        
                        <PoemStanza>I know this thing we’re running together<br/>it ain’t always smooth<br/>some days it feels rough on the knees<br/>like we’re sprinting with untied laces<br/>and I know I can be heavy<br/>I know there are parts of me that make you uncomfortable<br/>parts I’m still learning how to hold better</PoemStanza>
                        
                        <PoemStanza>Sometimes I feel useless<br/>like I can’t do much<br/>can’t fix things fast<br/>can’t always show up the way I want to<br/>and still<br/>you stay</PoemStanza>
                        
                        <PoemStanza>So thank you<br/>for being patient with me<br/>for sticking by me when I’m still figuring myself out<br/>for loving me while I’m under construction</PoemStanza>
                        
                        <PoemStanza>I’m trying to be better<br/>for real<br/>not overnight<br/>not perfect<br/>but honest<br/>step by step</PoemStanza>
                        
                        <PoemStanza>I try to repay your kindness<br/>with everything good I’ve got in me<br/>even if it’s slow<br/>even if I trip a little<br/>I’m trying</PoemStanza>
                        
                        <PoemStanza>Thank you for existing in my life<br/>for changing the center of it<br/>for being the place my thoughts keep circling back to<br/>like home 🏠</PoemStanza>
                        
                        <PoemStanza>I pray for us<br/>for softness where it’s hard<br/>for patience where it’s loud<br/>for love that keeps choosing each other<br/>even on the quiet days</PoemStanza>
                        
                        <motion.div variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} className="text-white font-semibold pt-6">
                            You’re not just someone I love<br/>you’re the rhythm of my days<br/>and I’m grateful<br/>always<br/>that you’re mine 🤍
                        </motion.div>
                    </motion.div>
                </div>
            </div>
                
            {/* Wax Seal Button */}
            {canFlip && !isFlipped && (
                <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="absolute bottom-6 right-6 z-20"
                >
                    <button 
                        onClick={() => setIsFlipped(true)}
                        className="w-24 h-24 rounded-full bg-gradient-to-br from-red-800 to-red-600 shadow-[0_5px_15px_rgba(0,0,0,0.5)] flex items-center justify-center border-4 border-red-900/50 hover:scale-105 transition-transform group"
                    >
                        <div className="w-20 h-20 rounded-full border border-red-400/30 flex items-center justify-center">
                            <span className="font-handwriting text-red-200 text-sm font-bold group-hover:text-white transition-colors">Open</span>
                        </div>
                    </button>
                </motion.div>
            )}
          </div>

          {/* BACK (MESSAGE) */}
          <div className={`absolute inset-0 backface-hidden rounded-[2rem] bg-white border border-gray-200 shadow-2xl rotate-y-180 overflow-hidden flex flex-col ${!isFlipped ? 'pointer-events-none' : ''}`}>
             <div className="absolute top-0 right-0 p-8 opacity-10">
                <Star size={100} />
             </div>
             
             <div className="flex-1 flex flex-col p-10 md:p-16 overflow-y-auto no-scrollbar">
                <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center border-b pb-4">Final thoughts... 🤍</h2>
                <div className="font-handwriting text-2xl md:text-3xl text-gray-700 leading-relaxed space-y-8 text-center max-w-3xl mx-auto flex-1 flex flex-col justify-center">
                    <p>These past seven months have been a roller coaster, yeah. Up high some days, shaky on others. But honestly? I’ve loved the ride.</p>
                    <p>Thank you for this time. For the kindness you give so freely. You’re the purest kind of girl I’ve ever known, and I love you just for being exactly who you are.</p>
                    <p>You took my world when it was grey and slowly colored it into something lighter, warmer, softer. And for that, for you, for us… thank you. Always.</p>
                </div>
                
                <div className="mt-12 flex flex-col items-center gap-6">
                    <button 
                        onClick={() => setHasReadExtraText(!hasReadExtraText)} 
                        className={`flex items-center gap-4 px-8 py-4 rounded-full transition-all duration-300 ${hasReadExtraText ? 'bg-indigo-100 text-indigo-900' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'}`}
                    >
                        <div className={`p-1 rounded-full border-2 transition-colors ${hasReadExtraText ? 'bg-indigo-600 border-indigo-600' : 'bg-transparent border-gray-400'}`}>
                            {hasReadExtraText ? <CheckCircle2 size={20} className="text-white" /> : <div className="w-5 h-5" />}
                        </div>
                        <span className="text-xl font-medium">I've read every single word. 🤍</span>
                    </button>
                    
                    {isFlipped && (
                        <button onClick={() => setIsFlipped(false)} className="text-sm text-gray-400 hover:text-gray-600 underline flex items-center gap-1">
                            <ArrowLeft size={14} /> Back to Poem
                        </button>
                    )}
                </div>
            </div>
          </div>
        </motion.div>
      </div>
      <style>{`.preserve-3d { transform-style: preserve-3d; } .backface-hidden { backface-visibility: hidden; } .rotate-y-180 { transform: rotateY(180deg); } .perspective-2000 { perspective: 2000px; }`}</style>
    </div>
  );
};

const PoemStanza = ({ children }: { children: React.ReactNode }) => (
    <motion.p 
        variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
        className="block"
    >
        {children}
    </motion.p>
);

export default BirthdayNote;