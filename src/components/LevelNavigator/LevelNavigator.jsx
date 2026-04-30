import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useWheelHoverStore } from '../../stores/wheelHoverStore';
import IslamicTerm from './IslamicTerm';
import './LevelNavigator.css';

const safeSet = (k, v) => {
  try { localStorage.setItem(k, v); } catch { /* swallow quota / availability */ }
};

const DEFAULT_LEVELS = [
  {
    key:      'core',
    label:    'LEVEL 1',
    subtitle: '(DARURIYYAT)',
    title:    'Core Higher Objectives',
    desc:     'Foundational obligations — the essential duties that must be established before all else.',
    color:    '#C8A96E',
    routeSuffix: 'core',
  },
  {
    key:      'growth',
    label:    'LEVEL 2',
    subtitle: '(HAJIYYAT)',
    title:    'Growth Space',
    desc:     'Development needs — structured progression that deepens practice and knowledge.',
    color:    '#4ab8a8',
    routeSuffix: 'growth',
  },
  {
    key:      'excellence',
    label:    'LEVEL 3',
    subtitle: '(TAHSINIYYAT)',
    title:    'Embellishments',
    desc:     'Refinement pursuits — aspirational mastery that elevates and perfects.',
    color:    '#8b5cf6',
    routeSuffix: 'excellence',
  },
];

function defaultTaskColor(task) {
  if (task.completedAt || task.columnId?.endsWith('_done')) return '#22c55e';
  if (!task.columnId?.endsWith('_to_do') && !task.columnId?.endsWith('_todo')) return '#F59E0B';
  return 'var(--border2, rgba(255,255,255,0.12))';
}

/**
 * Generic level-navigator carousel.
 *
 * Props:
 *   pillars            — array of { id, label, route, glossaryEntry? }
 *                        glossaryEntry: { term, arabic?, transliteration?, meaning, source? }
 *   pillarTasks        — { [pillarId]: Task[] }  required if you want segmented bars
 *                        Task shape: { id, title, columnId?, completedAt?, priority? }
 *   storageKey         — localStorage key for persisting active tab
 *   controlledLevel    — when parent controls active level (key)
 *   onLevelChange      — callback(levelKey) fired when level changes
 *   currentPillarId    — pillar id to highlight as active
 *   compact            — bool, reduces vertical space + enables ResizeObserver stacking
 *   levelDescriptions  — { [key]: { title?, desc?, color? } } per-consumer overrides
 *   levels             — full level array override (defaults to DARURIYYAT/HAJIYYAT/TAHSINIYYAT)
 *   onSegmentClick     — (pillarId, levelKey) => void  — overrides router.navigate
 *   onSubsegClick      — (taskId, pillarId) => void   — overrides router.navigate
 *   taskColorFn        — (task) => string CSS color
 *   gateIndicators     — array of { afterSegmentId, label, status: 'pending'|'in-progress'|'complete' }
 *   tooltipsEnabled    — passed through to IslamicTerm (default true)
 *   showDiacritics     — passed through to IslamicTerm (default true)
 */
export default function LevelNavigator({
  pillars = [],
  pillarTasks = {},
  storageKey,
  controlledLevel,
  onLevelChange,
  currentPillarId,
  compact,
  levelDescriptions,
  levels: customLevels,
  onSegmentClick,
  onSubsegClick,
  taskColorFn,
  gateIndicators,
  tooltipsEnabled = true,
  showDiacritics = true,
} = {}) {
  const navigate = useNavigate();
  const [internalIdx, setInternalIdx] = useState(0);

  const baseLevels = customLevels || DEFAULT_LEVELS;

  const activeIdx = controlledLevel
    ? Math.max(0, baseLevels.findIndex((l) => l.key === controlledLevel))
    : internalIdx;

  const [slideDir, setSlideDir] = useState(null);

  const handlePrev = () => {
    setSlideDir('right');
    setTimeout(() => setSlideDir(null), 300);
    if (onLevelChange) onLevelChange(baseLevels[activeIdx - 1]?.key);
    else setInternalIdx(activeIdx - 1);
  };
  const handleNext = () => {
    setSlideDir('left');
    setTimeout(() => setSlideDir(null), 300);
    if (onLevelChange) onLevelChange(baseLevels[activeIdx + 1]?.key);
    else setInternalIdx(activeIdx + 1);
  };

  const flnRef = useRef(null);
  const segmentsRef = useRef(null);
  const [stacked, setStacked] = useState(false);

  const checkOverflow = useCallback(() => {
    const flnEl = flnRef.current;
    const segEl = segmentsRef.current;
    if (!flnEl || !segEl || !compact) return;

    const containerW = flnEl.offsetWidth;
    const flnGap = parseFloat(getComputedStyle(flnEl).gap) || 16;
    const available = containerW - flnGap * 2;
    const centerW = available * (2.8 / 4.8);

    const centerEl = flnEl.querySelector('.fln__center');
    if (!centerEl) return;
    const cs = getComputedStyle(centerEl);
    const padX = parseFloat(cs.paddingLeft) + parseFloat(cs.paddingRight);
    const segGap = parseFloat(getComputedStyle(segEl).gap) || 8;
    const barW = (centerW - padX - segGap * (pillars.length - 1)) / pillars.length;

    const navs = segEl.querySelectorAll('.fln__segment-nav');
    for (const nav of navs) {
      if (nav.scrollWidth >= barW * 0.9) {
        setStacked(true);
        return;
      }
    }
    setStacked(false);
  }, [compact, pillars.length]);

  useEffect(() => {
    const el = flnRef.current;
    if (!el || !compact) return;
    const ro = new ResizeObserver(checkOverflow);
    ro.observe(el);
    checkOverflow();
    return () => ro.disconnect();
  }, [compact, checkOverflow]);

  const levels = levelDescriptions
    ? baseLevels.map((l) => ({ ...l, ...levelDescriptions[l.key] }))
    : baseLevels;

  const active = levels[activeIdx];
  const prev   = levels[activeIdx - 1] ?? null;
  const next   = levels[activeIdx + 1] ?? null;

  const resolveTaskColor = taskColorFn || defaultTaskColor;

  const syncHovered = useWheelHoverStore((s) => s.hoveredPillar);
  const setHoveredPillar = useWheelHoverStore((s) => s.setHoveredPillar);

  return (
    <div ref={flnRef} className={`fln${compact ? ' fln--compact' : ''}${stacked ? ' fln--stacked' : ''}`}>

      <div
        className={`fln__side fln__side--left${prev ? ' fln__side--active' : ''}`}
        onClick={() => prev && handlePrev()}
        role={prev ? 'button' : undefined}
        tabIndex={prev ? 0 : undefined}
        aria-label={prev ? `Navigate to previous level: ${prev.title}` : undefined}
        onKeyDown={prev ? (e) => e.key === 'Enter' && handlePrev() : undefined}
      >
        {prev ? (
          <>
            <div className="fln__side-text">
              <span className="fln__side-label" style={{ color: prev.color }}>{prev.label}</span>
              <span className="fln__side-subtitle">{prev.subtitle}</span>
              <span className="fln__side-title">{prev.title}</span>
            </div>
            <ChevronLeft className="fln__chevron" style={{ color: prev.color }} size={36} strokeWidth={1.5} />
          </>
        ) : (
          <div className="fln__side-empty" />
        )}
      </div>

      <div className="fln__center" aria-live="polite">
        <div key={activeIdx} className={`fln__level-content${slideDir ? ` fln__level-content--${slideDir}` : ''}`}>
          <div className="fln__center-head">
            <span className="fln__center-label" style={{ color: active.color }}>{active.label}</span>
            <span className="fln__center-subtitle">{active.subtitle}</span>
          </div>
          <h2 className="fln__center-title">{active.title}</h2>
          <p className="fln__center-desc">{active.desc}</p>

          <div className="fln__segments" ref={segmentsRef}>
            {pillars.map(({ id, label, route, glossaryEntry }) => {
              const tasks = pillarTasks[id] || [];
              const isCurrent = currentPillarId === id;
              const handleSegClick = () => {
                if (onSegmentClick) { onSegmentClick(id, active.key); }
                else { if (storageKey) safeSet(storageKey, active.key); if (route) navigate(route); }
              };
              const gate = gateIndicators?.find((g) => g.afterSegmentId === id);
              const isSyncHovered = syncHovered === id;
              return (
                <Fragment key={id}>
                  <div
                    className={`fln__segment-col${isCurrent ? ' fln__segment-col--current' : ''}${isSyncHovered ? ' fln__segment-col--hover-sync' : ''}`}
                    style={{ '--seg-color': active.color }}
                    data-pillar-id={id}
                    onClick={handleSegClick}
                    onMouseEnter={() => setHoveredPillar(id)}
                    onMouseLeave={() => setHoveredPillar(null)}
                    onFocus={() => setHoveredPillar(id)}
                    onBlur={() => setHoveredPillar(null)}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && handleSegClick()}
                  >
                    <div className="fln__segment-bar">
                      {tasks.length > 0 ? tasks.map((task) => (
                        <button
                          key={task.id}
                          className="fln__subseg"
                          style={{ background: resolveTaskColor(task) }}
                          title={task.title}
                          aria-label={`Task: ${task.title}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onSubsegClick) { onSubsegClick(task.id, id); }
                            else { if (storageKey) safeSet(storageKey, active.key); if (route) navigate(`${route}?task=${task.id}`); }
                          }}
                        />
                      )) : (
                        <div className="fln__subseg fln__subseg--empty" />
                      )}
                    </div>
                    <button
                      className="fln__segment-nav"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleSegClick();
                      }}
                    >
                      {glossaryEntry ? (
                        <IslamicTerm
                          entry={glossaryEntry}
                          tooltipsEnabled={tooltipsEnabled}
                          showDiacritics={showDiacritics}
                        >
                          {label}
                        </IslamicTerm>
                      ) : (
                        label
                      )}
                    </button>
                  </div>
                  {gate && (
                    <button
                      type="button"
                      className={`fln__gate-indicator fln__gate-indicator--${gate.status}`}
                      title={`${gate.label} (${gate.status})`}
                      aria-label={`Gate: ${gate.label} — ${gate.status}`}
                      onClick={() => {
                        if (onSegmentClick) onSegmentClick(gate.afterSegmentId, active.key);
                      }}
                    >
                      <span className="fln__gate-diamond">&#x25C6;</span>
                    </button>
                  )}
                </Fragment>
              );
            })}
          </div>
        </div>
      </div>

      <div
        className={`fln__side fln__side--right${next ? ' fln__side--active' : ''}`}
        onClick={() => next && handleNext()}
        role={next ? 'button' : undefined}
        tabIndex={next ? 0 : undefined}
        aria-label={next ? `Navigate to next level: ${next.title}` : undefined}
        onKeyDown={next ? (e) => e.key === 'Enter' && handleNext() : undefined}
      >
        {next ? (
          <>
            <ChevronRight className="fln__chevron" style={{ color: next.color }} size={36} strokeWidth={1.5} />
            <div className="fln__side-text fln__side-text--right">
              <span className="fln__side-label" style={{ color: next.color }}>{next.label}</span>
              <span className="fln__side-subtitle">{next.subtitle}</span>
              <span className="fln__side-title">{next.title}</span>
            </div>
          </>
        ) : (
          <div className="fln__side-empty" />
        )}
      </div>

    </div>
  );
}
