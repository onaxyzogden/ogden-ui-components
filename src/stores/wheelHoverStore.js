// Tiny Zustand slice for cross-component hover sync between the
// Maqasid Comparison Wheel and the LevelNavigator segment columns.
// Writing `null` clears any stale highlight (e.g., on unmount / route change).
import { create } from 'zustand';

export const useWheelHoverStore = create((set) => ({
  hoveredPillar: null,
  setHoveredPillar: (id) => set({ hoveredPillar: id }),
}));
