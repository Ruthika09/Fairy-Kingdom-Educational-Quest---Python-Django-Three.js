import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Shield, ArrowRight, Lock, Unlock } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images/assetsMap';
import { soundFx } from '../../utils/audio';

interface Phase3Props {
  onWin: () => void;
  onBackToMap: () => void;
}

interface ShadowCard {
  id: string;
  name: string;
  icon: string;
  shadowStyle: string;
}

export const Phase3ShadowMatch: React.FC<Phase3Props> = ({ onWin, onBackToMap }) => {
  const cards: ShadowCard[] = [
    { id: 'c1', name: 'Owl 🦉', icon: '🦉', shadowStyle: 'filter brightness-0 invert-0 grayscale opacity-80' },
    { id: 'c2', name: 'Lion 🦁', icon: '🦁', shadowStyle: 'filter brightness-0 invert-0 grayscale opacity-80' },
    { id: 'c3', name: 'Penguin 🐧', icon: '🐧', shadowStyle: 'filter brightness-0 invert-0 grayscale opacity-80' },
    { id: 'c4', name: 'Dolphin 🐬', icon: '🐬', shadowStyle: 'filter brightness-0 invert-0 grayscale opacity-80' },
  ];

  const [selectedAnimal, setSelectedAnimal] = useState<string | null>(null);
  const [solvedIds, setSolvedIds] = useState<string[]>([]);
  const [isRescued, setIsRescued] = useState(false);

  const handleAnimalSelect = (id: string) => {
    soundFx.playButtonClick();
    setSelectedAnimal(id);
  };

  const handleShadowMatch = (id: string) => {
    if (!selectedAnimal) {
      soundFx.playWrong();
      return;
    }

    if (selectedAnimal === id) {
      soundFx.playSuccess();
      setSolvedIds((prev) => [...prev, id]);
      setSelectedAnimal(null);

      if (solvedIds.length + 1 === cards.length) {
        setTimeout(() => {
          setIsRescued(true);
          soundFx.playMagicChime();
        }, 1000);
      }
    } else {
      soundFx.playWrong();
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-br from-purple-900 via-indigo-900 to-pink-900 text-white select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="relative z-20 w-full max-w-4xl flex justify-between items-center bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-pink-300/30 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.fairy_rose}
            alt="Fairy Rose"
            className="w-14 h-14 rounded-full border-2 border-pink-400 object-cover shadow"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="font-bold text-pink-200 text-base sm:text-lg">
              Phase 3: Crystal Waterfall Rescue 💎
            </h2>
            <p className="text-xs sm:text-sm text-pink-300">
              Match animals with their mysterious shadows to unlock Fairy Rose's cage!
            </p>
          </div>
        </div>

        <button
          onClick={onBackToMap}
          className="px-4 py-2 bg-white/20 hover:bg-white/30 text-white font-bold text-xs sm:text-sm rounded-xl border border-white/30 cursor-pointer"
        >
          Map 🗺️
        </button>
      </div>

      {/* Main Rescue Screen */}
      {!isRescued ? (
        <div className="relative z-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 my-4 items-center">
          {/* Animals Deck */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 flex flex-col gap-3">
            <h3 className="font-bold text-pink-200 text-center text-sm mb-2">1. Select Animal:</h3>
            {cards.map((c) => {
              const isSolved = solvedIds.includes(c.id);
              const isSelected = selectedAnimal === c.id;

              return (
                <button
                  key={c.id}
                  disabled={isSolved}
                  onClick={() => handleAnimalSelect(c.id)}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-between transition-all cursor-pointer ${
                    isSolved
                      ? 'bg-emerald-500/30 border-emerald-400 text-emerald-200'
                      : isSelected
                      ? 'bg-pink-500 border-amber-300 scale-105 shadow-lg'
                      : 'bg-white/10 border-white/20 hover:bg-white/20'
                  }`}
                >
                  <span className="text-3xl">{c.icon}</span>
                  <span className="font-bold text-sm">{c.name}</span>
                </button>
              );
            })}
          </div>

          {/* Central Trapped Fairy Cage */}
          <div className="relative flex flex-col items-center justify-center p-6 bg-purple-950/60 rounded-3xl border-4 border-cyan-400/50 shadow-2xl backdrop-blur-md min-h-[280px]">
            <div className="absolute inset-0 bg-cyan-400/10 rounded-2xl animate-pulse pointer-events-none" />

            <div className="relative z-10 w-32 h-32 rounded-full border-4 border-cyan-300 overflow-hidden shadow-lg bg-pink-900/40 p-1 mb-3">
              <img
                src={ASSET_IMAGES.fairy_rose}
                alt="Trapped Rose"
                className="w-full h-full object-cover filter brightness-90"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-cyan-500/20 backdrop-blur-[1px] flex items-center justify-center">
                <Lock className="w-10 h-10 text-cyan-200 animate-bounce" />
              </div>
            </div>

            <p className="font-bold text-cyan-200 text-xs sm:text-sm text-center">
              Fairy Rose: "Please match the 4 animal shadows to break the spell!"
            </p>
            <div className="mt-2 text-xs text-pink-300 font-semibold bg-pink-900/60 px-3 py-1 rounded-full border border-pink-400/30">
              Keys Unlocked: {solvedIds.length} / 4
            </div>
          </div>

          {/* Shadows Grid */}
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-3xl border border-white/20 flex flex-col gap-3">
            <h3 className="font-bold text-pink-200 text-center text-sm mb-2">2. Match Shadow:</h3>
            {cards.map((c) => {
              const isSolved = solvedIds.includes(c.id);

              return (
                <button
                  key={c.id}
                  disabled={isSolved}
                  onClick={() => handleShadowMatch(c.id)}
                  className={`p-3 rounded-2xl border-2 flex items-center justify-center transition-all cursor-pointer ${
                    isSolved
                      ? 'bg-emerald-500/30 border-emerald-400 opacity-50'
                      : 'bg-black/40 border-cyan-300/40 hover:bg-black/60'
                  }`}
                >
                  <span className={`text-4xl ${isSolved ? '' : c.shadowStyle}`}>{c.icon}</span>
                </button>
              );
            })}
          </div>
        </div>
      ) : (
        /* Victory Modal */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-30 bg-white/95 text-purple-950 backdrop-blur-md rounded-3xl p-8 border-4 border-amber-400 shadow-2xl text-center max-w-md flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-pink-100 flex items-center justify-center text-4xl border-2 border-pink-300">
            💖
          </div>
          <h3 className="font-black text-pink-950 text-2xl">
            Fairy Rose Rescued!
          </h3>
          <p className="text-pink-800 text-sm font-medium">
            Fairy Rose: "Thank you, sweet Princess! I am now your loyal forest companion! Here is Map Piece 3!"
          </p>
          <button
            id="btn-claim-piece-3"
            onClick={onWin}
            className="w-full py-3.5 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-400 hover:to-purple-500 text-white font-bold text-lg rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Collect Piece & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
