import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, SkipBack, SkipForward, Music } from 'lucide-react';
import { AppState } from '../types';

interface MusicPlayerProps {
  appState: AppState;
}

// 🎵 MUSIC CONFIGURATION 🎵
// You can change the 'startTime' (in seconds) to start the song at a specific moment.

const TRACKS: Record<string, { title: string; artist: string; url: string; startTime?: number }> = {
  [AppState.CARD_VIEW]: {
    title: "Selamat Ulang Tahun",
    artist: "Jamrud",
    url: "https://ik.imagekit.io/fcuinpkmj/Jamrud-Selamat-Ulang-Tahun-Offic.mp3",
    startTime: 8 // Starts at 0:08
  },
  [AppState.NOTE_VIEW]: {
    title: "Wiseman",
    artist: "Frank Ocean",
    url: "https://ik.imagekit.io/fcuinpkmj/Frank-Ocean-Wiseman-Lyrics.mp3",
    startTime: 69 // Starts at 1:09
  },
  [AppState.APPRECIATION_VIEW]: {
    title: "So Glad That I Found You",
    artist: "Jalen Ngonda",
    url: "https://ik.imagekit.io/fcuinpkmj/Jalen-Ngonda-So-Glad-I-Found-You.mp3",
    startTime: 44 // Starts at 0:44
  },
  [AppState.QUIZ_VIEW]: {
    title: "Funky Beat", 
    artist: "Quiz Time",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3",
    startTime: 0
  },
  [AppState.GALLERY_VIEW]: {
    title: "Love Me Not",
    artist: "Ravyn Lenae",
    url: "https://ik.imagekit.io/fcuinpkmj/Ravyn-Lenae-Love-Me-Not.mp3",
    startTime: 15 // Starts at 0:15
  },
  [AppState.CLOSING_VIEW]: {
    title: "Get You",
    artist: "Daniel Caesar",
    url: "https://ik.imagekit.io/fcuinpkmj/Get-You-feat-Kali-Uchis.mp3",
    startTime: 196 // Starts at 3:16
  }
};

const MusicPlayer: React.FC<MusicPlayerProps> = ({ appState }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  
  // Get current track info based on AppState
  const currentTrack = TRACKS[appState] || TRACKS[AppState.CARD_VIEW];

  // Handle Track Switching when AppState changes
  useEffect(() => {
    if (audioRef.current) {
        // Check if the source actually needs changing to avoid interrupting current playback if same song
        // (Though in this app structure, each page has a distinct song, so we likely always change)
        const currentSrc = audioRef.current.getAttribute('src');
        
        if (currentSrc !== currentTrack.url) {
            audioRef.current.pause();
            audioRef.current.src = currentTrack.url;
            audioRef.current.currentTime = currentTrack.startTime || 0;
            audioRef.current.load();
            
            if (isPlaying && appState !== AppState.LOGIN_VIEW) {
                const playPromise = audioRef.current.play();
                if (playPromise !== undefined) {
                    playPromise.catch(e => console.log("Auto-play blocked on track change", e));
                }
            }
        }
    }
  }, [appState, currentTrack.url, currentTrack.startTime, isPlaying]);

  // Initial Autoplay check
  useEffect(() => {
    if (appState !== AppState.LOGIN_VIEW && !isPlaying) {
      const timer = setTimeout(() => {
          if (audioRef.current) {
            // Ensure start time is set if this is the first load
            if (audioRef.current.currentTime === 0 && currentTrack.startTime) {
                audioRef.current.currentTime = currentTrack.startTime;
            }

            const playAttempt = audioRef.current.play();
            if (playAttempt !== undefined) {
                playAttempt
                .then(() => setIsPlaying(true))
                .catch(err => {
                    console.log("Autoplay blocked, waiting for interaction", err);
                });
            }
          }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [appState]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      }
      setIsPlaying(!isPlaying);
    }
  };

  const isClosing = appState === AppState.CLOSING_VIEW;
  const isHidden = appState === AppState.LOGIN_VIEW;

  if (isHidden) return null;

  return (
    <div 
      className={`fixed z-[100] w-auto transition-all duration-700 ease-in-out ${
        isClosing 
          ? 'bottom-8 right-8' 
          : 'bottom-6 left-1/2 -translate-x-1/2 max-w-[90vw]'
      }`}
    >
      <audio ref={audioRef} loop />
      
      <motion.div 
        layout
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className="bg-black/80 backdrop-blur-xl rounded-full px-6 py-3 shadow-2xl flex items-center gap-4 border border-white/10 ring-1 ring-white/5"
      >
        {/* Album Art / Icon */}
        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center shadow-lg animate-[spin_8s_linear_infinite]" style={{ animationPlayState: isPlaying ? 'running' : 'paused' }}>
            <Music size={18} className="text-white" />
        </div>

        {/* Info - Hidden on very small screens or during closing to stay compact if desired */}
        <div className="hidden sm:flex flex-col w-32 md:w-40 overflow-hidden">
            <span className="text-white text-xs font-bold truncate">{currentTrack.title}</span>
            <span className="text-gray-400 text-[10px] truncate">{currentTrack.artist}</span>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-3">
            <button className="text-gray-400 hover:text-white transition-colors">
                <SkipBack size={18} />
            </button>
            
            <button 
                onClick={togglePlay} 
                className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform active:scale-95 shadow-lg"
            >
                {isPlaying ? <Pause size={18} className="text-black fill-black" /> : <Play size={18} className="text-black fill-black ml-1" />}
            </button>

            <button className="text-gray-400 hover:text-white transition-colors">
                <SkipForward size={18} />
            </button>
        </div>
      </motion.div>
    </div>
  );
};

export default MusicPlayer;