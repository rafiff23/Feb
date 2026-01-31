import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface GalleryProps {
  onPrev: () => void;
  onNext: () => void;
}

const galleryData = [
  // Row 1
  { id: 'img-1', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_3997.HEIC?updatedAt=1769871118601&tr=f-auto', caption: "Firs Time we Meet. ✨" },
  { id: 'img-2', src: 'https://ik.imagekit.io/fcuinpkmj/b25ccb4c-517e-4a94-a0e0-eeffd7e46b4a.JPG?updatedAt=1769870923798&tr=f-auto', caption: "First PAP. ❤️" },
  { id: 'img-3', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_5322.PNG?updatedAt=1769871117880&tr=f-auto', caption: "First Photobooth Together. 🌸" },
  { id: 'img-4', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_7075.HEIC?updatedAt=1769871118844&tr=f-auto', caption: "First Time ditinggalin keluar kota :(" },
  { id: 'img-5', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_0030.JPG?updatedAt=1769871117211&tr=f-auto', caption: "My favorite view. 🏠" },

  // Row 2
  { id: 'img-6', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_9112.HEIC?updatedAt=1769871118610&tr=f-auto', caption: "Semangat Belajar nya CANTIKKKK. 🤍" },
  { id: 'img-7', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_7111.JPG?updatedAt=1769871117164&tr=f-auto', caption: "dari AI semoga jadi kenyataan akan jd Mimpi aku. ☀️" },
  { id: 'img-8', src: 'https://ik.imagekit.io/fcuinpkmj/Screenshot%202026-01-02%20at%2018.24.28.jpg?updatedAt=1769870811770&tr=f-auto', caption: "Aamiin ya beb semoga dunia baik sama kamu. 🌎" },
  { id: 'img-9', src: 'https://ik.imagekit.io/fcuinpkmj/f2c01f05-0324-4a1b-b833-9d6a105f6c95.JPG?updatedAt=1769870857106&tr=f-auto', caption: "That smile is everything. 💫" },
  { id: 'img-10', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_9627.jpg?tr=f-auto', caption: "Just perfect. 💖" },

  // Row 3
  { id: 'img-11', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_9625.JPG?updatedAt=1769871117355&tr=f-auto', caption: "Last Photobooth. ✨" },
  { id: 'img-12', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_0103.JPG?updatedAt=1769871117365&tr=f-auto', caption: "A core memory. 🎵" },
  { id: 'img-13', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_0136.JPG?updatedAt=1769871117335&tr=f-auto', caption: "NINDIKKKK. 💝" },
  { id: 'img-14', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_0105.JPG?updatedAt=1769871117007&tr=f-auto', caption: "Keep smiling. 😊" },
  { id: 'img-15', src: 'https://ik.imagekit.io/fcuinpkmj/IMG_0143.JPG?updatedAt=1769871116208&tr=f-auto', caption: "Ultah dengan perempuan terbaik. 🌹" },
];

const keywords = ["Beautiful", "Smart", "Kind", "Honest", "Patient", "Perfect"];

const Gallery: React.FC<GalleryProps> = ({ onPrev, onNext }) => {
  const [hoveredCaption, setHoveredCaption] = useState<string | null>(null);

  // Distribute the 15 images across 3 rows
  const row1 = galleryData.slice(0, 5);
  const row2 = galleryData.slice(5, 10);
  const row3 = galleryData.slice(10, 15);

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col relative overflow-hidden font-sans">
      <AnimatePresence>
        {hoveredCaption && (
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            className="fixed inset-0 z-40 bg-black/80 backdrop-blur-[4px] flex items-center justify-center p-8 pointer-events-none"
          >
            <motion.p 
              initial={{ scale: 0.9, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="text-white text-3xl md:text-5xl font-handwriting text-center leading-relaxed max-w-2xl drop-shadow-2xl"
            >
              "{hoveredCaption}"
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Expanded Seamless Keyword Scroller */}
      <div className="absolute left-0 top-0 bottom-0 z-20 w-32 md:w-48 flex items-center justify-center pointer-events-none select-none">
        <div className="h-full w-full relative overflow-hidden flex flex-col items-center">
            {/* Soft fade at top and bottom */}
            <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-gray-950 to-transparent z-10" />
            <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-gray-950 to-transparent z-10" />
            
            <motion.div 
                className="flex flex-col gap-96 py-20" // Increased gap to 24rem (384px) to prevent overlap of rotated text
                animate={{ y: [0, -2600] }} 
                // Calculation: (6 items * 1 set) approx. Adjusted for gap-96 to smooth loop.
                transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            >
                {/* Loop the keywords multiple times to create infinite effect. 
                    Structure: 6 keywords * 4 sets = 24 items.
                    Large gap ensures "Beautiful" (rotated) doesn't hit the next word. 
                */}
                {[...keywords, ...keywords, ...keywords, ...keywords].map((word, i) => (
                    <span 
                        key={i} 
                        className="text-white/20 text-3xl md:text-5xl font-bold uppercase tracking-[0.6em] rotate-[-90deg] whitespace-nowrap drop-shadow-lg"
                    >
                        {word}
                    </span>
                ))}
            </motion.div>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-center gap-12 md:gap-20 pt-16 pb-32 relative z-10 pl-32 md:pl-56">
        <Marquee direction="left" items={row1} onHover={setHoveredCaption} />
        <Marquee direction="right" items={row2} onHover={setHoveredCaption} />
        <Marquee direction="left" items={row3} onHover={setHoveredCaption} />
      </div>

      <div className="fixed bottom-32 left-8 z-50 md:bottom-24">
        <motion.button onClick={onPrev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-white/10 backdrop-blur-md text-white rounded-full border border-white/20 shadow-2xl flex items-center justify-center hover:bg-white/20 transition-colors">
            <ArrowLeft size={28} />
        </motion.button>
      </div>

      <div className="fixed bottom-32 right-8 z-50 md:bottom-24">
        <motion.button onClick={onNext} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="w-14 h-14 bg-white text-black rounded-full shadow-2xl flex items-center justify-center hover:bg-gray-200 transition-colors">
            <ArrowRight size={28} />
        </motion.button>
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/30 via-gray-950 to-gray-950"></div>
    </div>
  );
};

const Marquee = ({ direction, items, onHover }: { direction: 'left' | 'right'; items: { id: string; src: string; caption: string }[]; onHover: (caption: string | null) => void; }) => {
  // Triple the items to ensure we always have content visible during the scroll
  const duplicatedItems = [...items, ...items, ...items, ...items];
  
  return (
    <div className="w-full overflow-hidden flex relative">
      <motion.div 
        className="flex gap-10 min-w-max px-4"
        animate={{ x: direction === 'left' ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
      >
        {duplicatedItems.map((item, idx) => (
          <div 
            key={`${item.id}-${idx}`} 
            className="relative w-56 h-56 md:w-80 md:h-80 flex-shrink-0 cursor-pointer overflow-hidden rounded-[2rem] shadow-2xl transition-all duration-500 transform hover:scale-105 hover:z-50 border-2 border-white/10 group/img"
            onMouseEnter={() => onHover(item.caption)} 
            onMouseLeave={() => onHover(null)}
          >
            <img 
              src={item.src} 
              alt="Memory" 
              className="w-full h-full object-cover opacity-80 group-hover/img:opacity-100 transition-all duration-700 grayscale-[40%] group-hover/img:grayscale-0 scale-[1.01]" 
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default Gallery;