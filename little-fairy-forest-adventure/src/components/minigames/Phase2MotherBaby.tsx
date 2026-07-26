import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Heart, CheckCircle2, ArrowRight } from 'lucide-react';
import { ANIMALS_DATA } from '../../data/gameData';
import { ASSET_IMAGES } from '../../assets/images/assetsMap';
import { soundFx } from '../../utils/audio';

interface Phase2Props {
  onWin: () => void;
  onBackToMap: () => void;
}

interface BabyItem {
  id: string;
  babyName: string;
  motherId: string;
  icon: string;
}

export const Phase2MotherBaby: React.FC<Phase2Props> = ({ onWin, onBackToMap }) => {
  const mothers = ANIMALS_DATA.filter((a) => ['cow', 'horse', 'duck', 'lion', 'deer'].includes(a.id));

  const [selectedMotherId, setSelectedMotherId] = useState<string | null>(null);
  const [matchedPairs, setMatchedPairs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);

  // Shuffle babies
  const babies: BabyItem[] = [
    { id: 'b1', babyName: 'Calf 🐮', motherId: 'cow', icon: '🐮' },
    { id: 'b2', babyName: 'Foal 🐴', motherId: 'horse', icon: '🐴' },
    { id: 'b3', babyName: 'Duckling 🐥', motherId: 'duck', icon: '🐥' },
    { id: 'b4', babyName: 'Cub 🦁', motherId: 'lion', icon: '🦁' },
    { id: 'b5', babyName: 'Fawn 🦌', motherId: 'deer', icon: '🦌' },
  ];

  const handleMotherClick = (id: string) => {
    soundFx.playButtonClick();
    setSelectedMotherId(id);
    setFeedback('Now tap the crying baby that belongs to this mother!');
  };

  const handleBabyClick = (baby: BabyItem) => {
    if (!selectedMotherId) {
      soundFx.playWrong();
      setFeedback('Tap a mother animal first!');
      return;
    }

    if (selectedMotherId === baby.motherId) {
      soundFx.playSuccess();
      const mother = mothers.find((m) => m.id === baby.motherId);
      setMatchedPairs((prev) => [...prev, baby.motherId]);
      setSelectedMotherId(null);
      setFeedback(`Yay! The ${mother?.motherName} is happily reunited with her ${baby.babyName}!`);

      if (matchedPairs.length + 1 === mothers.length) {
        setTimeout(() => {
          setIsCompleted(true);
          soundFx.playMagicChime();
        }, 800);
      }
    } else {
      soundFx.playWrong();
      setFeedback('Not quite! Look closely at mother and baby!');
    }
  };

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-br from-pink-100 via-rose-100 to-amber-100 select-none overflow-y-auto">
      {/* Top Banner */}
      <div className="relative z-20 w-full max-w-4xl flex justify-between items-center bg-white/90 backdrop-blur-md p-4 rounded-2xl border-3 border-pink-300 shadow-md">
        <div className="flex items-center gap-3">
          <img
            src={ASSET_IMAGES.wise_owl}
            alt="Meadow Guide"
            className="w-14 h-14 rounded-full border-2 border-pink-400 object-cover shadow"
            referrerPolicy="no-referrer"
          />
          <div>
            <h2 className="font-bold text-pink-950 text-base sm:text-lg">
              Phase 2: Baby Animal Meadow 🦌
            </h2>
            <p className="text-xs sm:text-sm text-pink-700">
              Reunite crying baby animals with their loving mothers!
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

      {/* Feedback Banner */}
      {feedback && (
        <div className="relative z-20 bg-white px-6 py-2 rounded-full border-2 border-pink-300 text-pink-900 font-bold text-sm my-2 shadow">
          {feedback}
        </div>
      )}

      {/* Matching Grid Area */}
      {!isCompleted ? (
        <div className="relative z-20 w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6 my-4">
          {/* Mothers List */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-3 border-rose-300 shadow-lg">
            <h3 className="font-bold text-rose-900 text-center mb-4 flex items-center justify-center gap-2">
              <Heart className="w-5 h-5 text-rose-500 fill-rose-300" />
              <span>Mother Animals</span>
            </h3>

            <div className="flex flex-col gap-3">
              {mothers.map((m) => {
                const isMatched = matchedPairs.includes(m.id);
                const isSelected = selectedMotherId === m.id;

                return (
                  <button
                    key={m.id}
                    disabled={isMatched}
                    onClick={() => handleMotherClick(m.id)}
                    className={`p-3 rounded-2xl border-3 flex items-center justify-between transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 opacity-80'
                        : isSelected
                        ? 'bg-pink-200 border-pink-500 scale-102 shadow-md'
                        : 'bg-rose-50 border-rose-200 hover:bg-rose-100 text-rose-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{m.iconSvg}</span>
                      <span className="font-bold text-base">{m.motherName}</span>
                    </div>
                    {isMatched ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <span className="text-xs bg-white px-3 py-1 rounded-full font-bold text-pink-700 shadow-sm">
                        Select
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Babies List */}
          <div className="bg-white/90 backdrop-blur-md rounded-3xl p-5 border-3 border-pink-300 shadow-lg">
            <h3 className="font-bold text-pink-900 text-center mb-4 flex items-center justify-center gap-2">
              <span>👶 Crying Babies</span>
            </h3>

            <div className="flex flex-col gap-3">
              {babies.map((b) => {
                const isMatched = matchedPairs.includes(b.motherId);

                return (
                  <button
                    key={b.id}
                    disabled={isMatched}
                    onClick={() => handleBabyClick(b)}
                    className={`p-3 rounded-2xl border-3 flex items-center justify-between transition-all cursor-pointer ${
                      isMatched
                        ? 'bg-emerald-100 border-emerald-300 text-emerald-800 opacity-80'
                        : 'bg-pink-50 border-pink-200 hover:bg-pink-100 text-pink-950'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{b.icon}</span>
                      <span className="font-bold text-base">{b.babyName}</span>
                    </div>
                    {isMatched ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                    ) : (
                      <span className="text-xs bg-white px-3 py-1 rounded-full font-bold text-rose-700 shadow-sm">
                        Match Baby
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        /* Victory Screen */
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="relative z-30 bg-white/95 backdrop-blur-md rounded-3xl p-8 border-4 border-amber-400 shadow-2xl text-center max-w-md flex flex-col items-center gap-4"
        >
          <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-4xl border-2 border-amber-300">
            🧩
          </div>
          <h3 className="font-black text-pink-950 text-2xl">
            Map Piece 2 Collected!
          </h3>
          <p className="text-pink-800 text-sm font-medium">
            Mother Deer: "Thank you for your kindness, Princess! All babies are warm and safe!"
          </p>
          <button
            id="btn-claim-piece-2"
            onClick={onWin}
            className="w-full py-3.5 bg-gradient-to-r from-amber-400 to-rose-500 hover:from-amber-300 hover:to-rose-400 text-white font-bold text-lg rounded-2xl shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Collect Piece & Continue</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </motion.div>
      )}
    </div>
  );
};
