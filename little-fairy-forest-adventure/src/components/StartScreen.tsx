import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Play, Settings, Volume2, VolumeX, LogOut, RotateCcw } from 'lucide-react';
import { ASSET_IMAGES } from '../assets/images/assetsMap';
import { soundFx } from '../utils/audio';

interface StartScreenProps {
  onStart: () => void;
  onContinue: () => void;
  onOpenSettings: () => void;
  hasSavedGame: boolean;
  musicEnabled: boolean;
  onToggleMusic: () => void;
}

export const StartScreen: React.FC<StartScreenProps> = ({
  onStart,
  onContinue,
  onOpenSettings,
  hasSavedGame,
  musicEnabled,
  onToggleMusic,
}) => {
  return (
    <div className="relative w-full h-full flex flex-col justify-between p-6 sm:p-8 select-none overflow-hidden z-10">
      {/* Background Soft Forest Image with light opacity overlay */}
      <img
        src={ASSET_IMAGES.background}
        alt="Magical Forest Background"
        className="absolute inset-0 w-full h-full object-cover object-center filter opacity-20 saturate-120"
        referrerPolicy="no-referrer"
      />

      {/* Floating Sparkles & Butterflies */}
      <motion.div
        animate={{ y: [0, -15, 0], rotate: [0, 5, -5, 0] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-20 left-12 text-4xl pointer-events-none z-20 opacity-70"
      >
        🦋
      </motion.div>
      <motion.div
        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 1 }}
        className="absolute top-1/3 right-16 text-4xl pointer-events-none z-20 opacity-70"
      >
        ✨
      </motion.div>

      {/* Top Nav Bar */}
      <nav className="relative z-30 w-full max-w-6xl mx-auto flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-yellow-400 rounded-full shadow-[0_0_15px_rgba(250,204,21,0.6)] flex items-center justify-center text-white text-xl">
            ✨
          </div>
          <span className="text-xl sm:text-2xl font-bold text-cyan-800 tracking-tight drop-shadow-sm">
            Rainbow Kingdom
          </span>
        </div>

        <div className="flex items-center gap-3">
          <button
            id="btn-music-toggle"
            onClick={() => {
              soundFx.playButtonClick();
              onToggleMusic();
            }}
            className="px-5 py-2.5 bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/50 rounded-full text-cyan-900 font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 text-sm sm:text-base"
          >
            {musicEnabled ? <Volume2 className="w-5 h-5 text-cyan-700" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
            <span>Music: {musicEnabled ? 'On' : 'Muted'}</span>
          </button>

          <button
            id="btn-settings"
            onClick={() => {
              soundFx.playButtonClick();
              onOpenSettings();
            }}
            className="px-5 py-2.5 bg-white/40 hover:bg-white/60 backdrop-blur-md border border-white/50 rounded-full text-cyan-900 font-semibold shadow-sm hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-2 text-sm sm:text-base"
          >
            <Settings className="w-5 h-5 text-cyan-700" />
            <span>Settings</span>
          </button>
        </div>
      </nav>

      {/* Main Frosted Title & Action Buttons */}
      <main className="relative z-30 flex-1 flex flex-col items-center justify-center text-center my-auto px-4">
        <motion.div
          initial={{ scale: 0.9, opacity: 0, y: -15 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.7, type: 'spring' }}
          className="flex flex-col items-center mb-8"
        >
          <h1 className="text-[52px] sm:text-[72px] md:text-[84px] font-black text-transparent bg-clip-text bg-gradient-to-b from-cyan-600 to-emerald-600 leading-none drop-shadow-sm">
            Little Fairy
          </h1>
          <h2 className="text-[38px] sm:text-[52px] md:text-[62px] font-bold text-pink-500 drop-shadow-md">
            Forest Adventure
          </h2>
          <p className="text-cyan-800 font-medium text-base sm:text-lg mt-3 bg-white/30 backdrop-blur-md px-6 py-2 rounded-full border border-white/40 shadow-sm">
            Help the Princess return to her Father's Kingdom!
          </p>
        </motion.div>

        {/* Action Buttons in Frosted Glass */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-md"
        >
          <button
            id="btn-start-game"
            onClick={() => {
              soundFx.playMagicChime();
              onStart();
            }}
            className="w-full sm:w-auto px-8 py-4 bg-white/60 hover:bg-white/80 backdrop-blur-xl border-2 border-white rounded-[2rem] text-xl sm:text-2xl font-bold text-cyan-900 shadow-xl hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-3"
          >
            <Sparkles className="w-6 h-6 text-amber-500 animate-spin" />
            <span>Start Journey</span>
          </button>

          {hasSavedGame && (
            <button
              id="btn-continue-game"
              onClick={() => {
                soundFx.playButtonClick();
                onContinue();
              }}
              className="w-full sm:w-auto px-8 py-4 bg-pink-400/80 hover:bg-pink-400 backdrop-blur-md border-2 border-pink-200 rounded-[2rem] text-lg sm:text-xl font-bold text-white shadow-lg hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Play className="w-5 h-5 fill-current" />
              <span>Continue Story</span>
            </button>
          )}
        </motion.div>
      </main>

      {/* Bottom Speech Box / Princess Preview */}
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="relative z-30 w-full max-w-4xl mx-auto bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] sm:rounded-[3rem] p-5 sm:p-7 flex items-center gap-5 sm:gap-8 shadow-2xl"
      >
        <div className="w-20 h-20 sm:w-28 sm:h-28 bg-gradient-to-br from-yellow-100 to-pink-100 rounded-full border-4 border-white shadow-inner shrink-0 flex items-center justify-center overflow-hidden">
          <img
            src={ASSET_IMAGES.golden_fairy}
            alt="Princess Emily"
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-center mb-1.5">
            <span className="text-pink-600 font-bold text-base sm:text-lg px-4 py-1 bg-white/80 rounded-full shadow-sm">
              Princess Emily
            </span>
            <div className="flex gap-1.5">
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse"></div>
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-75"></div>
              <div className="w-2.5 h-2.5 bg-white rounded-full animate-pulse delay-150"></div>
            </div>
          </div>
          <p className="text-cyan-900 text-sm sm:text-xl font-medium leading-relaxed italic">
            "Oh no! I've drifted too far from the Rainbow Blossom Kingdom. I need to find the Map Pieces to get home to my father, the Lion King!"
          </p>
        </div>

        <button
          onClick={() => {
            soundFx.playMagicChime();
            onStart();
          }}
          className="shrink-0 w-12 h-12 bg-white/60 hover:bg-white/80 rounded-full flex items-center justify-center text-cyan-800 font-bold shadow-md cursor-pointer transition-all hover:scale-110"
        >
          ▶
        </button>
      </motion.div>
    </div>
  );
};
