import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import confetti from 'canvas-confetti';
import { Sparkles, Award, RotateCcw, Heart, Star } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images/assetsMap';
import { soundFx } from '../utils/audio';

interface EndingCelebrationProps {
  playerName: string;
  quizScore: number;
  onRestart: () => void;
}

export const EndingCelebration: React.FC<EndingCelebrationProps> = ({
  playerName,
  quizScore,
  onRestart,
}) => {
  useEffect(() => {
    soundFx.playSuccess();
    soundFx.playMagicChime();

    // Trigger celebratory confetti burst
    const duration = 4 * 1000;
    const end = Date.now() + duration;

    const frame = () => {
      confetti({
        particleCount: 4,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981'],
      });
      confetti({
        particleCount: 4,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#f59e0b', '#ec4899', '#8b5cf6', '#10b981'],
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };
    frame();
  }, []);

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-4 sm:p-8 select-none overflow-y-auto z-10">
      {/* Background Castle Celebration overlay */}
      <img
        src={ASSET_IMAGES.background}
        alt="Castle Background"
        className="absolute inset-0 w-full h-full object-cover filter opacity-20 saturate-120"
        referrerPolicy="no-referrer"
      />

      {/* Floating Dancing Animals */}
      <motion.div
        animate={{ y: [-10, 10, -10], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 3 }}
        className="absolute top-10 left-10 text-5xl pointer-events-none z-20"
      >
        🦁
      </motion.div>
      <motion.div
        animate={{ y: [10, -10, 10], rotate: [0, -5, 5, 0] }}
        transition={{ repeat: Infinity, duration: 3.5 }}
        className="absolute top-12 right-12 text-5xl pointer-events-none z-20"
      >
        🦉
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-12 left-12 text-5xl pointer-events-none z-20"
      >
        🦊
      </motion.div>

      {/* Main Royal Certificate Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6, type: 'spring' }}
        className="relative z-30 w-full max-w-2xl bg-white/40 backdrop-blur-2xl rounded-[3rem] p-6 sm:p-10 border-2 border-white/80 shadow-2xl flex flex-col items-center text-center gap-4 my-auto"
      >
        <div className="flex items-center gap-2 text-amber-500">
          <Star className="w-8 h-8 fill-amber-400" />
          <Award className="w-12 h-12 text-amber-600" />
          <Star className="w-8 h-8 fill-amber-400" />
        </div>

        <h1 className="font-black text-cyan-950 text-2xl sm:text-3xl tracking-wide uppercase">
          Royal Certificate of Honor
        </h1>

        <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent my-1" />

        <p className="text-cyan-900 font-medium text-sm sm:text-base">
          This royal decree hereby certifies that
        </p>

        <h2 className="font-black text-pink-500 text-3xl sm:text-4xl drop-shadow-sm my-1">
          Princess {playerName}
        </h2>

        <p className="text-cyan-950 text-sm sm:text-base leading-relaxed font-medium max-w-lg">
          Has completed the journey through the Enchanted Forest, collected all 5 Magical Map Pieces, and shown exceptional <span className="font-bold text-pink-600">Kindness</span>, <span className="font-bold text-cyan-600">Courage</span>, and <span className="font-bold text-emerald-600">Animal Wisdom</span>!
        </p>

        {/* Hug Illustration / Characters */}
        <div className="flex items-center justify-center gap-4 my-2">
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img
              src={ASSET_IMAGES.lion_king}
              alt="Lion King"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <Heart className="w-8 h-8 text-pink-500 fill-pink-400 animate-pulse" />
          <div className="w-20 h-20 rounded-full border-4 border-white overflow-hidden shadow-lg">
            <img
              src={ASSET_IMAGES.golden_fairy}
              alt="Fairy Princess"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>

        <div className="bg-white/60 backdrop-blur-md px-6 py-2 rounded-full border border-white/80 font-bold text-cyan-900 text-sm shadow-2xs">
          Royal Quiz Rank: Master Protector ({quizScore} / 5)
        </div>

        <button
          id="btn-play-again"
          onClick={() => {
            soundFx.playMagicChime();
            onRestart();
          }}
          className="w-full sm:w-auto px-10 py-4 mt-2 bg-pink-400/80 hover:bg-pink-400 backdrop-blur-md border-2 border-pink-200 text-white font-black text-xl rounded-[2rem] shadow-xl hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer flex items-center justify-center gap-3"
        >
          <RotateCcw className="w-6 h-6" />
          <span>Play Again</span>
        </button>
      </motion.div>
    </div>
  );
};
