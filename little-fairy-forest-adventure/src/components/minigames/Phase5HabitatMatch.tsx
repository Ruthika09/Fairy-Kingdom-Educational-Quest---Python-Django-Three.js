import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ANIMALS_DATA } from '../../data/gameData';
import { ASSET_IMAGES } from '../../assets/images/assetsMap';
import { soundFx } from '../../utils/audio';

interface Phase5Props {
  onWin: () => void;
  onBackToMap: () => void;
}

export const Phase5HabitatMatch: React.FC<Phase5Props> = ({ onWin, onBackToMap }) => {
  const habitatAnimals = ANIMALS_DATA.filter((a) =>
    ['polar_bear', 'camel', 'dolphin', 'cow', 'deer'].includes(a.id)
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeAnimal = habitatAnimals[currentIndex];

  const habitats = [
    { name: 'Forest', icon: '🌲', color: 'bg-emerald-100 border-emerald-400 text-emerald-900' },
    { name: 'Ocean', icon: '🌊', color: 'bg-cyan-100 border-cyan-400 text-cyan-900' },
    { name: 'Desert', icon: '🐪', color: 'bg-yellow-100 border-yellow-400 text-yellow-900' },
    { name: 'Farm', icon: '🏡', color: 'bg-amber-100 border-amber-400 text-amber-900' },
    { name: 'Arctic', icon: '🧊', color: 'bg-blue-100 border-blue-400 text-blue-900' },
  ];

  const handleHabitatSelect = (habitatName: string) => {
    if (habitatName === activeAnimal.habitat) {
      soundFx.playSuccess();
      setFeedback(`Wonderful! The ${activeAnimal.name} belongs in the ${activeAnimal.habitat}!`);

      if (currentIndex + 1 < habitatAnimals.length) {
        setTimeout(() => {
          setCurrentIndex((prev) => prev + 1);
          setFeedback(null);
        }, 1200);
      } else {
        setTimeout(() => {
          setIsCompleted(true);
          soundFx.playMagicChime();
        }, 1200);
      }
    } else {
      soundFx.playWrong();
      setFeedback(`Not quite! Think about where ${activeAnimal.name} loves to make its home!`);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-br from-emerald-100 via-teal-100 to-green-200 select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="relative z-20 w-full max-w-4xl flex justify-between items-center bg-white/90 backdrop-blur-md p-4 rounded-2xl border-3 border-emerald-300 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.guardian_turtle}
            alt="Guardian Turtle"
            className="w-14 h-14 rounded-full border-2 border-emerald-400 object-cover shadow"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="font-bold text-emerald-950 text-base sm:text-lg">
              Phase 5: Tree of Wisdom Habitats 🐢
            </h2>
            <p className="text-xs sm:text-sm text-emerald-700">
              Guide animals to their natural home habitats to earn the final Map Piece!
            </p>
          </div>
        </div>

        <button
          onClick={onBackToMap}
          className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-xs sm:text-sm rounded-xl border border-gray-300 cursor-pointer"
        >
          Map 🗺️
        </button>
      </div>

      {/* Main Habitat Challenge Deck */}
      {!isCompleted ? (
        <div className="relative z-20 w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 sm:p-8 border-4 border-emerald-300 shadow-xl flex flex-col items-center text-center gap-4 my-auto">
          <div className="text-xs font-bold text-emerald-700 bg-emerald-100 px-4 py-1 rounded-full">
            Animal {currentIndex + 1} of {habitatAnimals.length}
          </div>

          {/* Active Animal Card */}
          <div className="p-6 bg-emerald-50 rounded-3xl border-3 border-emerald-200 flex flex-col items-center gap-2 shadow-inner w-full max-w-sm">
            <span className="text-6xl">{activeAnimal.iconSvg}</span>
            <h3 className="font-black text-emerald-950 text-2xl">{activeAnimal.name}</h3>
            <p className="text-xs text-emerald-800 font-medium italic">"{activeAnimal.fact}"</p>
          </div>

          {feedback && (
            <p className="text-xs sm:text-sm font-bold text-teal-800 bg-teal-50 px-4 py-1.5 rounded-full border border-teal-200">
              {feedback}
            </p>
          )}

          <p className="font-bold text-emerald-900 text-sm mt-2">
            Where is {activeAnimal.name}'s natural habitat?
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 w-full">
            {habitats.map((h) => (
              <button
                key={h.name}
                onClick={() => handleHabitatSelect(h.name)}
                className={`p-3 rounded-2xl border-3 font-bold text-sm flex items-center justify-center gap-2 cursor-pointer shadow hover:scale-105 active:scale-95 transition-all ${h.color}`}
              >
                <span className="text-2xl">{h.icon}</span>
                <span>{h.name}</span>
              </button>
            ))}
          </div>
        </div>
      ) : (
        /* Victory Modal */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-30 bg-white/95 backdrop-blur-md rounded-3xl p-8 border-4 border-amber-400 shadow-2xl text-center max-w-md flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-emerald-100 flex items-center justify-center text-4xl border-2 border-emerald-300">
            🧩
          </div>
          <h3 className="font-black text-emerald-950 text-2xl">
            Map Piece 5 Collected!
          </h3>
          <p className="text-emerald-800 text-sm font-medium">
            Guardian Turtle: "Honorable Princess, you have completed all 5 forest map pieces! You may now enter Lion King's Castle!"
          </p>
          <button
            id="btn-claim-piece-5"
            onClick={onWin}
            className="w-full py-3.5 bg-gradient-to-r from-emerald-500 via-teal-500 to-amber-500 hover:from-emerald-400 hover:to-amber-400 text-white font-bold text-lg rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Proceed to Castle Gate</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
