import React from 'react';
import { Volume2, VolumeX, RotateCcw, X, Check, Save } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  musicEnabled: boolean;
  onToggleMusic: () => void;
  sfxEnabled: boolean;
  onToggleSfx: () => void;
  volume: number;
  onChangeVolume: (vol: number) => void;
  onResetProgress: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  musicEnabled,
  onToggleMusic,
  sfxEnabled,
  onToggleSfx,
  volume,
  onChangeVolume,
  onResetProgress,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-cyan-950/30 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-white/60 backdrop-blur-2xl rounded-[2.5rem] p-6 sm:p-8 border-2 border-white/80 shadow-2xl flex flex-col gap-5 text-cyan-950">
        <div className="flex justify-between items-center border-b border-white/50 pb-3">
          <h3 className="font-black text-xl flex items-center gap-2 text-cyan-950">
            <span>⚙️ Game Settings</span>
          </h3>
          <button
            onClick={() => {
              soundFx.playButtonClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/40 hover:bg-white/70 text-cyan-900 cursor-pointer border border-white/60 transition-all"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Music & Sound Controls */}
        <div className="flex flex-col gap-3.5">
          <div className="flex justify-between items-center bg-white/40 backdrop-blur-md p-3.5 rounded-[1.25rem] border border-white/60">
            <span className="font-bold text-sm text-cyan-900">Forest Background Music</span>
            <button
              onClick={() => {
                soundFx.playButtonClick();
                onToggleMusic();
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 cursor-pointer transition-all border ${
                musicEnabled ? 'bg-pink-400 text-white border-pink-300 shadow-sm' : 'bg-white/50 text-cyan-800 border-white'
              }`}
            >
              {musicEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
              <span>{musicEnabled ? 'Enabled' : 'Muted'}</span>
            </button>
          </div>

          <div className="flex justify-between items-center bg-white/40 backdrop-blur-md p-3.5 rounded-[1.25rem] border border-white/60">
            <span className="font-bold text-sm text-cyan-900">Sound Effects (SFX)</span>
            <button
              onClick={() => {
                soundFx.playButtonClick();
                onToggleSfx();
              }}
              className={`px-4 py-2 rounded-full font-bold text-xs flex items-center gap-2 cursor-pointer transition-all border ${
                sfxEnabled ? 'bg-pink-400 text-white border-pink-300 shadow-sm' : 'bg-white/50 text-cyan-800 border-white'
              }`}
            >
              {sfxEnabled ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
              <span>{sfxEnabled ? 'Enabled' : 'Disabled'}</span>
            </button>
          </div>

          {/* Volume Slider */}
          <div className="flex flex-col gap-1.5 bg-white/40 backdrop-blur-md p-3.5 rounded-[1.25rem] border border-white/60">
            <div className="flex justify-between text-xs font-bold text-cyan-900">
              <span>Master Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => {
                const val = parseFloat(e.target.value);
                onChangeVolume(val);
                soundFx.setVolume(val);
              }}
              className="w-full accent-pink-500 cursor-pointer"
            />
          </div>
        </div>

        {/* Save Status */}
        <div className="bg-white/50 backdrop-blur-md p-3 rounded-xl border border-white/70 text-xs text-cyan-900 flex items-center gap-2 font-medium">
          <Save className="w-4 h-4 text-pink-500 shrink-0" />
          <span>Progress auto-saves to LocalStorage & Django Sessions!</span>
        </div>

        {/* Danger Zone / Reset */}
        <div className="pt-2 border-t border-white/50 flex flex-col gap-3">
          <button
            onClick={() => {
              if (window.confirm('Are you sure you want to reset your fairy adventure progress?')) {
                soundFx.playButtonClick();
                onResetProgress();
                onClose();
              }
            }}
            className="w-full py-2.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-800 font-bold text-xs rounded-full border border-rose-300/50 flex items-center justify-center gap-2 cursor-pointer transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Reset Adventure Progress</span>
          </button>

          <button
            onClick={() => {
              soundFx.playButtonClick();
              onClose();
            }}
            className="w-full py-3 bg-white/80 hover:bg-white text-cyan-950 font-bold text-sm rounded-full border border-white cursor-pointer shadow transition-all"
          >
            Close Settings
          </button>
        </div>
      </div>
    </div>
  );
};
