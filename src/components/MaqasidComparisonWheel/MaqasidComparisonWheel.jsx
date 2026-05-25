// MaqasidComparisonWheel — interactive SVG wheel comparing N pillars under
// a shared "level color". Wisdom + next-action maps arrive as props so every
// consumer can plug in its own curated corpus (or stubs, or null).
import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useMilestoneWatcher from '../../hooks/useMilestoneWatcher';
import useMithaqHold from '../../hooks/useMithaqHold';
import { useWheelHoverStore } from '../../stores/wheelHoverStore';
import { useMithaqStore } from '../../stores/mithaqStore';
import { deriveWheelPalette } from './wheelColor';
import WheelWisdomTooltip from './WheelWisdomTooltip';
import MaqasidNextActionCard from './MaqasidNextActionCard';
import './MaqasidComparisonWheel.css';

const CX = 200;
const CY = 200;
const HUB_R = 56;
const LABEL_INNER_R = 142;
const PROGRESS_MAX_R = LABEL_INNER_R;
const LABEL_OUTER_R = 184;
const ICON_R = (LABEL_INNER_R + LABEL_OUTER_R) / 2;
const WISDOM_HOVER_DELAY = 1000;

function polar(r, angleDeg) {
  const a = (angleDeg * Math.PI) / 180;
  return [CX + r * Math.cos(a), CY + r * Math.sin(a)];
}

function annularSector(rInner, rOuter, startDeg, endDeg) {
  const [x1o, y1o] = polar(rOuter, startDeg);
  const [x2o, y2o] = polar(rOuter, endDeg);
  const [x1i, y1i] = polar(rInner, startDeg);
  const [x2i, y2i] = polar(rInner, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return [
    `M ${x1i} ${y1i}`,
    `L ${x1o} ${y1o}`,
    `A ${rOuter} ${rOuter} 0 ${largeArc} 1 ${x2o} ${y2o}`,
    `L ${x2i} ${y2i}`,
    `A ${rInner} ${rInner} 0 ${largeArc} 0 ${x1i} ${y1i}`,
    'Z',
  ].join(' ');
}

function outerArc(r, startDeg, endDeg) {
  const [x1, y1] = polar(r, startDeg);
  const [x2, y2] = polar(r, endDeg);
  const largeArc = endDeg - startDeg > 180 ? 1 : 0;
  return `M ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2}`;
}

export default function MaqasidComparisonWheel({
  centerLabel = 'FAITH',
  levelColor = '#4ab8a8',
  levelPattern = 'dots',
  level = 'core',
  segments = [],
  onReach100,
  mithaqDomain = null,
  pillarWisdom = null,
  nextActions = null,
  forceHover = null,
  forceConverged = false,
  centerLabelOverride = null,
  onSegmentSelect = null,
  onHoverChange = null,
  showNextCard = true,
  showDiacritics = true,
}) {
  const navigate = useNavigate();
  const handleActivate = (seg) => {
    if (onSegmentSelect) { onSegmentSelect(seg); return; }
    if (seg?.route) navigate(seg.route, { viewTransition: true });
  };
  const [hovered, setHovered] = useState(null);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });
  const [wisdomFor, setWisdomFor] = useState(null);
  const [isMounted, setIsMounted] = useState(false);
  const hoverTimerRef = useRef(null);
  const [lastAngle, setLastAngle] = useState(0);

  const setHoveredPillar = useWheelHoverStore((s) => s.setHoveredPillar);
  const externalHover = useWheelHoverStore((s) => s.hoveredPillar);
  useEffect(() => () => setHoveredPillar(null), [setHoveredPillar]);

  const mithaqActivations = useMithaqStore((s) => s.activations);
  const activateMithaq = useMithaqStore((s) => s.activate);
  const isLit = useMemo(() => {
    if (!mithaqDomain) return true;
    const entry = mithaqActivations[mithaqDomain];
    if (!entry?.activatedAt) return false;
    const activated = new Date(entry.activatedAt);
    if (Number.isNaN(activated.getTime())) return false;
    const expiry = new Date(activated);
    expiry.setHours(5, 0, 0, 0);
    if (activated.getHours() >= 5) expiry.setDate(expiry.getDate() + 1);
    return new Date() < expiry;
  }, [mithaqDomain, mithaqActivations]);
  const isDormant = mithaqDomain && !isLit;

  const [isIgniting, setIsIgniting] = useState(false);
  useEffect(() => {
    if (!isIgniting) return undefined;
    const duration = 80 + 5 * 50 + 520;
    const t = setTimeout(() => setIsIgniting(false), duration);
    return () => clearTimeout(t);
  }, [isIgniting]);

  const { progress: mithaqProgress, isHolding: mithaqHolding, bind: mithaqBind } = useMithaqHold({
    disabled: !mithaqDomain || isLit,
    onActivate: () => {
      if (!mithaqDomain) return;
      activateMithaq(mithaqDomain);
      setIsIgniting(true);
    },
  });

  useEffect(() => {
    const id = requestAnimationFrame(() => setIsMounted(true));
    return () => cancelAnimationFrame(id);
  }, []);

  useEffect(() => {
    if (!forceConverged) return undefined;
    const duration = 80 + 5 * 50 + 520;
    const raf = requestAnimationFrame(() => setIsIgniting(true));
    const t = setTimeout(() => setIsIgniting(false), duration);
    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(t);
    };
  }, [forceConverged]);

  useMilestoneWatcher(segments, onReach100);

  const palette = useMemo(() => deriveWheelPalette(levelColor), [levelColor]);

  const n = segments.length || 1;
  const arcSize = 360 / n;
  const startOffset = -90 - arcSize / 2;

  const effectiveHover = forceHover || hovered || externalHover;
  const hoveredIndex = effectiveHover ? segments.findIndex((s) => s.id === effectiveHover) : -1;
  const hoveredSeg = hoveredIndex >= 0 ? segments[hoveredIndex] : null;

  useEffect(() => {
    if (onHoverChange) onHoverChange(effectiveHover || null);
  }, [effectiveHover, onHoverChange]);

  const computedAngle =
    hoveredIndex >= 0
      ? startOffset + hoveredIndex * arcSize + arcSize / 2 + 90
      : null;
  const externalAngle = useMemo(() => {
    if (!externalHover) return null;
    const idx = segments.findIndex((s) => s.id === externalHover);
    if (idx < 0) return null;
    return startOffset + idx * arcSize + arcSize / 2 + 90;
  }, [externalHover, segments, startOffset, arcSize]);
  const needleAngle = computedAngle ?? externalAngle ?? lastAngle;

  const avgPct = segments.length
    ? Math.round(segments.reduce((sum, s) => sum + (s.current || 0), 0) / segments.length)
    : 0;

  const qalbBalance = useMemo(() => {
    if (segments.length < 2) return 1;
    const mean =
      segments.reduce((s, x) => s + (x.current || 0), 0) / segments.length;
    const variance =
      segments.reduce((s, x) => s + ((x.current || 0) - mean) ** 2, 0) /
      segments.length;
    const stdDev = Math.sqrt(variance);
    return Math.max(0, Math.min(1, 1 - stdDev / 40));
  }, [segments]);

  const nextCardText = hoveredSeg
    ? (hoveredSeg.tooltipText
        ? hoveredSeg.tooltipText
        : hoveredSeg.current >= 100
          ? 'Flourishing'
          : (nextActions?.[hoveredSeg.id]?.[level] || hoveredSeg.label))
    : null;
  const nextCardLabel = hoveredSeg?.tooltipLabel || 'Next';
  const nextCardWidth = hoveredSeg?.tooltipWidth;
  const nextCardHeight = hoveredSeg?.tooltipHeight;

  const cardPos = useMemo(() => {
    if (hoveredIndex < 0) return null;
    if (hoveredSeg?.tooltipText) {
      const w = hoveredSeg.tooltipWidth || 200;
      return { x: CX - w / 2, y: 440, flip: false };
    }
    const midDeg = startOffset + hoveredIndex * arcSize + arcSize / 2;
    const r = LABEL_OUTER_R + 14;
    const [px, py] = polar(r, midDeg);
    const normalized = ((midDeg % 360) + 360) % 360;
    const flip = normalized > 90 && normalized < 270;
    return { x: px, y: py, flip };
  }, [hoveredIndex, startOffset, arcSize, hoveredSeg]);

  const hubTopLabel = hoveredSeg
    ? hoveredSeg.label.toUpperCase()
    : (centerLabelOverride || centerLabel);
  const hubBottomLabel = hoveredSeg ? `${Math.round(hoveredSeg.current)}%` : `${avgPct}%`;
  const patternId = `mcw-pat-${levelPattern}`;

  const scheduleWisdom = (id) => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = setTimeout(() => {
      setWisdomFor(id);
    }, WISDOM_HOVER_DELAY);
  };
  const cancelWisdom = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
    hoverTimerRef.current = null;
    setWisdomFor(null);
  };

  useEffect(() => () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  }, []);

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setWisdomFor(null); };
    const onScroll = () => setWisdomFor(null);
    window.addEventListener('keydown', onKey);
    window.addEventListener('scroll', onScroll, true);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('scroll', onScroll, true);
    };
  }, []);

  const leaveTimerRef = useRef(null);
  const clearLeaveTimer = () => {
    if (leaveTimerRef.current) {
      clearTimeout(leaveTimerRef.current);
      leaveTimerRef.current = null;
    }
  };
  useEffect(() => () => clearLeaveTimer(), []);

  const handleEnter = (seg, evt) => {
    clearLeaveTimer();
    setHovered(seg.id);
    setHoveredPillar(seg.id);
    setCursor({ x: evt.clientX, y: evt.clientY });
    const idx = segments.findIndex((s) => s.id === seg.id);
    if (idx >= 0) {
      setLastAngle(startOffset + idx * arcSize + arcSize / 2 + 90);
    }
    scheduleWisdom(seg.id);
  };
  const handleLeave = () => {
    clearLeaveTimer();
    leaveTimerRef.current = setTimeout(() => {
      setHovered(null);
      setHoveredPillar(null);
      cancelWisdom();
      leaveTimerRef.current = null;
    }, 90);
  };
  const handleMove = (seg, evt) => {
    setCursor({ x: evt.clientX, y: evt.clientY });
    if (wisdomFor && wisdomFor !== seg.id) setWisdomFor(null);
  };

  const wisdomPayload = wisdomFor && pillarWisdom ? pillarWisdom[wisdomFor] : null;

  return (
    <div className="mcw-wrap">
      <svg
        viewBox="0 0 400 400"
        className={`mcw-svg${isDormant ? ' mcw-svg--dormant' : ''}${isLit || forceConverged ? ' mcw-svg--lit' : ''}${isIgniting ? ' mcw-svg--igniting' : ''}${forceConverged ? ' mcw-svg--converged' : ''}`}
        role="img"
        aria-label={`${centerLabel} comparison wheel`}
        style={{
          '--mcw-level-color': palette.base,
          '--mcw-level-stroke': palette.stroke,
          '--mcw-level-shimmer': palette.shimmer,
          '--mcw-level-hub-tint': palette.hubTint,
          '--mcw-level-aura': palette.brightAura,
          '--mcw-theme-color': palette.base,
          '--mcw-theme-stroke': palette.stroke,
          '--mcw-qalb-balance': qalbBalance.toFixed(3),
        }}
      >
        <defs>
          <radialGradient
            id="mcw-progress-grad"
            gradientUnits="userSpaceOnUse"
            cx={CX} cy={CY} r={PROGRESS_MAX_R}
            fx={CX} fy={CY}
          >
            <stop offset="0%"   stopColor={palette.base} stopOpacity="0.25" />
            <stop offset="35%"  stopColor={palette.base} stopOpacity="0.55" />
            <stop offset="75%"  stopColor={palette.base} stopOpacity="0.85" />
            <stop offset="100%" stopColor={palette.base} stopOpacity="1" />
          </radialGradient>
          <radialGradient
            id="mcw-progress-grad-dim"
            gradientUnits="userSpaceOnUse"
            cx={CX} cy={CY} r={PROGRESS_MAX_R}
          >
            <stop offset="0%" stopColor="#1a4a4e" />
            <stop offset="100%" stopColor="#0a2326" />
          </radialGradient>
          <linearGradient id="mcw-band-level" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={palette.base} stopOpacity="0.95" />
            <stop offset="100%" stopColor={palette.base} stopOpacity="0.65" />
          </linearGradient>
          <radialGradient id="mcw-aura-grad" cx="50%" cy="50%" r="50%">
            <stop offset="0%"   stopColor={palette.brightAura} stopOpacity="0.95" />
            <stop offset="55%"  stopColor={palette.brightAura} stopOpacity="0.35" />
            <stop offset="100%" stopColor={palette.brightAura} stopOpacity="0" />
          </radialGradient>
          <pattern id="mcw-pat-dots" width="8" height="8" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="1.1" fill="rgba(255,255,255,0.55)" />
          </pattern>
          <pattern id="mcw-pat-stripes" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <rect x="0" y="0" width="2" height="8" fill="rgba(255,255,255,0.45)" />
          </pattern>
          <pattern id="mcw-pat-crosshatch" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 0 0 L 10 10 M 10 0 L 0 10" stroke="rgba(255,255,255,0.45)" strokeWidth="1" />
          </pattern>
        </defs>

        {segments.map((seg, i) => {
          const startDeg = startOffset + i * arcSize;
          const endDeg = startOffset + (i + 1) * arcSize;
          const pct = Math.max(0, Math.min(100, seg.current));
          // Progress fills from the outer rim inward toward the hub: the outer
          // edge is fixed at PROGRESS_MAX_R, the inner edge moves down toward
          // HUB_R as completion rises (full wedge at 100%, sliver at the rim near 0%).
          const fillInnerR = PROGRESS_MAX_R - (PROGRESS_MAX_R - HUB_R) * (pct / 100);
          const isHovered = effectiveHover === seg.id;
          const isEmpty = pct === 0;
          const isComplete = pct >= 100;
          const bucket = Math.round(pct / 5);

          const hov = isHovered ? ' is-hovered' : '';
          return (
            <g
              key={`inner-${seg.id}`}
              role={seg.route ? 'button' : 'img'}
              tabIndex={seg.route ? 0 : undefined}
              aria-label={`${seg.label}: ${Math.round(seg.current)}%${seg.route ? ' — open submodule' : ''}`}
              className={`mcw-sector${isMounted ? ' is-mounted' : ''}${hov}`}
              style={{ cursor: seg.route ? 'pointer' : 'default', animationDelay: `${i * 90}ms` }}
              onMouseEnter={(e) => handleEnter(seg, e)}
              onMouseLeave={handleLeave}
              onMouseMove={(e) => handleMove(seg, e)}
              onClick={() => handleActivate(seg)}
              onKeyDown={(e) => {
                if (seg.route && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleActivate(seg);
                }
              }}
            >
              <path
                d={annularSector(HUB_R, PROGRESS_MAX_R, startDeg, endDeg)}
                fill="url(#mcw-progress-grad-dim)"
                className={`mcw-seg-bg${hov}`}
              />
              {isEmpty && (
                <path
                  d={annularSector(HUB_R + 4, PROGRESS_MAX_R - 4, startDeg, endDeg)}
                  className={`mcw-seg-empty${hov}`}
                />
              )}
              {pct > 0 && (
                <>
                  <path
                    key={`fill-${seg.id}-${bucket}`}
                    d={annularSector(fillInnerR, PROGRESS_MAX_R, startDeg, endDeg)}
                    fill={seg.color || 'url(#mcw-progress-grad)'}
                    className={`mcw-seg-current${hov}`}
                    style={{ animationDelay: `${i * 80}ms`, opacity: seg.color ? 0.85 : undefined }}
                  />
                  <path
                    d={annularSector(fillInnerR, PROGRESS_MAX_R, startDeg, endDeg)}
                    fill={`url(#${patternId})`}
                    className={`mcw-seg-pattern${hov}`}
                    pointerEvents="none"
                  />
                </>
              )}
              {isComplete && (
                <path
                  key={`complete-${seg.id}`}
                  d={outerArc(PROGRESS_MAX_R - 2, startDeg + 1, endDeg - 1)}
                  pathLength="1"
                  className={`mcw-seg-complete${hov}`}
                  pointerEvents="none"
                />
              )}
            </g>
          );
        })}

        {segments.map((seg, i) => {
          const startDeg = startOffset + i * arcSize;
          const endDeg = startDeg + arcSize;
          const isHovered = effectiveHover === seg.id;
          const hov = isHovered ? ' is-hovered' : '';
          return (
            <path
              key={`band-${seg.id}`}
              d={annularSector(LABEL_INNER_R, LABEL_OUTER_R, startDeg, endDeg)}
              fill={seg.color || 'url(#mcw-band-level)'}
              stroke="rgba(10, 20, 24, 0.85)"
              strokeWidth="1.5"
              className={`mcw-band${hov}`}
              style={{ cursor: seg.route ? 'pointer' : 'default' }}
              role={seg.route ? 'button' : 'img'}
              tabIndex={seg.route ? 0 : undefined}
              aria-label={`${seg.label}${seg.route ? ' — open submodule' : ''}`}
              onMouseEnter={(e) => handleEnter(seg, e)}
              onMouseLeave={handleLeave}
              onMouseMove={(e) => handleMove(seg, e)}
              onClick={() => handleActivate(seg)}
              onKeyDown={(e) => {
                if (seg.route && (e.key === 'Enter' || e.key === ' ')) {
                  e.preventDefault();
                  handleActivate(seg);
                }
              }}
            />
          );
        })}

        <circle cx={CX} cy={CY} r={LABEL_OUTER_R} className="mcw-outer-stroke" />
        <circle cx={CX} cy={CY} r={LABEL_INNER_R} className="mcw-outer-stroke" />

        {segments.map((seg, i) => {
          const Icon = seg.Icon;
          if (!Icon) return null;
          const midDeg = startOffset + i * arcSize + arcSize / 2;
          const [ix, iy] = polar(ICON_R, midDeg);
          const isHov = effectiveHover === seg.id;
          const isComplete = (seg.current || 0) >= 100;
          const hov = isHov ? ' is-hovered' : '';
          const vesselLit = (isLit || isComplete || forceConverged) ? ' is-lit' : '';
          const vesselComplete = isComplete ? ' is-complete' : '';
          return (
            <g
              key={`vessel-${seg.id}`}
              className={`mcw-pillar-vessel${hov}${vesselLit}${vesselComplete}`}
              style={{
                '--mcw-aura-cx': `${ix}px`,
                '--mcw-aura-cy': `${iy}px`,
                '--mcw-ignite-delay': `${80 + i * 50}ms`,
                ...(seg.color ? { '--mcw-level-aura': seg.color } : null),
              }}
              pointerEvents="none"
            >
              <circle
                className="mcw-aura"
                cx={ix}
                cy={iy}
                r={16}
                fill="url(#mcw-aura-grad)"
              />
              <g
                transform={`translate(${ix - 9} ${iy - 9})`}
                pointerEvents="none"
              >
                <g className="mcw-icon-wrap">
                  <Icon size={18} strokeWidth={1.8} />
                </g>
              </g>
            </g>
          );
        })}

        <g
          className={`mcw-needle${effectiveHover && !isDormant ? ' is-active' : ''}`}
          style={{
            transform: `rotate(${needleAngle}deg)`,
            transformOrigin: `${CX}px ${CY}px`,
          }}
          pointerEvents="none"
        >
          <path
            d={`M ${CX} ${CY - HUB_R + 1} L ${CX - 4} ${CY - HUB_R - 7} L ${CX + 4} ${CY - HUB_R - 7} Z`}
          />
        </g>

        <g
          className={`mcw-hub-group${mithaqHolding ? ' is-holding' : ''}${isDormant ? ' is-dormant' : ''}`}
          {...(mithaqDomain && !isLit
            ? {
                ...mithaqBind,
                role: 'button',
                tabIndex: 0,
                'aria-label': `Press and hold to renew the ${centerLabel.toLowerCase()} covenant`,
              }
            : { pointerEvents: 'none' })}
        >
          <circle
            cx={CX} cy={CY} r={HUB_R}
            className={`mcw-hub${effectiveHover && !isDormant ? ' is-active' : ''}`}
          />
          <circle cx={CX} cy={CY} r={HUB_R - 4} className="mcw-hub-inner" />
          {mithaqDomain && !isLit && (
            <circle
              className="mcw-mithaq-ring"
              cx={CX}
              cy={CY}
              r={HUB_R + 4}
              fill="none"
              stroke={palette.brightAura}
              strokeWidth={2}
              strokeLinecap="round"
              pathLength="1"
              strokeDasharray="1"
              strokeDashoffset={1 - mithaqProgress}
              transform={`rotate(-90 ${CX} ${CY})`}
              pointerEvents="none"
            />
          )}
          <text
            x={CX} y={isDormant ? CY - 6 : CY - 10}
            className={`mcw-hub-label${effectiveHover && !isDormant ? ' is-active' : ''}`}
            textAnchor="middle" dominantBaseline="middle"
            pointerEvents="none"
          >
            {hubTopLabel}
          </text>
          {!isDormant && (
            <text
              x={CX} y={CY + 10}
              className="mcw-hub-readout"
              textAnchor="middle" dominantBaseline="middle"
              pointerEvents="none"
            >
              {hubBottomLabel}
            </text>
          )}
          {isDormant && (
            <text
              x={CX} y={CY + 12}
              className="mcw-hub-hint"
              textAnchor="middle" dominantBaseline="middle"
              pointerEvents="none"
            >
              Press &amp; hold to renew
            </text>
          )}
        </g>
        {showNextCard && cardPos && nextCardText && !isDormant && (
          <MaqasidNextActionCard
            x={cardPos.x}
            y={cardPos.y}
            flip={cardPos.flip}
            levelColor={palette.base}
            text={nextCardText}
            label={nextCardLabel}
            width={nextCardWidth}
            height={nextCardHeight}
            multiline={Boolean(hoveredSeg?.tooltipText)}
          />
        )}
      </svg>

      {wisdomPayload && !isDormant && (
        <WheelWisdomTooltip
          wisdom={wisdomPayload}
          x={cursor.x}
          y={cursor.y}
          levelColor={palette.base}
          showDiacritics={showDiacritics}
        />
      )}
      <div
        className="mcw-aria-live"
        role="status"
        aria-live="polite"
      >
        {isIgniting ? `${centerLabel} covenant renewed.` : ''}
      </div>
    </div>
  );
}
