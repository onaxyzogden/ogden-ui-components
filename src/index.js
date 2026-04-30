// Top-level barrel export for @ogden/ui-components.
//
// Consumers should import the CSS bundle once at app entry:
//   import '@ogden/ui-components/style.css';
//
// Then named imports work as expected:
//   import { LevelNavigator, MaqasidComparisonWheel } from '@ogden/ui-components';

export { LevelNavigator, IslamicTerm } from './components/LevelNavigator';
export {
  MaqasidComparisonWheel,
  WheelWisdomTooltip,
  MaqasidNextActionCard,
  deriveWheelPalette,
} from './components/MaqasidComparisonWheel';

export { useWheelHoverStore } from './stores/wheelHoverStore';
export { useMithaqStore } from './stores/mithaqStore';

export { default as useMilestoneWatcher } from './hooks/useMilestoneWatcher';
export { default as useMithaqHold } from './hooks/useMithaqHold';

export { stripDiacritics, formatArabic } from './utils/arabic';
