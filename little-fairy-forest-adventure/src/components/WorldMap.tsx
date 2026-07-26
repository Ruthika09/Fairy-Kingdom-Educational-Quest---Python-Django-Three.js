import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, MapPin, Lock, CheckCircle, Award } from 'lucide-react';
import { LOCATIONS } from '../data/gameData';
import { GameState } from '../types';
import { ASSET_IMAGES } from '../assets/images/assetsMap';
import { soundFx } from '../utils/audio';

interface WorldMapProps {
  gameState: GameState;
  onSelectLocation: (locationId: number) => void;
}

export const WorldMap: React.FC<WorldMapProps> = ({ gameState, onSelectLocation }) => {
  const { collectedMapPieces, unlockedPhases, playerName } = gameState;

  return (
    <div className="relative w-full h-full flex flex-col items-center justify-between p-4 sm:p-6 select-none overflow-hidden z-10">
      {/* Background Soft Forest Image */}
      <img
        src={ASSET_IMAGES.background}
        alt="Forest Background"
        className="absolute inset-0 w-full h-full object-cover object-center filter opacity-20 saturate-120 pointer-events-none"
        referrerPolicy="no-referrer"
      />

      {/* Top Header: Map Piece Collection & Status */}
      <div className="relative z-30 w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-3 bg-white/40 backdrop-blur-2xl px-6 py-3.5 rounded-[2rem] border border-white/60 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-full border-2 border-white overflow-hidden shadow-inner bg-gradient-to-br from-yellow-100 to-pink-100 shrink-0">
            <img
              src={ASSET_IMAGES.golden_fairy}
              alt="Princess"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h3 className="font-bold text-cyan-950 text-base sm:text-lg">
              Princess {playerName}
            </h3>
            <p className="text-xs text-cyan-800 font-medium">
              Collect 5 Map Pieces to reach Lion Castle!
            </p>
          </div>
        </div>

        {/* Map Pieces Tracker */}
        <div className="flex items-center gap-2 bg-white/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/60 shadow-2xs">
          <span className="font-bold text-xs sm:text-sm text-cyan-900 mr-1">Map Pieces:</span>
          {[1, 2, 3, 4, 5].map((pieceNum) => {
            const isCollected = collectedMapPieces.includes(pieceNum);
            return (
              <motion.div
                key={pieceNum}
                animate={isCollected ? { scale: [1, 1.2, 1] } : {}}
                className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center font-bold text-xs border-2 shadow-sm transition-all ${
                  isCollected
                    ? 'bg-amber-300 border-white text-cyan-950 shadow-amber-300/50'
                    : 'bg-white/40 border-white/60 text-cyan-800/40'
                }`}
              >
                {isCollected ? '🧩' : pieceNum}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Interactive Board Game Map Container */}
      <div className="relative z-20 w-full max-w-5xl h-[65vh] sm:h-[70vh] my-auto bg-white/25 backdrop-blur-xl rounded-[3rem] border-2 border-white/60 shadow-2xl overflow-hidden">
        {/* Curved Path Connecting Locations SVG */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
          <path
            d="M 18% 75% Q 28% 60%, 35% 52% T 52% 78% T 68% 45% T 82% 65% T 90% 25%"
            fill="none"
            stroke="#ffffff"
            strokeWidth="8"
            strokeDasharray="12 12"
            className="drop-shadow-md animate-pulse opacity-80"
          />
        </svg>

        {/* Map Location Nodes */}
        {LOCATIONS.map((loc) => {
          const isUnlocked = unlockedPhases.includes(loc.id);
          const isCompleted = collectedMapPieces.includes(loc.id) || (loc.id === 6 && gameState.quizScore >= 3);
          const isCurrentTarget = unlockedPhases[unlockedPhases.length - 1] === loc.id;

          return (
            <div
              key={loc.id}
              style={{ left: `${loc.x}%`, top: `${loc.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
            >
              <div className="relative flex flex-col items-center">
                {/* Active Player Marker */}
                {isCurrentTarget && (
                  <motion.div
                    animate={{ y: [-12, 0, -12] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
                    className="absolute -top-12 z-30 flex flex-col items-center"
                  >
                    <span className="bg-white/90 text-pink-600 text-xs font-black px-3 py-1 rounded-full shadow border border-white whitespace-nowrap">
                      You are here!
                    </span>
                    <div className="w-8 h-8 text-2xl">🧚‍♀️</div>
                  </motion.div>
                )}

                {/* Node Button */}
                <button
                  id={`map-node-${loc.id}`}
                  onClick={() => {
                    if (isUnlocked) {
                      soundFx.playMagicChime();
                      onSelectLocation(loc.id);
                    } else {
                      soundFx.playWrong();
                    }
                  }}
                  disabled={!isUnlocked}
                  className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-[2rem] border-2 flex items-center justify-center text-2xl sm:text-3xl shadow-xl transition-all duration-300 cursor-pointer ${
                    isUnlocked
                      ? isCompleted
                        ? 'bg-emerald-400/80 backdrop-blur-md border-emerald-200 text-white hover:scale-110 shadow-emerald-400/50'
                        : 'bg-white/70 hover:bg-white/90 backdrop-blur-xl border-white text-cyan-900 hover:scale-110 animate-bounce'
                      : 'bg-white/20 border-white/40 text-cyan-800/40 cursor-not-allowed opacity-60'
                  }`}
                >
                  <span>{loc.icon}</span>

                  {/* Completion checkmark badge */}
                  {isCompleted && (
                    <div className="absolute -bottom-1.5 -right-1.5 bg-emerald-500 text-white p-1 rounded-full border-2 border-white shadow">
                      <CheckCircle className="w-4 h-4" />
                    </div>
                  )}

                  {/* Lock icon for locked locations */}
                  {!isUnlocked && (
                    <div className="absolute inset-0 bg-cyan-950/20 rounded-[2rem] flex items-center justify-center text-white">
                      <Lock className="w-6 h-6 text-white/80" />
                    </div>
                  )}
                </button>

                {/* Node Label Card */}
                <div className="mt-2 bg-white/80 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/80 shadow text-center max-w-[130px]">
                  <p className="font-bold text-xs sm:text-sm text-cyan-950 leading-tight">
                    {loc.name}
                  </p>
                  <p className="text-[10px] text-pink-600 font-semibold truncate">
                    {loc.guideName}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer Instructions */}
      <div className="relative z-30 text-center text-cyan-900 font-bold text-xs sm:text-sm bg-white/40 backdrop-blur-md px-6 py-2 rounded-full border border-white/50 shadow-sm">
        ✨ Tap an unlocked location to play its magical educational challenge! ✨
      </div>
    </div>
  );
};
