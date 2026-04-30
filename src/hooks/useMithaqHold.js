// useMithaqHold — press-and-hold state machine for the Qalb hub ritual.
//
// Phases:
//   idle      → mouse/touch/key down          → holding
//   holding   → progress 0→1 over HOLD_MS     → activated (fires onActivate, resets to idle)
//   holding   → release before HOLD_MS        → draining (progress → 0, ease-in)
//   draining  → progress hits 0               → idle
//   holding   → re-press while draining       → holding (resumes from current progress)
//
// Returns { progress, isHolding, bind } where bind is a spread-onto-element
// object with the six pointer/keyboard handlers.
import { useCallback, useEffect, useRef, useState } from 'react';

const HOLD_MS = 1500;
const DRAIN_MS = 280;

const easeIn = (t) => t * t;

export default function useMithaqHold({ onActivate, disabled = false } = {}) {
  const [progress, setProgress] = useState(0);
  const [isHolding, setIsHolding] = useState(false);

  const rafRef = useRef(null);
  const holdStartRef = useRef(null);
  const baseProgressRef = useRef(0);
  const progressRef = useRef(0);
  const drainingRef = useRef(false);
  const drainStartRef = useRef(null);
  const drainFromRef = useRef(0);
  const onActivateRef = useRef(onActivate);
  const disabledRef = useRef(disabled);

  useEffect(() => { onActivateRef.current = onActivate; }, [onActivate]);
  useEffect(() => { disabledRef.current = disabled; }, [disabled]);

  const cancelRaf = () => {
    if (rafRef.current != null) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }
  };

  const setProgressBoth = (v) => {
    progressRef.current = v;
    setProgress(v);
  };

  const tickHoldRef = useRef(null);
  const tickDrainRef = useRef(null);

  useEffect(() => {
    const tickHold = (now) => {
      if (holdStartRef.current == null) return;
      const elapsed = now - holdStartRef.current;
      const base = baseProgressRef.current;
      const remaining = HOLD_MS * (1 - base);
      const t = Math.min(elapsed / Math.max(remaining, 1), 1);
      const next = base + (1 - base) * t;
      setProgressBoth(next);
      if (next >= 1) {
        setIsHolding(false);
        holdStartRef.current = null;
        cancelRaf();
        if (typeof onActivateRef.current === 'function') onActivateRef.current();
        setProgressBoth(0);
        return;
      }
      rafRef.current = requestAnimationFrame(tickHold);
    };
    const tickDrain = (now) => {
      if (drainStartRef.current == null) return;
      const t = Math.min((now - drainStartRef.current) / DRAIN_MS, 1);
      const next = drainFromRef.current * (1 - easeIn(t));
      setProgressBoth(next);
      if (t >= 1) {
        setProgressBoth(0);
        drainingRef.current = false;
        drainStartRef.current = null;
        cancelRaf();
        return;
      }
      rafRef.current = requestAnimationFrame(tickDrain);
    };
    tickHoldRef.current = tickHold;
    tickDrainRef.current = tickDrain;
  }, []);

  const start = useCallback(() => {
    if (disabledRef.current) return;
    cancelRaf();
    drainingRef.current = false;
    drainStartRef.current = null;
    baseProgressRef.current = progressRef.current;
    holdStartRef.current = performance.now();
    setIsHolding(true);
    rafRef.current = requestAnimationFrame(tickHoldRef.current);
  }, []);

  const stop = useCallback(() => {
    if (holdStartRef.current == null && !drainingRef.current) return;
    cancelRaf();
    holdStartRef.current = null;
    setIsHolding(false);
    if (progressRef.current <= 0) return;
    drainingRef.current = true;
    drainFromRef.current = progressRef.current;
    drainStartRef.current = performance.now();
    rafRef.current = requestAnimationFrame(tickDrainRef.current);
  }, []);

  useEffect(() => () => cancelRaf(), []);

  const bind = {
    onMouseDown: (e) => { e.preventDefault?.(); start(); },
    onMouseUp: stop,
    onMouseLeave: stop,
    onTouchStart: (e) => { e.preventDefault?.(); start(); },
    onTouchEnd: stop,
    onTouchCancel: stop,
    onKeyDown: (e) => {
      if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); start(); }
      else if (e.key === 'Escape') { stop(); }
    },
    onKeyUp: (e) => {
      if (e.key === ' ' || e.key === 'Enter') stop();
    },
    onBlur: stop,
  };

  return { progress, isHolding, bind };
}
