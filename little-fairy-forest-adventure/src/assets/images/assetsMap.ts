// Asset mappings for Little Fairy Forest Adventure

import magicalForestBg from './magical_forest_background_1785064809407.jpg';
import fairyForestLogo from './fairy_forest_logo_1785064825090.jpg';
import goldenFairyPortrait from './golden_fairy_portrait_1785064838572.jpg';
import wiseOwlGuide from './wise_owl_guide_1785064854393.jpg';
import fairyRoseCompanion from './fairy_rose_companion_1785064869463.jpg';
import explorerFoxGuide from './explorer_fox_guide_1785064885165.jpg';
import guardianTurtleProtector from './guardian_turtle_protector_1785064900479.jpg';
import lionKingPortrait from './lion_king_portrait_1785064936426.jpg';

export const ASSET_IMAGES = {
  logo: fairyForestLogo,
  background: magicalForestBg,
  golden_fairy: goldenFairyPortrait,
  green_fairy: goldenFairyPortrait, // fallback
  rose_fairy: fairyRoseCompanion,
  wise_owl: wiseOwlGuide,
  fairy_rose: fairyRoseCompanion,
  explorer_fox: explorerFoxGuide,
  guardian_turtle: guardianTurtleProtector,
  lion_king: lionKingPortrait,
};

export const CHARACTER_DESCRIPTIONS = {
  player: {
    name: 'Princess Fairy',
    title: 'The Brave Lost Princess',
    color: 'from-amber-300 to-amber-500',
    avatar: goldenFairyPortrait,
  },
  lion_king: {
    name: 'Lion King',
    title: 'Ruler of Rainbow Blossom Kingdom',
    color: 'from-yellow-400 to-orange-500',
    avatar: lionKingPortrait,
  },
  wise_owl: {
    name: 'Wise Owl',
    title: 'Master of Forest Animal Knowledge',
    color: 'from-indigo-400 to-purple-600',
    avatar: wiseOwlGuide,
  },
  fairy_rose: {
    name: 'Fairy Rose',
    title: 'Your Kind Forest Companion',
    color: 'from-pink-400 to-rose-500',
    avatar: fairyRoseCompanion,
  },
  explorer_fox: {
    name: 'Explorer Fox',
    title: 'Master River Navigator',
    color: 'from-amber-500 to-orange-600',
    avatar: explorerFoxGuide,
  },
  guardian_turtle: {
    name: 'Guardian Turtle',
    title: 'Protector of the Ancient Tree',
    color: 'from-emerald-400 to-teal-600',
    avatar: guardianTurtleProtector,
  },
};
