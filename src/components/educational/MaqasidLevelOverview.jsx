import { useState } from 'react';
import { LevelNavigator } from '../LevelNavigator/index.js';
import { MaqasidComparisonWheel } from '../MaqasidComparisonWheel/index.js';
import './MaqasidLevelOverview.css';

const LEVEL_META = {
  core:       { color: '#C8A96E', pattern: 'dots' },
  growth:     { color: '#4ab8a8', pattern: 'stripes' },
  excellence: { color: '#8b5cf6', pattern: 'crosshatch' },
};

function defaultTaskColor(task) {
  return task._pillarAccent || 'var(--border2)';
}

/**
 * Dashboard widget: compact FLN tier navigator + Maqasid Comparison Wheel.
 *
 * Caller provides all data; this component owns only the tier-switching state
 * when used in uncontrolled mode (level / onLevelChange omitted).
 *
 * Props:
 *   pillars       — [{ id, label, Icon, route, accentColor }]
 *   pillarTasks   — { [pillarId]: Task[] } — synthetic tasks for subseg bars
 *   progressMap   — { [pillarId]: { pct: number } }
 *   level?        — controlled tier ('core'|'growth'|'excellence')
 *   onLevelChange?(key) — called when tier switches
 *   onSegmentClick?(pillarId)
 *   onSubsegClick?(submoduleId)
 *   onReach100?(seg)
 *   storageKey?   — localStorage key for internal state (uncontrolled mode)
 *   taskColorFn?  — (task) => color string
 */
export default function MaqasidLevelOverview({
  pillars = [],
  pillarTasks = {},
  progressMap = {},
  level: controlledLevel,
  onLevelChange,
  onSegmentClick,
  onSubsegClick,
  onReach100,
  storageKey = 'maqasid_level',
  taskColorFn,
}) {
  const [internalLevel, setInternalLevel] = useState('core');
  const level = controlledLevel ?? internalLevel;
  const meta = LEVEL_META[level] || LEVEL_META.core;

  const handleLevelChange = (key) => {
    if (!key) return;
    if (controlledLevel === undefined) setInternalLevel(key);
    onLevelChange?.(key);
  };

  const segments = pillars.map((p) => ({
    ...p,
    current: progressMap[p.id]?.pct ?? 0,
  }));

  return (
    <div
      className="flo flo--dashboard"
      style={{ '--level-color': meta.color }}
    >
      <LevelNavigator
        compact
        controlledLevel={level}
        onLevelChange={handleLevelChange}
        pillars={pillars}
        storageKey={storageKey}
        pillarTasks={pillarTasks}
        taskColorFn={taskColorFn ?? defaultTaskColor}
        onSegmentClick={onSegmentClick}
        onSubsegClick={onSubsegClick}
      />
      <section
        className="flo__section flo__section--wheel motif-soft-glass motif-shimmer-border"
        aria-label="Maqasid pattern at this tier"
      >
        <div className="flo__wheel">
          <MaqasidComparisonWheel
            centerLabel="MAQASID"
            levelColor={meta.color}
            level={level}
            levelPattern={meta.pattern}
            segments={segments}
            onReach100={onReach100}
          />
        </div>
      </section>
    </div>
  );
}
