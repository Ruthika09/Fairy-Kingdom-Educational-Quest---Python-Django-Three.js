import React, { useState, useEffect } from 'react';
import { GameState, GameScreen, FairyAvatar } from './types';
import { ThreeCanvas } from './components/ThreeCanvas';
import { StartScreen } from './components/StartScreen';
import { NameSelection } from './components/NameSelection';
import { StoryDialogue } from './components/StoryDialogue';
import { WorldMap } from './components/WorldMap';
import { Phase1HerbivoreCarnivore } from './components/minigames/Phase1HerbivoreCarnivore';
import { Phase2MotherBaby } from './components/minigames/Phase2MotherBaby';
import { Phase3ShadowMatch } from './components/minigames/Phase3ShadowMatch';
import { Phase4FootprintBridge } from './components/minigames/Phase4FootprintBridge';
import { Phase5HabitatMatch } from './components/minigames/Phase5HabitatMatch';
import { FinalQuiz } from './components/minigames/FinalQuiz';
import { EndingCelebration } from './components/EndingCelebration';
import { SettingsModal } from './components/SettingsModal';
import { INTRO_DIALOGUE } from './data/gameData';
import { soundFx } from './utils/audio';

const STORAGE_KEY = 'fairy_forest_adventure_save_v1';

export default function App() {
  const [gameState, setGameState] = useState<GameState>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved game', e);
      }
    }
    return {
      screen: 'start',
      playerName: 'Emily',
      playerAvatar: 'golden',
      collectedMapPieces: [],
      unlockedPhases: [1],
      quizScore: 0,
      musicEnabled: true,
      sfxEnabled: true,
      volume: 0.8,
      activeDialogueGroup: null,
      dialogueStep: 0,
    };
  });

  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  // Save progress whenever key state updates
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(gameState));

    // Optional API sync with Django session backend
    fetch('/api/save-game/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(gameState),
    }).catch(() => {
      // Offline fallback is active via localStorage
    });
  }, [gameState]);

  // Handle screen changes
  const setScreen = (screen: GameScreen) => {
    setGameState((prev) => ({ ...prev, screen }));
  };

  // Toggle Background Music
  const handleToggleMusic = () => {
    const next = !gameState.musicEnabled;
    setGameState((prev) => ({ ...prev, musicEnabled: next }));
    soundFx.toggleMusic(next);
  };

  // Start new game
  const handleStartNewGame = () => {
    setScreen('name');
  };

  // Continue saved game
  const handleContinueGame = () => {
    setScreen('map');
  };

  // Handle Name Submit
  const handleNameSubmitted = (name: string, avatar: FairyAvatar) => {
    setGameState((prev) => ({
      ...prev,
      playerName: name,
      playerAvatar: avatar,
      screen: 'intro',
    }));
  };

  // Handle Dialogue Complete
  const handleIntroComplete = () => {
    setScreen('map');
  };

  // Select Location on World Map
  const handleSelectMapLocation = (locationId: number) => {
    switch (locationId) {
      case 1:
        setScreen('phase1');
        break;
      case 2:
        setScreen('phase2');
        break;
      case 3:
        setScreen('phase3');
        break;
      case 4:
        setScreen('phase4');
        break;
      case 5:
        setScreen('phase5');
        break;
      case 6:
        setScreen('quiz');
        break;
      default:
        setScreen('map');
    }
  };

  // Phase completions (Collect map pieces)
  const handlePhaseWin = (phaseNum: number) => {
    setGameState((prev) => {
      const pieces = Array.from(new Set([...prev.collectedMapPieces, phaseNum]));
      const unlocked = Array.from(new Set([...prev.unlockedPhases, phaseNum + 1]));
      return {
        ...prev,
        collectedMapPieces: pieces,
        unlockedPhases: unlocked,
        screen: 'map',
      };
    });
  };

  // Quiz complete
  const handleQuizComplete = (score: number) => {
    setGameState((prev) => ({
      ...prev,
      quizScore: score,
      screen: 'ending',
    }));
  };

  // Reset Progress
  const handleResetProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
    setGameState({
      screen: 'start',
      playerName: 'Emily',
      playerAvatar: 'golden',
      collectedMapPieces: [],
      unlockedPhases: [1],
      quizScore: 0,
      musicEnabled: true,
      sfxEnabled: true,
      volume: 0.8,
      activeDialogueGroup: null,
      dialogueStep: 0,
    });
  };

  return (
    <main className="relative w-screen h-screen bg-[#E0F2FE] font-sans overflow-hidden select-none" style={{ background: 'radial-gradient(circle at center, #E0F7FA 0%, #B2EBF2 50%, #81D4FA 100%)' }}>
      {/* Frosted Glass Floating Ambient Color Orbs */}
      <div className="absolute top-[-50px] right-[-50px] w-80 h-80 bg-pink-300/40 rounded-full blur-3xl pointer-events-none z-0"></div>
      <div className="absolute bottom-[-100px] left-[-100px] w-[550px] h-[550px] bg-emerald-300/35 rounded-full blur-[100px] pointer-events-none z-0"></div>
      <div className="absolute top-[35%] left-[25%] w-[380px] h-[380px] bg-cyan-200/40 rounded-full blur-[90px] pointer-events-none z-0"></div>

      {/* Glass Dot Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-15" style={{ backgroundImage: 'radial-gradient(white 1.5px, transparent 1.5px)', backgroundSize: '40px 40px' }} />

      {/* Three.js Particle Fairy Dust Layer */}
      <ThreeCanvas intensity={gameState.screen === 'ending' ? 'celebration' : 'magical'} />

      {/* Main Screen Router */}
      <div className="relative z-20 w-full h-full">
        {gameState.screen === 'start' && (
          <StartScreen
            onStart={handleStartNewGame}
            onContinue={handleContinueGame}
            onOpenSettings={() => setIsSettingsOpen(true)}
            hasSavedGame={gameState.unlockedPhases.length > 1 || gameState.collectedMapPieces.length > 0}
            musicEnabled={gameState.musicEnabled}
            onToggleMusic={handleToggleMusic}
          />
        )}

        {gameState.screen === 'name' && (
          <NameSelection
            initialName={gameState.playerName}
            initialAvatar={gameState.playerAvatar}
            onSubmit={handleNameSubmitted}
          />
        )}

        {gameState.screen === 'intro' && (
          <StoryDialogue
            dialogues={INTRO_DIALOGUE}
            playerName={gameState.playerName}
            onComplete={handleIntroComplete}
          />
        )}

        {gameState.screen === 'map' && (
          <WorldMap
            gameState={gameState}
            onSelectLocation={handleSelectMapLocation}
          />
        )}

        {gameState.screen === 'phase1' && (
          <Phase1HerbivoreCarnivore
            onWin={() => handlePhaseWin(1)}
            onBackToMap={() => setScreen('map')}
          />
        )}

        {gameState.screen === 'phase2' && (
          <Phase2MotherBaby
            onWin={() => handlePhaseWin(2)}
            onBackToMap={() => setScreen('map')}
          />
        )}

        {gameState.screen === 'phase3' && (
          <Phase3ShadowMatch
            onWin={() => handlePhaseWin(3)}
            onBackToMap={() => setScreen('map')}
          />
        )}

        {gameState.screen === 'phase4' && (
          <Phase4FootprintBridge
            onWin={() => handlePhaseWin(4)}
            onBackToMap={() => setScreen('map')}
          />
        )}

        {gameState.screen === 'phase5' && (
          <Phase5HabitatMatch
            onWin={() => handlePhaseWin(5)}
            onBackToMap={() => setScreen('map')}
          />
        )}

        {gameState.screen === 'quiz' && (
          <FinalQuiz
            playerName={gameState.playerName}
            onCompleteQuiz={handleQuizComplete}
            onBackToMap={() => setScreen('map')}
          />
        )}

        {gameState.screen === 'ending' && (
          <EndingCelebration
            playerName={gameState.playerName}
            quizScore={gameState.quizScore}
            onRestart={() => setScreen('start')}
          />
        )}
      </div>

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        musicEnabled={gameState.musicEnabled}
        onToggleMusic={handleToggleMusic}
        sfxEnabled={gameState.sfxEnabled}
        onToggleSfx={() => setGameState((p) => ({ ...p, sfxEnabled: !p.sfxEnabled }))}
        volume={gameState.volume}
        onChangeVolume={(vol) => setGameState((p) => ({ ...p, volume: vol }))}
        onResetProgress={handleResetProgress}
      />
    </main>
  );
}
