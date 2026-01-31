import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Check, ArrowLeft, Trophy, ArrowRight } from 'lucide-react';

interface PopQuizProps {
  onPrev: () => void;
  onNext: () => void;
}

type Question = {
  id: number;
  text: string;
  image?: string; 
  options: {
    text: string;
    isCorrect: boolean;
    wrongMessage?: string;
  }[];
  isSurprise?: boolean;
};

const questions: Question[] = [
  {
    id: 1,
    text: "Do you think the person in this picture is pretty?",
    image: "https://ik.imagekit.io/fcuinpkmj/37959ebc-8adc-4a56-ab5e-f3c85d389e8a.JPG?updatedAt=1769870920412", 
    options: [
      { text: "Yes", isCorrect: true },
      { text: "No", isCorrect: false, wrongMessage: "Are you blind or what? Try again." },
    ],
  },
  {
    id: 2,
    text: "When was our first conversation held?",
    options: [
      { text: "15 June 2025", isCorrect: true },
      { text: "16 June 2025", isCorrect: false, wrongMessage: "IDK if you're just senile or you don't care. Sob." },
    ],
  },
  {
    id: 3,
    text: "What makes you special?",
    isSurprise: true,
    options: [
      { text: "Looks", isCorrect: false, wrongMessage: "Is that all? Try harder!" },
      { text: "Personality", isCorrect: false, wrongMessage: "Meh, nice try. What else?" },
    ],
  },
  {
    id: 4,
    text: "Who has the better taste in music?",
    options: [
      { text: "Me (The Sender)", isCorrect: true },
      { text: "You", isCorrect: false, wrongMessage: "In your dreams! We all know it's me." },
    ],
  },
  {
    id: 5,
    text: "How much do I appreciate you?",
    options: [
      { text: "To the moon & back", isCorrect: true },
      { text: "A normal amount", isCorrect: false, wrongMessage: "Wrong! It's way more than normal!" },
    ],
  },
];

const PopQuiz: React.FC<PopQuizProps> = ({ onPrev, onNext }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error' | 'surprise'; message: string } | null>(null);
  const [clickedSurpriseOptions, setClickedSurpriseOptions] = useState<Set<number>>(new Set());
  const [showNextButton, setShowNextButton] = useState(false);
  const [quizCompleted, setQuizCompleted] = useState(false);

  const currentQuestion = questions[currentIndex];

  const handleAnswer = (optionIndex: number) => {
    if (quizCompleted) return;
    const option = currentQuestion.options[optionIndex];

    if (currentQuestion.isSurprise) {
      if (clickedSurpriseOptions.size >= currentQuestion.options.length) {
         setFeedback({
            type: 'surprise',
            message: "Why aren't you even confused? Of course it's everything, dumbass! You already read the previous page, right? ❤️"
         });
         setShowNextButton(true);
      } else {
         const newClicked = new Set(clickedSurpriseOptions);
         newClicked.add(optionIndex);
         setClickedSurpriseOptions(newClicked);
         setFeedback({
            type: 'error',
            message: option.wrongMessage || "Wrong!"
         });
      }
      return;
    }

    if (option.isCorrect) {
      setFeedback({ type: 'success', message: "Correct! You know your stuff!" });
      setShowNextButton(true);
    } else {
      setFeedback({ type: 'error', message: option.wrongMessage || "Try again!" });
    }
  };

  const nextQuestion = () => {
    setFeedback(null);
    setShowNextButton(false);
    setClickedSurpriseOptions(new Set());
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setFeedback({ type: 'success', message: "Quiz Complete! You're the best!" });
      setQuizCompleted(true);
    }
  };

  useEffect(() => {
    if (feedback?.type === 'error') {
      const timer = setTimeout(() => setFeedback(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [feedback]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-orange-100 to-red-100 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#F59E0B 2px, transparent 2px)', backgroundSize: '30px 30px' }}></div>

      <AnimatePresence>
        {feedback && feedback.type !== 'surprise' && (
          <motion.div
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className={`fixed top-0 left-4 right-4 md:left-auto md:right-auto md:w-96 rounded-2xl p-4 flex items-center gap-3 shadow-xl z-50 backdrop-blur-md border border-white/20
              ${feedback.type === 'error' ? 'bg-red-500/80 text-white' : 'bg-green-500/80 text-white'}`}
          >
            <div className={`p-1 rounded-full ${feedback.type === 'error' ? 'bg-white/20' : 'bg-white/20'}`}>
              {feedback.type === 'error' ? <X size={20} /> : <Check size={20} />}
            </div>
            <span className="font-medium text-sm md:text-base">{feedback.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {feedback?.type === 'surprise' && (
           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             exit={{ opacity: 0 }}
             className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm overflow-hidden"
           >
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                  {[...Array(30)].map((_, i) => (
                      <motion.div
                          key={i}
                          className="absolute text-4xl"
                          initial={{ top: Math.random() * 100 + "%", left: Math.random() * 100 + "%", scale: 0, opacity: 0 }}
                          animate={{ y: [0, -100, 100], x: [0, Math.random() * 50 - 25], scale: [1, 1.5, 1], opacity: [0, 1, 0] }}
                          transition={{ duration: 3 + Math.random() * 2, repeat: Infinity, delay: Math.random() * 2 }}
                      >
                          {['🤬', '😤', '💖', '✨', '🤡', '🤣', '❤️'][i % 7]}
                      </motion.div>
                  ))}
              </div>

              <motion.div 
                 initial={{ scale: 0.8, opacity: 0 }}
                 animate={{ scale: 1, opacity: 1 }}
                 className="bg-white rounded-3xl p-8 max-w-md text-center shadow-2xl relative z-10 mx-4"
              >
                 <motion.div animate={{ rotate: [0, -5, 5, 0] }} transition={{ repeat: Infinity, duration: 0.5 }}>
                    <Trophy className="w-20 h-20 text-yellow-500 mx-auto mb-4" />
                 </motion.div>
                 <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 leading-relaxed">
                    {feedback.message}
                 </h2>
                 <button onClick={() => { setFeedback(null); setShowNextButton(true); }} className="px-8 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-full hover:bg-yellow-300 transition-colors shadow-lg transform hover:scale-105 active:scale-95">
                    Okay, I get it! 😂
                 </button>
              </motion.div>
           </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        key={currentQuestion.id}
        initial={{ x: 300, opacity: 0, rotate: 5 }}
        animate={{ x: 0, opacity: 1, rotate: 0 }}
        exit={{ x: -300, opacity: 0, rotate: -5 }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        className="bg-white rounded-[2rem] shadow-2xl p-6 w-full max-w-md border-4 border-yellow-200 relative z-10"
      >
        <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-yellow-400 text-yellow-900 font-bold px-6 py-2 rounded-full shadow-lg border-2 border-white">
            Question {currentIndex + 1} / {questions.length}
        </div>

        <div className="mt-6 mb-8 text-center">
            {currentQuestion.image && (
                <div className="mb-4 rounded-xl overflow-hidden shadow-md mx-auto w-48 h-48 rotate-2 border-4 border-white">
                    <img src={currentQuestion.image} alt="Quiz Context" className="w-full h-full object-cover" />
                </div>
            )}
            <h2 className="text-2xl font-bold text-gray-800 leading-tight">{currentQuestion.text}</h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
            {currentQuestion.options.map((option, idx) => (
                <button
                    key={idx}
                    onClick={() => handleAnswer(idx)}
                    disabled={quizCompleted}
                    className={`group relative w-full py-4 px-6 rounded-xl border-2 transition-all duration-200 text-left flex items-center justify-between
                        ${quizCompleted ? 'bg-gray-100 border-gray-200 opacity-50 cursor-not-allowed' : 'bg-gray-50 hover:bg-yellow-50 border-gray-100 hover:border-yellow-300'}
                    `}
                >
                    <span className="font-semibold text-gray-700 group-hover:text-yellow-800 text-lg">{option.text}</span>
                    <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-yellow-400"></div>
                </button>
            ))}
        </div>

        <AnimatePresence>
            {showNextButton && !quizCompleted && (
                <motion.button
                    initial={{ height: 0, opacity: 0, marginTop: 0 }}
                    animate={{ height: 'auto', opacity: 1, marginTop: 24 }}
                    exit={{ height: 0, opacity: 0, marginTop: 0 }}
                    onClick={nextQuestion}
                    className="w-full py-4 bg-gray-900 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
                >
                    {currentIndex === questions.length - 1 ? "Finish Quiz" : "Next Question"}
                </motion.button>
            )}
        </AnimatePresence>
      </motion.div>

      <motion.button onClick={onPrev} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-8 left-8 w-14 h-14 bg-white text-gray-800 rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-100">
        <ArrowLeft size={24} />
      </motion.button>

      <AnimatePresence>
        {quizCompleted && (
          <motion.button key="next-quiz-btn" onClick={onNext} initial={{ scale: 0, rotate: 180 }} animate={{ scale: 1, rotate: 0 }} exit={{ scale: 0, rotate: -180 }} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="fixed bottom-8 right-8 w-16 h-16 bg-white text-black rounded-full shadow-lg flex items-center justify-center z-40 hover:bg-gray-100">
            <ArrowRight size={32} />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopQuiz;