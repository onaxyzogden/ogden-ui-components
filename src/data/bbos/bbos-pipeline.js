// BBOS Pipeline — 9-stage business cultivation system
// Each project can opt into BBOS, getting these stages as Kanban columns
// Three layers: Think (IDY–OFR), Execute (OUT–RET), Reckon (OPT)

export const BBOS_LAYERS = [
  { id: 'think',   label: 'Think',   color: '#c9a05a', stages: ['IDY', 'CRD', 'STR', 'OFR'] },
  { id: 'execute', label: 'Execute', color: '#4ab8a8', stages: ['OUT', 'SLS', 'DEL', 'RET'] },
  { id: 'reckon',  label: 'Reckon',  color: '#6366f1', stages: ['OPT'] },
];

export const BBOS_STAGES = [
  {
    id: 'IDY', order: 0, label: 'Identity', layer: 'think',
    description: 'Establish the foundational identity, mission, and values of the business.',
    attrs: 'Al-Awwal · Al-Badi',
    color: 'var(--col-todo)',
  },
  {
    id: 'CRD', order: 1, label: 'Credibility', layer: 'think',
    description: 'Build credibility and establish the trust infrastructure for your offering.',
    attrs: 'Al-Mu\'min · Al-Wakil',
    color: '#6366f1',
  },
  {
    id: 'STR', order: 2, label: 'Structure', layer: 'think',
    description: 'Design the operational structure, processes, and team architecture.',
    attrs: 'Al-Musawwir · Al-Mudabbir',
    color: '#8b5cf6',
  },
  {
    id: 'OFR', order: 3, label: 'Offering', layer: 'think',
    description: 'Define and price the service offering with clarity and integrity.',
    attrs: 'Ar-Razzaq · Al-Karim',
    color: '#c9a05a',
  },
  {
    id: 'OUT', order: 4, label: 'Reach', layer: 'execute',
    description: 'Reach the right people through ethical, purposeful outreach.',
    attrs: 'Al-Hadi · An-Nur',
    color: '#22c55e',
  },
  {
    id: 'SLS', order: 5, label: 'Convert', layer: 'execute',
    description: 'Convert interest into commitment through honest, consultative selling.',
    attrs: 'As-Sami · Al-Basir',
    color: '#3b82f6',
  },
  {
    id: 'DEL', order: 6, label: 'Deliver', layer: 'execute',
    description: 'Deliver the promised outcome with excellence and care.',
    attrs: 'Al-Muhsin · Al-Latif',
    color: '#4ab8a8',
  },
  {
    id: 'RET', order: 7, label: 'Retain', layer: 'execute',
    description: 'Retain clients through ongoing value, relationship, and stewardship.',
    attrs: 'Al-Wadud · Al-Hafiz',
    color: '#f59e0b',
  },
  {
    id: 'OPT', order: 8, label: 'Reckon', layer: 'reckon',
    description: 'Reckon with outcomes, optimize systems, and prepare for the next cycle.',
    attrs: 'Al-Hasib · Al-Khabir',
    color: '#ef4444',
  },
];

// ── Amanah Proof Audit rejection reasons (protocol v2.4) ────────────────────

export const BBOS_REJECTION_REASONS = [
  {
    id: 'riba',
    label: 'Riba (interest-based mechanism)',
    description: 'The business model relies on interest, debt-yield, or other riba structures.',
  },
  {
    id: 'gharar',
    label: 'Gharar (excessive uncertainty)',
    description: 'The offering or transaction contains undefined elements the client cannot evaluate.',
  },
  {
    id: 'capability_gap',
    label: 'Capability gap',
    description: 'The operator cannot honestly meet the claims required to proceed at this scale.',
  },
  {
    id: 'regulatory',
    label: 'Regulatory hard-stop',
    description: 'A jurisdictional or compliance constraint blocks the pipeline from continuing.',
  },
  {
    id: 'withdrawal',
    label: 'Operator withdrawal',
    description: 'The operator has chosen to exit the pipeline by their own discernment.',
  },
];

/** Get rejection reason by ID */
export function getBbosRejectionReason(reasonId) {
  return BBOS_REJECTION_REASONS.find((r) => r.id === reasonId) || null;
}

// ── Patch Plan sub-stages (protocol v2.4) ────────────────────────────────────

export const BBOS_PATCH_STAGES = [
  {
    id: '00A',
    label: 'Input Integrity Gate',
    description: 'Grades operator proof on a P0-P3 scale before pipeline entry.',
    afterStage: 'IDY',
    layer: 'think',
  },
  {
    id: '01B',
    label: 'Mechanism Factory',
    description: 'Bridges the strategy-to-offer gap, ensuring STR outputs translate cleanly into OFR inputs.',
    afterStage: 'STR',
    layer: 'think',
  },
];

/** Get the layer for a given stage ID */
export function getStageLayer(stageId) {
  return BBOS_LAYERS.find((l) => l.stages.includes(stageId)) || null;
}

/** Get stage by ID */
export function getStage(stageId) {
  return BBOS_STAGES.find((s) => s.id === stageId) || null;
}

// ── LevelNavigator integration ───────────────────────────────────────────────

export const BBOS_NAV_LEVELS = [
  {
    key: 'think',
    label: 'LEVEL 1',
    subtitle: 'THINK',
    title: 'Strategic Groundwork',
    desc: 'Lay the strategic groundwork — identity, credibility, structure, and offering.',
    color: '#c9a05a',
  },
  {
    key: 'execute',
    label: 'LEVEL 2',
    subtitle: 'EXECUTE',
    title: 'Offering to Market',
    desc: 'Bring the offering to market — outreach, sales, and delivery.',
    color: '#4ab8a8',
  },
  {
    key: 'reckon',
    label: 'LEVEL 3',
    subtitle: 'RECKON',
    title: 'Reckoning',
    desc: 'Assess outcomes, strengthen retention, and optimize for the next cycle.',
    color: '#6366f1',
  },
];

/** Get pillar-shaped array for a given BBOS layer (for LevelNavigator segments) */
export function getBbosNavPillars(layerKey) {
  const layer = BBOS_LAYERS.find((l) => l.id === layerKey);
  if (!layer) return [];
  return layer.stages.map((stageId) => {
    const stage = BBOS_STAGES.find((s) => s.id === stageId);
    return { id: stageId, label: stage?.label || stageId };
  });
}

/** Get layer key string for a given stage ID */
export function getLayerForStage(stageId) {
  return BBOS_LAYERS.find((l) => l.stages.includes(stageId))?.id || 'think';
}
