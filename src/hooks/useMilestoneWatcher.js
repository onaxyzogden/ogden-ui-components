import { useEffect, useRef } from 'react';

/**
 * Watches a segments array and fires onReach100(segment) when any segment
 * transitions from <100 to >=100. Initial mount does not fire retroactively
 * for already-complete segments (prevents toast-spam on page load).
 */
export default function useMilestoneWatcher(segments, onReach100) {
  const prevRef = useRef(null);

  useEffect(() => {
    const prev = prevRef.current;
    if (prev) {
      for (const seg of segments) {
        const last = prev[seg.id];
        if (typeof last === 'number' && last < 100 && seg.current >= 100) {
          onReach100?.(seg);
        }
      }
    }
    const next = {};
    for (const seg of segments) next[seg.id] = seg.current;
    prevRef.current = next;
  }, [segments, onReach100]);
}
