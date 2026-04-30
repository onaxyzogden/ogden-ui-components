import { useState, useEffect, useMemo, useRef } from 'react';
import { LevelNavigator } from '../LevelNavigator/index.js';
import './PillarLevelPage.css';

const VALID_LEVELS = ['core', 'growth', 'excellence'];
const LEVEL_COLORS = { core: '#C8A96E', growth: '#4ab8a8', excellence: '#8b5cf6' };

function localGet(key, fallback) {
  try { const v = localStorage.getItem(key); return v !== null ? JSON.parse(v) : fallback; }
  catch { return fallback; }
}

function localSet(key, value) {
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota */ }
}

/**
 * Generic pillar-level page — compact FLN level navigator + cross-fading
 * content area. Store coupling is fully delegated to the caller via callbacks
 * and render-props so this component can be used outside MILOS.
 *
 * Props:
 *   pillarKey           — initial submodule key, e.g. 'physical', 'shahada'
 *   pillarModuleMap     — { pillarKey → moduleId } for FLN active highlight
 *   boardPrefix         — e.g. 'health', 'faith'
 *   storageKey?         — localStorage key for level persistence
 *   pillars             — [{ id, label, route, accentColor, Icon }]
 *   levelRoutes?        — { core, growth, excellence } navigation URLs
 *   levelDescriptions?  — { core, growth, excellence } subtitle text
 *   getProject(boardId) — (boardId: string) => project | null
 *   onMount(boardIds)   — called once on mount; seed + preload all 3 levels
 *   onBoardChange(boardId) — called when the active boardId changes
 *   renderBoard({ boardId, project }) → ReactNode
 *   renderTaskPanel({ taskId, project, accentColor, onClose }) → ReactNode
 *   renderAyahEffect?({ boardPrefix, pillarKey }) → ReactNode — null-rendering side-effect slot
 */
export default function PillarLevelPage({
  pillarKey: initialPillarKey,
  pillarModuleMap = {},
  boardPrefix,
  storageKey,
  pillars = [],
  levelRoutes = {},
  levelDescriptions,
  getProject,
  onMount,
  onBoardChange,
  renderBoard,
  renderTaskPanel,
  renderAyahEffect,
}) {
  const [pillarKey, setPillarKey] = useState(initialPillarKey);
  const [subsegTask, setSubsegTask] = useState(null);

  const [activeLevel, setActiveLevelRaw] = useState(() => {
    if (!storageKey) return 'core';
    const saved = localGet(storageKey, 'core');
    return VALID_LEVELS.includes(saved) ? saved : 'core';
  });

  const slideDirRef = useRef(null);

  const setActiveLevel = (key) => {
    const prevIdx = VALID_LEVELS.indexOf(activeLevel);
    const nextIdx = VALID_LEVELS.indexOf(key);
    if (prevIdx !== nextIdx) slideDirRef.current = nextIdx > prevIdx ? 'left' : 'right';
    setActiveLevelRaw(key);
    if (storageKey) localSet(storageKey, key);
  };

  const boardId = `${boardPrefix}_${pillarKey}_${activeLevel}`;

  useEffect(() => {
    const allBoardIds = VALID_LEVELS.map((lvl) => `${boardPrefix}_${pillarKey}_${lvl}`);
    onMount?.(allBoardIds);
  // onMount is caller-stable; boardPrefix/pillarKey do not change after mount
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    onBoardChange?.(boardId);
  }, [boardId, onBoardChange]);

  const project = getProject?.(boardId) ?? null;

  const lastProjectRef = useRef(project);
  if (project) lastProjectRef.current = project;
  const displayProject = project || lastProjectRef.current;
  const displayProjectId = project ? boardId : lastProjectRef.current?.id;

  const [prevProject, setPrevProject] = useState(null);
  const prevTimerRef = useRef(null);
  const trackedBoardIdRef = useRef(boardId);
  useEffect(() => {
    if (trackedBoardIdRef.current === boardId) return;
    const outgoing = getProject?.(trackedBoardIdRef.current) ?? null;
    trackedBoardIdRef.current = boardId;
    if (outgoing) {
      setPrevProject(outgoing);
      clearTimeout(prevTimerRef.current);
      prevTimerRef.current = setTimeout(() => setPrevProject(null), 320);
    }
  }, [boardId, getProject]);

  const moduleId = pillarModuleMap[pillarKey] ?? pillarKey;
  const moduleToKey = useMemo(() => {
    const m = {};
    for (const [k, v] of Object.entries(pillarModuleMap)) m[v] = k;
    return m;
  }, [pillarModuleMap]);

  return (
    <div className="fpb-page-wrapper">
      {renderAyahEffect?.({ boardPrefix, pillarKey })}
      <LevelNavigator
        compact
        controlledLevel={activeLevel}
        onLevelChange={setActiveLevel}
        currentPillarId={moduleId}
        pillars={pillars}
        storageKey={storageKey}
        levelRoutes={levelRoutes}
        levelDescriptions={levelDescriptions}
        onSegmentClick={(clickedPillarId) => {
          const nextKey = moduleToKey[clickedPillarId] || clickedPillarId;
          if (nextKey === pillarKey) return;
          const nextRoute = pillars.find((p) => p.id === clickedPillarId)?.route;
          setPillarKey(nextKey);
          if (nextRoute) window.history.replaceState(null, '', nextRoute);
        }}
        onSubsegClick={(taskId, pillarId) => {
          const key = moduleToKey[pillarId] || pillarId;
          const proj = getProject?.(`${boardPrefix}_${key}_${activeLevel}`) ?? null;
          if (proj) setSubsegTask({ taskId, project: proj });
        }}
      />
      {subsegTask?.project && renderTaskPanel?.({
        taskId: subsegTask.taskId,
        project: subsegTask.project,
        accentColor: LEVEL_COLORS[activeLevel] || subsegTask.project.color,
        onClose: () => setSubsegTask(null),
      })}
      <div className="fpb-layout">
        <div className="fpb-content">
          {prevProject && prevProject.id !== displayProjectId && (
            <div key={prevProject.id} className="fpb-content__layer fpb-content__layer--out">
              {renderBoard?.({ boardId: prevProject.id, project: prevProject })}
            </div>
          )}
          {displayProject ? (
            <div key={displayProjectId} className="fpb-content__layer fpb-content__layer--in">
              {renderBoard?.({ boardId: displayProjectId, project: displayProject })}
            </div>
          ) : (
            <div className="fpb-content__layer" style={{ padding: 'var(--space-6)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <div className="fpb-skeleton" style={{ height: 80, background: 'var(--bg3, rgba(255,255,255,0.06))', borderRadius: 'var(--radius-lg, 8px)' }} />
              <div className="fpb-skeleton" style={{ height: 80, background: 'var(--bg3, rgba(255,255,255,0.06))', borderRadius: 'var(--radius-lg, 8px)' }} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
