export type GameScreen =
  | 'start'
  | 'name'
  | 'intro'
  | 'map'
  | 'phase1'
  | 'phase2'
  | 'phase3'
  | 'phase4'
  | 'phase5'
  | 'quiz'
  | 'ending';

export type FairyAvatar = 'golden' | 'green' | 'rose';

export interface GameState {
  screen: GameScreen;
  playerName: string;
  playerAvatar: FairyAvatar;
  collectedMapPieces: number[]; // 1, 2, 3, 4, 5
  unlockedPhases: number[]; // [1] initially, unlocks up to 6 for quiz
  quizScore: number;
  musicEnabled: boolean;
  sfxEnabled: boolean;
  volume: number; // 0.0 to 1.0
  activeDialogueGroup: string | null;
  dialogueStep: number;
}

export interface CharacterProfile {
  id: string;
  name: string;
  title: string;
  avatarKey: string;
  color: string;
  description: string;
}

export interface DialogueLine {
  speakerKey: string; // 'player' | 'lion_king' | 'wise_owl' | 'fairy_rose' | 'explorer_fox' | 'guardian_turtle'
  speakerName: string;
  text: string;
  emotion?: 'happy' | 'thinking' | 'surprised' | 'encouraging' | 'celebrating';
}

export interface AnimalData {
  id: string;
  name: string;
  diet: 'Herbivore' | 'Carnivore';
  motherName: string;
  babyName: string;
  habitat: 'Forest' | 'Ocean' | 'Desert' | 'Farm' | 'Arctic';
  footprintType: string;
  iconSvg: string;
  color: string;
  fact: string;
}

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  icon: string;
}

export interface MapLocation {
  id: number; // 1 to 6
  name: string;
  phaseTitle: string;
  guideName: string;
  icon: string;
  x: number; // Percentage for map placement
  y: number;
  description: string;
}
