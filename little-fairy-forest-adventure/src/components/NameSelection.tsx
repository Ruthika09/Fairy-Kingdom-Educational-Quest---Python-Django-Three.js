import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, Heart } from 'lucide-react';
import { FairyAvatar } from '../types';
import { ASSET_IMAGES } from '../assets/images/assetsMap';
import { soundFx } from '../utils/audio';

interface NameSelectionProps {
  initialName: string;
  initialAvatar: FairyAvatar;
  onSubmit: (name: string, avatar: FairyAvatar) => void;
}

export const NameSelection: React.FC<NameSelectionProps> = ({
  initialName,
  initialAvatar,
  onSubmit,
}) => {
  const [name, setName] = useState(initialName || 'Emily');
  const [avatar, setAvatar] = useState<FairyAvatar>(initialAvatar || 'golden');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    soundFx.playMagicChime();
    onSubmit(name.trim(), avatar);
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-center p-6 select-none overflow-y-auto z-10">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="relative z-20 w-full max-w-2xl bg-white/40 backdrop-blur-2xl rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 border-2 border-white/70 shadow-2xl flex flex-col items-center text-center"
      >
        {/* Lion King Welcome Speech Bubble */}
        <div className="flex items-center gap-4 mb-6 bg-white/60 backdrop-blur-md p-4 rounded-[1.5rem] border border-white/80 shadow-sm w-full">
          <img
            src={ASSET_IMAGES.lion_king}
            alt="Lion King"
            className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-white object-cover shadow-md shrink-0"
            referrerPolicy="no-referrer"
          />
          <div className="text-left">
            <h3 className="font-bold text-cyan-900 text-base sm:text-lg flex items-center gap-1">
              <span>Lion King</span> 👑
            </h3>
            <p className="text-cyan-800 text-sm sm:text-base italic font-medium">
              "Greetings, young traveler! What is your magical fairy name?"
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="w-full flex flex-col items-center gap-6">
          {/* Avatar Selector */}
          <div className="w-full">
            <label className="block text-cyan-900 font-bold text-lg mb-3">
              Choose Your Fairy Sparkle Style:
            </label>
            <div className="grid grid-cols-3 gap-4">
              <button
                type="button"
                onClick={() => {
                  soundFx.playButtonClick();
                  setAvatar('golden');
                }}
                className={`p-3 rounded-[1.5rem] border-2 transition-all duration-200 flex flex-col items-center gap-2 cursor-pointer ${
                  avatar === 'golden'
                    ? 'border-amber-400 bg-white/80 scale-105 shadow-md'
                    : 'border-white/60 bg-white/40 backdrop-blur-md hover:bg-white/60'
                }`}
              >
                <img
                  src={ASSET_IMAGES.golden_fairy}
                  alt="Golden Fairy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-amber-300"
                  referrerPolicy="no-referrer"
                />
                <span className="font-bold text-amber-900 text-xs sm:text-sm">Golden Leaves</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playButtonClick();
                  setAvatar('green');
                }}
                className={`p-3 rounded-[1.5rem] border-2 transition-all duration-200 flex flex-col items-center gap-2 cursor-pointer ${
                  avatar === 'green'
                    ? 'border-emerald-400 bg-white/80 scale-105 shadow-md'
                    : 'border-white/60 bg-white/40 backdrop-blur-md hover:bg-white/60'
                }`}
              >
                <img
                  src={ASSET_IMAGES.green_fairy}
                  alt="Green Fairy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-emerald-300"
                  referrerPolicy="no-referrer"
                />
                <span className="font-bold text-emerald-900 text-xs sm:text-sm">Daisy Meadow</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  soundFx.playButtonClick();
                  setAvatar('rose');
                }}
                className={`p-3 rounded-[1.5rem] border-2 transition-all duration-200 flex flex-col items-center gap-2 cursor-pointer ${
                  avatar === 'rose'
                    ? 'border-rose-400 bg-white/80 scale-105 shadow-md'
                    : 'border-white/60 bg-white/40 backdrop-blur-md hover:bg-white/60'
                }`}
              >
                <img
                  src={ASSET_IMAGES.rose_fairy}
                  alt="Rose Fairy"
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-rose-300"
                  referrerPolicy="no-referrer"
                />
                <span className="font-bold text-rose-900 text-xs sm:text-sm">Rose Petals</span>
              </button>
            </div>
          </div>

          {/* Name Input */}
          <div className="w-full text-left">
            <label htmlFor="fairy-name-input" className="block text-cyan-900 font-bold text-lg mb-2">
              Enter Your Fairy Name:
            </label>
            <div className="relative flex items-center">
              <input
                id="fairy-name-input"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={20}
                placeholder="e.g. Princess Emily"
                className="w-full px-6 py-4 bg-white/60 border-2 border-white/80 rounded-[1.5rem] text-xl font-bold text-cyan-950 placeholder-cyan-500/60 focus:outline-none focus:border-pink-300 focus:bg-white/90 shadow-inner"
                required
              />
              <Heart className="absolute right-4 w-6 h-6 text-pink-400 fill-pink-300" />
            </div>
          </div>

          {/* Submit Button */}
          <button
            id="btn-submit-name"
            type="submit"
            disabled={!name.trim()}
            className="w-full py-4 mt-2 bg-pink-400/80 hover:bg-pink-400 backdrop-blur-md border-2 border-pink-200 text-white font-black text-xl rounded-[2rem] shadow-lg hover:shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            <span>Begin My Journey</span>
            <ArrowRight className="w-6 h-6" />
          </button>
        </form>
      </motion.div>
    </div>
  );
};
