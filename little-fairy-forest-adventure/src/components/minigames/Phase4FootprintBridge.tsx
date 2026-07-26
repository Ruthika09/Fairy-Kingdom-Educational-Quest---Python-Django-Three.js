import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, ArrowRight, CheckCircle2 } from 'lucide-react';
import { ASSET_IMAGES } from '../../assets/images/assetsMap';
import { soundFx } from '../../utils/audio';

interface Phase4Props {
  onWin: () => void;
  onBackToMap: () => void;
}

interface BridgeAnimal {
  id: string;
  name: string;
  icon: string;
  footprint: 'Hoof' | 'Paw' | 'Webbed';
  footprintIcon: string;
}

export const Phase4FootprintBridge: React.FC<Phase4Props> = ({ onWin, onBackToMap }) => {
  const bridgeAnimals: BridgeAnimal[] = [
    { id: 'duck', name: 'Duck 🦆', icon: '🦆', footprint: 'Webbed', footprintIcon: '🐾' },
    { id: 'wolf', name: 'Wolf 🐺', icon: '🐺', footprint: 'Paw', footprintIcon: '🐾' },
    { id: 'deer', name: 'Deer 🦌', icon: '🦌', footprint: 'Hoof', footprintIcon: '🦶' },
    { id: 'horse', name: 'Horse 🐴', icon: '🐴', footprint: 'Hoof', footprintIcon: '🦶' },
  ];

  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  const activeAnimal = bridgeAnimals[currentStep];

  const handleFootprintSelect = (selectedType: 'Hoof' | 'Paw' | 'Webbed') => {
    if (selectedType === activeAnimal.footprint) {
      soundFx.playSplash();
      soundFx.playSuccess();
      setFeedback(`Correct! ${activeAnimal.name} leaves a ${activeAnimal.footprint} track on the bridge!`);
      setCompletedSteps((prev) => [...prev, currentStep]);

      if (currentStep + 1 < bridgeAnimals.length) {
        setTimeout(() => {
          setCurrentStep((prev) => prev + 1);
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
      setFeedback('Not that track! Try another footprint shape!');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-br from-cyan-100 via-sky-100 to-blue-200 select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="relative z-20 w-full max-w-4xl flex justify-between items-center bg-white/90 backdrop-blur-md p-4 rounded-2xl border-3 border-sky-300 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.explorer_fox}
            alt="Explorer Fox"
            className="w-14 h-14 rounded-full border-2 border-sky-400 object-cover shadow"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="font-bold text-sky-950 text-base sm:text-lg">
              Phase 4: Footprint River Bridge 🦊
            </h2>
            <p className="text-xs sm:text-sm text-sky-700">
              Match animal footprints to lay magical stepping stones across the Magic River!
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

      {/* Visual River with Stepping Stones */}
      <div className="relative z-20 w-full max-w-4xl h-48 sm:h-56 my-4 bg-gradient-to-r from-cyan-400 via-blue-500 to-cyan-400 rounded-3xl border-4 border-cyan-300 shadow-xl overflow-hidden flex items-center justify-around px-8">
        <div className="absolute inset-0 bg-blue-400/20 animate-pulse pointer-events-none" />

        {bridgeAnimals.map((animal, idx) => {
          const isDone = completedSteps.includes(idx);
          const isCurrent = currentStep === idx && !isCompleted;

          return (
            <div key={animal.id} className="relative flex flex-col items-center z-10">
              <motion.div
                animate={isCurrent ? { y: [-5, 5, -5] } : {}}
                transition={{ repeat: Infinity, duration: 1 }}
                className={`w-16 h-16 sm:w-20 sm:h-20 rounded-full border-4 flex items-center justify-center text-3xl shadow-lg transition-all ${
                  isDone
                    ? 'bg-emerald-300 border-emerald-500 scale-105'
                    : isCurrent
                    ? 'bg-amber-300 border-amber-500 scale-110 shadow-amber-300/50'
                    : 'bg-white/40 border-white/60 opacity-60'
                }`}
              >
                {isDone ? '🪨' : animal.icon}
              </motion.div>

              <span className="mt-2 text-xs font-bold text-white drop-shadow bg-blue-900/60 px-3 py-0.5 rounded-full">
                Step {idx + 1}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Question & Footprint Options */}
      {!isCompleted ? (
        <div className="relative z-20 w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-3xl p-6 border-3 border-sky-300 shadow-lg flex flex-col items-center gap-4 text-center">
          <h3 className="font-bold text-sky-950 text-base sm:text-lg">
            Which footprint matches <span className="text-pink-600 font-black">{activeAnimal.name}</span>?
          </h3>

          {feedback && (
            <p className="text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-200">
              {feedback}
            </p>
          )}

          <div className="grid grid-cols-3 gap-4 w-full mt-2">
            <button
              onClick={() => handleFootprintSelect('Hoof')}
              className="p-4 bg-amber-50 hover:bg-amber-100 border-3 border-amber-300 rounded-2xl flex flex-col items-center gap-2 cursor-pointer shadow hover:scale-105 transition-all"
            >
              <span className="text-3xl">🦶</span>
              <span className="font-bold text-amber-900 text-sm">Hoof (Hard Print)</span>
            </button>

            <button
              onClick={() => handleFootprintSelect('Paw')}
              className="p-4 bg-orange-50 hover:bg-orange-100 border-3 border-orange-300 rounded-2xl flex flex-col items-center gap-2 cursor-pointer shadow hover:scale-105 transition-all"
            >
              <span className="text-3xl">🐾</span>
              <span className="font-bold text-orange-900 text-sm">Soft Paw Pads</span>
            </button>

            <button
              onClick={() => handleFootprintSelect('Webbed')}
              className="p-4 bg-cyan-50 hover:bg-cyan-100 border-3 border-cyan-300 rounded-2xl flex flex-col items-center gap-2 cursor-pointer shadow hover:scale-105 transition-all"
            >
              <span className="text-3xl">🪿</span>
              <span className="font-bold text-cyan-900 text-sm">Webbed Swimming Feet</span>
            </button>
          </div>
        </div>
      ) : (
        /* Victory Modal */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-30 bg-white/95 backdrop-blur-md rounded-3xl p-8 border-4 border-amber-400 shadow-2xl text-center max-w-md flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-cyan-100 flex items-center justify-center text-4xl border-2 border-cyan-300">
            🧩
          </div>
          <h3 className="font-black text-sky-950 text-2xl">
            Map Piece 4 Collected!
          </h3>
          <p className="text-sky-800 text-sm font-medium">
            Explorer Fox: "Brilliant crossing! You crossed the Magic River safely! Take Map Piece 4!"
          </p>
          <button
            id="btn-claim-piece-4"
            onClick={onWin}
            className="w-full py-3.5 bg-gradient-to-r from-sky-400 to-indigo-600 hover:from-sky-300 hover:to-indigo-500 text-white font-bold text-lg rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Collect Piece & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
