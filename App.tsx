import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { AppState } from './types';
import Polaroid from './components/Polaroid';
import BirthdayNote from './components/BirthdayNote';
import Background from './components/Background';
import Celebration from './components/Celebration';
import AppreciationList from './components/AppreciationList';
import PopQuiz from './components/PopQuiz';
import Gallery from './components/Gallery';
import Closing from './components/Closing';
import Login from './components/Login';
import SurpriseBanner from './components/SurpriseBanner';
import Fireworks from './components/Fireworks';
import MusicPlayer from './components/MusicPlayer';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.LOGIN_VIEW);
  const [polaroidCaption, setPolaroidCaption] = useState<string>('Happy Birthday!');
  const [celebrationFinished, setCelebrationFinished] = useState(false);
  const [showNextButton, setShowNextButton] = useState(false);

  const polaroidImage = 'https://ik.imagekit.io/fcuinpkmj/8eea877d-9f14-4ec3-8cf9-76b03ad9e4ee.JPG';

  const handleCelebrationComplete = () => {
    setCelebrationFinished(true);
    setTimeout(() => {
      setShowNextButton(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center p-4 overflow-hidden font-sans">
      {appState !== AppState.GALLERY_VIEW && appState !== AppState.CLOSING_VIEW && <Background />}

      <AnimatePresence mode="wait">
        {appState === AppState.LOGIN_VIEW ? (
            <motion.div key="login" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full flex justify-center"><Login onLoginSuccess={() => setAppState(AppState.CARD_VIEW)} /></motion.div>
        ) : appState === AppState.CARD_VIEW ? (
          <motion.div key="card" initial={{ x: -100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="flex flex-col items-center gap-4 w-full max-w-4xl relative">
            <AnimatePresence>{celebrationFinished && <Fireworks />}</AnimatePresence>
            <Celebration onComplete={handleCelebrationComplete} />
            <div className="text-center z-10 w-full flex flex-col items-center">
                <AnimatePresence>{celebrationFinished && <SurpriseBanner />}</AnimatePresence>
                {!celebrationFinished && <motion.h1 className="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 font-handwriting py-4" initial={{ y: -50, opacity: 0 }} animate={{ y: 0, opacity: 1 }}>Let's Celebrate!</motion.h1>}
            </div>
            <Polaroid imageSrc={polaroidImage} caption={polaroidCaption} onCaptionChange={setPolaroidCaption} />
            <AnimatePresence>
              {showNextButton && (
                <motion.button key="next" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} onClick={() => setAppState(AppState.NOTE_VIEW)} className="group relative mt-4 flex items-center justify-center px-8 py-4 bg-gray-900 text-white text-lg font-semibold rounded-full shadow-xl overflow-hidden z-10 hover:shadow-2xl hover:bg-gray-800" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <span className="mr-2">Next: Open Message</span>
                  <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  <div className="absolute inset-0 -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent z-10" />
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>
        ) : appState === AppState.NOTE_VIEW ? (
          <motion.div key="note" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: -100, opacity: 0 }} className="w-full"><BirthdayNote onBack={() => setAppState(AppState.CARD_VIEW)} onPrev={() => setAppState(AppState.CARD_VIEW)} onNext={() => setAppState(AppState.APPRECIATION_VIEW)} /></motion.div>
        ) : appState === AppState.APPRECIATION_VIEW ? (
          <motion.div key="appreciation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full"><AppreciationList onPrev={() => setAppState(AppState.NOTE_VIEW)} onNext={() => setAppState(AppState.QUIZ_VIEW)} /></motion.div>
        ) : appState === AppState.QUIZ_VIEW ? (
          <motion.div key="quiz" initial={{ x: 100, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 100, opacity: 0 }} className="w-full h-full absolute inset-0 z-50"><PopQuiz onPrev={() => setAppState(AppState.APPRECIATION_VIEW)} onNext={() => setAppState(AppState.GALLERY_VIEW)} /></motion.div>
        ) : appState === AppState.GALLERY_VIEW ? (
          <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="w-full h-full absolute inset-0 z-50"><Gallery onPrev={() => setAppState(AppState.QUIZ_VIEW)} onNext={() => setAppState(AppState.CLOSING_VIEW)} /></motion.div>
        ) : (
          <motion.div key="closing" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="w-full h-full absolute inset-0 z-50"><Closing onPrev={() => setAppState(AppState.GALLERY_VIEW)} /></motion.div>
        )}
      </AnimatePresence>

      <MusicPlayer appState={appState} />
    </div>
  );
};

export default App;