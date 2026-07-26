import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Check, ArrowRight, HelpCircle } from 'lucide-react';
import { ANIMALS_DATA } from '../../data/gameData';
import { ASSET_IMAGES } from '../../assets/images/assetsMap';
import { soundFx } from '../../utils/audio';

interface Phase1Props {
  onWin: () => void;
  onBackToMap: () => void;
}

export const Phase1HerbivoreCarnivore: React.FC<Phase1Props> = ({ onWin, onBackToMap }) => {
  const [unsortedAnimals, setUnsortedAnimals] = useState(
    ANIMALS_DATA.filter((a) => ['cow', 'lion', 'horse', 'wolf', 'duck', 'dolphin'].includes(a.id))
  );
  const [herbivores, setHerbivores] = useState<typeof ANIMALS_DATA>([]);
  const [carnivores, setCarnivores] = useState<typeof ANIMALS_DATA>([]);
  const [activeFact, setActiveFact] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleSort = (animalId: string, targetDiet: 'Herbivore' | 'Carnivore') => {
    const animal = unsortedAnimals.find((a) => a.id === animalId);
    if (!animal) return;

    if (animal.diet === targetDiet) {
      soundFx.playSuccess();
      setActiveFact(`Correct! ${animal.fact}`);
      setUnsortedAnimals((prev) => prev.filter((a) => a.id !== animalId));

      if (targetDiet === 'Herbivore') {
        setHerbivores((prev) => [...prev, animal]);
      } else {
        setCarnivores((prev) => [...prev, animal]);
      }

      // Check win condition
      if (unsortedAnimals.length === 1) {
        setTimeout(() => {
          setIsCompleted(true);
          soundFx.playMagicChime();
        }, 1000);
      }
    } else {
      soundFx.playWrong();
      setActiveFact(`Oops! ${animal.name} is a ${animal.diet}. Try again!`);
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 select-none overflow-y-auto z-10">
      {/* Header Banner */}
      <div className="relative z-20 w-full max-w-4xl flex justify-between items-center bg-white/40 backdrop-blur-2xl p-4 rounded-[2rem] border border-white/60 shadow-lg">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.wise_owl}
            alt="Wise Owl"
            className="w-14 h-14 rounded-full border-2 border-white object-cover shadow-inner"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="font-bold text-cyan-950 text-base sm:text-lg">
              Phase 1: Wise Owl's Challenge 🦉
            </h2>
            <p className="text-xs sm:text-sm text-cyan-800 font-medium">
              Sort animals into Herbivores (Eat Plants) and Carnivores (Eat Meat)!
            </p>
          </div>
        </div>

        <button
          onClick={onBackToMap}
          className="px-4 py-2 bg-white/60 hover:bg-white/80 backdrop-blur-md text-cyan-900 font-bold text-xs sm:text-sm rounded-full border border-white/80 cursor-pointer shadow-sm transition-all"
        >
          Map 🗺️
        </button>
      </div>

      {/* Fact Feedback Toast */}
      {activeFact && (
        <motion.div
          initial={{ y: -10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="relative z-20 w-full max-w-2xl bg-white/60 backdrop-blur-md border border-white/80 p-3.5 rounded-[1.5rem] shadow-sm text-center text-cyan-950 font-bold text-sm my-2"
        >
          {activeFact}
        </motion.div>
      )}

      {/* Main Sorting Baskets Area */}
      <div className="relative z-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
        {/* Herbivore Basket */}
        <div className="bg-emerald-300/25 backdrop-blur-xl rounded-[2.5rem] p-5 border-2 border-white/80 shadow-xl flex flex-col items-center min-h-[220px]">
          <div className="flex items-center gap-2 mb-3 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white text-emerald-950 font-black text-base shadow-2xs">
            <span>🌿 HERBIVORES</span>
            <span className="text-xs text-emerald-800 font-medium">(Eats Plants & Grass)</span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center w-full min-h-[120px]">
            {herbivores.map((animal) => (
              <motion.div
                key={animal.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-white shadow"
              >
                <span className="text-2xl">{animal.iconSvg}</span>
                <span className="font-bold text-emerald-900 text-sm">{animal.name}</span>
                <Check className="w-4 h-4 text-emerald-600" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* Carnivore Basket */}
        <div className="bg-amber-300/25 backdrop-blur-xl rounded-[2.5rem] p-5 border-2 border-white/80 shadow-xl flex flex-col items-center min-h-[220px]">
          <div className="flex items-center gap-2 mb-3 bg-white/70 backdrop-blur-md px-4 py-1.5 rounded-full border border-white text-amber-950 font-black text-base shadow-2xs">
            <span>🥩 CARNIVORES</span>
            <span className="text-xs text-amber-800 font-medium">(Eats Meat & Fish)</span>
          </div>

          <div className="flex flex-wrap gap-3 justify-center items-center w-full min-h-[120px]">
            {carnivores.map((animal) => (
              <motion.div
                key={animal.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex items-center gap-2 bg-white/80 backdrop-blur-md px-3.5 py-2 rounded-full border border-white shadow"
              >
                <span className="text-2xl">{animal.iconSvg}</span>
                <span className="font-bold text-amber-900 text-sm">{animal.name}</span>
                <Check className="w-4 h-4 text-amber-600" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Unsorted Animals Deck */}
      {!isCompleted ? (
        <div className="relative z-20 w-full max-w-4xl bg-white/40 backdrop-blur-2xl rounded-[2.5rem] p-5 border border-white/60 shadow-xl flex flex-col items-center">
          <p className="font-bold text-cyan-950 mb-3 text-sm sm:text-base">
            Tap where each animal belongs:
          </p>

          <div className="flex flex-wrap justify-center gap-4">
            {unsortedAnimals.map((animal) => (
              <div
                key={animal.id}
                className="bg-white/60 backdrop-blur-md p-3.5 rounded-[1.5rem] border border-white/80 shadow flex flex-col items-center gap-2"
              >
                <span className="text-4xl">{animal.iconSvg}</span>
                <span className="font-bold text-cyan-950 text-sm">{animal.name}</span>

                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => handleSort(animal.id, 'Herbivore')}
                    className="px-3 py-1 bg-emerald-500/80 hover:bg-emerald-500 text-white font-bold text-xs rounded-full cursor-pointer shadow-sm transition-all"
                  >
                    🌿 Herbivore
                  </button>
                  <button
                    onClick={() => handleSort(animal.id, 'Carnivore')}
                    className="px-3 py-1 bg-amber-500/80 hover:bg-amber-500 text-white font-bold text-xs rounded-full cursor-pointer shadow-sm transition-all"
                  >
                    🥩 Carnivore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Victory Screen Modal */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-30 bg-white/60 backdrop-blur-2xl rounded-[3rem] p-8 border-2 border-white/80 shadow-2xl text-center max-w-md flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-white/80 flex items-center justify-center text-4xl border-2 border-white shadow-inner">
            🧩
          </div>
          <h3 className="font-black text-cyan-950 text-2xl">
            Map Piece 1 Collected!
          </h3>
          <p className="text-cyan-800 text-sm font-medium">
            Wise Owl: "Hoo-hoo! Excellent work, Princess! You know your herbivores and carnivores!"
          </p>
          <button
            id="btn-claim-piece-1"
            onClick={onWin}
            className="w-full py-3.5 bg-pink-400/80 hover:bg-pink-400 backdrop-blur-md border-2 border-pink-200 text-white font-bold text-lg rounded-[2rem] shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Collect Piece & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
