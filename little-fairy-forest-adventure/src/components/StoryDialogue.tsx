import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, Play, FastForward, Sparkles } from 'lucide-react';
import { DialogueLine } from '../types';
import { ASSET_IMAGES, CHARACTER_DESCRIPTIONS } from '../assets/images/assetsMap';
import { soundFx } from '../utils/audio';

interface StoryDialogueProps {
  dialogues: DialogueLine[];
  playerName: string;
  onComplete: () => void;
}

export const StoryDialogue: React.FC<StoryDialogueProps> = ({
  dialogues,
  playerName,
  onComplete,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  const currentLine = dialogues[currentIndex];

  // Resolve character details
  const speakerKey = currentLine?.speakerKey || 'lion_king';
  const charData = CHARACTER_DESCRIPTIONS[speakerKey as keyof typeof CHARACTER_DESCRIPTIONS] || {
    name: currentLine?.speakerName || 'Forest Friend',
    title: 'Forest Traveler',
    color: 'from-pink-400 to-purple-500',
    avatar: ASSET_IMAGES.wise_owl,
  };

  // Replace placeholder name with actual player name
  const fullText = (currentLine?.text || '').replace(/Princess Emily/g, `Princess ${playerName}`);

  // Typewriter effect
  useEffect(() => {
    setDisplayedText('');
    setIsTyping(true);

    let idx = 0;
    const timer = setInterval(() => {
      if (idx < fullText.length) {
        setDisplayedText((prev) => prev + fullText.charAt(idx));
        idx++;
      } else {
        setIsTyping(false);
        clearInterval(timer);
      }
    }, 28);

    return () => clearInterval(timer);
  }, [currentIndex, fullText]);

  // Auto-play feature
  useEffect(() => {
    if (autoPlay && !isTyping) {
      const autoTimer = setTimeout(() => {
        handleNext();
      }, 2500);
      return () => clearTimeout(autoTimer);
    }
  }, [autoPlay, isTyping, currentIndex]);

  const handleNext = () => {
    soundFx.playButtonClick();
    if (isTyping) {
      setDisplayedText(fullText);
      setIsTyping(false);
      return;
    }

    if (currentIndex < dialogues.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      soundFx.playMagicChime();
      onComplete();
    }
  };

  const handleSkip = () => {
    soundFx.playButtonClick();
    onComplete();
  };

  return (
    <div className="relative w-full h-full flex flex-col justify-end p-4 sm:p-8 z-10">
      {/* Active Character Illustration */}
      <AnimatePresence mode="wait">
        <motion.div
          key={speakerKey + currentIndex}
          initial={{ y: 20, opacity: 0, scale: 0.95 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="absolute bottom-40 sm:bottom-48 left-6 sm:left-12 flex items-end gap-4 pointer-events-none z-20"
        >
          <div className="relative">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-white shadow-xl bg-gradient-to-br from-yellow-100 to-pink-100 flex items-center justify-center">
              <img
                src={charData.avatar}
                alt={charData.name}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            {/* Sparkle badge */}
            <div className="absolute -top-1 -right-1 bg-yellow-400 p-2 rounded-full border-2 border-white shadow-md text-sm">
              ✨
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Frosted Glass Dialogue Box */}
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative z-30 w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-8 shadow-2xl flex flex-col gap-3"
      >
        {/* Speaker Badge */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="px-5 py-1.5 rounded-full text-pink-600 font-bold text-base sm:text-lg bg-white/80 shadow-sm">
              {charData.name}
            </span>
            <span className="text-xs sm:text-sm font-semibold text-cyan-800 bg-white/50 px-3.5 py-1 rounded-full border border-white/50 shadow-2xs">
              {charData.title}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setAutoPlay(!autoPlay)}
              className={`px-4 py-1.5 rounded-full text-xs font-bold border transition-all cursor-pointer flex items-center gap-1 ${
                autoPlay
                  ? 'bg-yellow-400 border-yellow-300 text-cyan-950 shadow-sm'
                  : 'bg-white/40 border-white/50 text-cyan-900 hover:bg-white/60'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>{autoPlay ? 'Auto ON' : 'Auto'}</span>
            </button>

            <button
              onClick={handleSkip}
              className="px-4 py-1.5 rounded-full text-xs font-bold border border-white/50 bg-white/40 text-cyan-900 hover:bg-white/60 transition-all cursor-pointer flex items-center gap-1 shadow-2xs"
            >
              <FastForward className="w-3.5 h-3.5" />
              <span>Skip</span>
            </button>
          </div>
        </div>

        {/* Dialogue Text Area */}
        <div
          onClick={handleNext}
          className="min-h-[90px] sm:min-h-[110px] text-cyan-950 font-medium text-lg sm:text-2xl leading-relaxed cursor-pointer select-none py-2"
        >
          {displayedText}
          {isTyping && <span className="inline-block w-2 h-5 bg-pink-500 ml-1 animate-pulse" />}
        </div>

        {/* Footer controls / Progress */}
        <div className="flex justify-between items-center pt-2 border-t border-white/40">
          <span className="text-xs font-bold text-cyan-800">
            Dialogue {currentIndex + 1} of {dialogues.length}
          </span>

          <button
            id="btn-dialogue-next"
            onClick={handleNext}
            className="flex items-center gap-2 px-8 py-3 bg-white/70 hover:bg-white/90 backdrop-blur-xl border border-white text-cyan-900 font-bold text-base rounded-full shadow-md hover:shadow-lg transition-all cursor-pointer active:scale-95"
          >
            <span>{currentIndex < dialogues.length - 1 ? 'Next' : 'Continue'}</span>
            <ChevronRight className="w-5 h-5 text-pink-500" />
          </button>
        </div>
      </motion.div>
    </div>
  );
};
