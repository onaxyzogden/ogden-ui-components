// Mithaq (covenant) activation store.
// Tracks daily "renewal of the covenant" per Maqasid domain (faith / health / ...).
// Activation persists via localStorage and expires at the next 5am local (Fajr proxy).
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

function isStillValid(activatedAt) {
  if (!activatedAt) return false;
  const activated = new Date(activatedAt);
  if (Number.isNaN(activated.getTime())) return false;
  const expiry = new Date(activated);
  expiry.setHours(5, 0, 0, 0);
  if (activated.getHours() >= 5) {
    expiry.setDate(expiry.getDate() + 1);
  }
  return new Date() < expiry;
}

export const useMithaqStore = create(
  persist(
    (set, get) => ({
      activations: {},
      activate: (domain) =>
        set((s) => ({
          activations: {
            ...s.activations,
            [domain]: { activatedAt: new Date().toISOString() },
          },
        })),
      reset: (domain) =>
        set((s) => {
          const next = { ...s.activations };
          delete next[domain];
          return { activations: next };
        }),
      isActivated: (domain) => {
        const entry = get().activations[domain];
        return isStillValid(entry?.activatedAt);
      },
    }),
    { name: 'ogden-mithaq' }
  )
);
