import { useMemo, useState, useRef, useLayoutEffect, Fragment } from 'react';
import { CheckCircle, XCircle, AlertTriangle, Star, ShieldOff, RotateCcw, ShieldX } from 'lucide-react';
import { getBbosTaskDef, getBbosTaskDefsByStage } from '../../data/bbos/bbos-task-definitions';
import { getStage, BBOS_STAGES, BBOS_REJECTION_REASONS, getBbosRejectionReason } from '../../data/bbos/bbos-pipeline';
import { getTaskAccessLevel, getBbosRole, BBOS_TASK_ACCESS } from '../../data/bbos/bbos-role-access';
import { getGLabel } from '../../data/config/g-labels';
import './BbosFullDashboard.css';

// ── Internal fallback components ──────────────────────────────────────────────
// Package-internal replacements for MILOS's shared `DashboardTaskCard`,
// `GLabelBadge`, and `ScopeGate`. Consumers can override the task card and
// G-Label badge via the `renderTaskCard` / `renderGLabelBadge` render-props.

function FallbackGLabelBadge({ gLabel, size = 'sm' }) {
  const g = getGLabel(gLabel);
  if (!g) return null;
  const isSm = size === 'sm';
  return (
    <span
      className="glabel-badge"
      title={`${g.id} (${g.label}) — ${g.description}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: isSm ? '1px 6px' : '2px 8px',
        fontSize: isSm ? '0.65rem' : '0.72rem',
        fontWeight: 600,
        fontFamily: 'var(--font-mono)',
        color: g.color,
        background: g.bg,
        border: `1px solid ${g.color}30`,
        borderRadius: '4px',
        letterSpacing: '0.03em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {g.label}
    </span>
  );
}

function FallbackTaskCard({
  taskId,
  index,
  title,
  span,
  status,
  accentColor,
  chips,
  fieldProgress,
  purpose,
  onSelectTask,
  children,
}) {
  const clickable = !!(onSelectTask && taskId);
  const handleClick = (e) => {
    if (!clickable) return;
    if (e.target.closest('a, button, input, select, textarea')) return;
    onSelectTask(taskId);
  };
  const handleKeyDown = (e) => {
    if (!clickable) return;
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onSelectTask(taskId);
    }
  };
  const numStyle = accentColor
    ? { background: `color-mix(in srgb, ${accentColor} 14%, transparent)`, color: accentColor }
    : undefined;
  const cardClassName = [
    'dtc__card',
    `dtc__card--${status}`,
    clickable && 'dtc__card--clickable',
  ].filter(Boolean).join(' ');
  const cardStyle = span ? { gridColumn: `span ${span}` } : undefined;
  const pct = fieldProgress?.total
    ? Math.round((fieldProgress.filled / fieldProgress.total) * 100)
    : null;
  const fillColor = pct === 100 ? 'var(--col-done)' : pct >= 50 ? 'var(--accent)' : 'var(--pri-high)';
  return (
    <div
      data-task-id={taskId}
      className={cardClassName}
      style={cardStyle}
      onClick={handleClick}
      onKeyDown={clickable ? handleKeyDown : undefined}
      role={clickable ? 'button' : undefined}
      tabIndex={clickable ? 0 : undefined}
    >
      <div className="dtc__card-head">
        <div className="dtc__card-num" style={numStyle}>
          {String(index + 1).padStart(2, '0')}
        </div>
        <div className="dtc__card-head-info">
          <span className="dtc__card-title">{title}</span>
          {chips?.length > 0 && (
            <div className="dtc__card-chips">
              {chips.map((chip, i) => (
                <span key={i} className={chip.className || 'dtc__chip'} style={chip.style}>
                  {chip.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
      {pct !== null && (
        <div className="dtc__progress-row">
          <div className="dtc__progress-track">
            <div className="dtc__progress-fill" style={{ width: `${pct}%`, background: fillColor }} />
          </div>
          <span className="dtc__progress-pct">{pct}%</span>
        </div>
      )}
      {purpose && <p className="dtc__card-purpose">{purpose}</p>}
      {children && <div className="dtc__card-body">{children}</div>}
    </div>
  );
}

function InternalScopeGate({ bbosRole, bbosFilter }) {
  const role = getBbosRole(bbosRole);
  const stage = getStage(bbosFilter);
  const availableRoles = useMemo(() => {
    const allDefs = getBbosTaskDefsByStage(bbosFilter);
    const roleIds = new Set();
    for (const def of allDefs) {
      const entry = BBOS_TASK_ACCESS[def.id];
      if (entry) {
        for (const [r, level] of Object.entries(entry)) {
          if (level !== '-' && r !== bbosRole) roleIds.add(r);
        }
      }
    }
    return [...roleIds].map((id) => getBbosRole(id)).filter(Boolean);
  }, [bbosFilter, bbosRole]);
  return (
    <div className="bfd__scope-gate">
      <ShieldX size={48} />
      <h3>OUTSIDE YOUR SCOPE</h3>
      <p>The <strong>{role?.label || bbosRole}</strong> role does not have access to <strong>{stage?.label || bbosFilter}</strong>.</p>
      {availableRoles.length > 0 && (
        <p className="bfd__scope-gate-hint">
          Access is available under: {availableRoles.map((r) => r.label).join(', ')}
        </p>
      )}
    </div>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function splitLines(text) {
  if (!text) return [];
  return text.split('\n').map((l) => l.trim()).filter(Boolean);
}

function truncate(text, max) {
  if (!text) return '';
  return text.length > max ? text.slice(0, max) + '…' : text;
}

function resolveSelectLabel(field, value) {
  if (!value || !field.options) return value || null;
  const opt = field.options.find((o) => o.value === value);
  return opt ? opt.label : value;
}

function countFilledFields(def, fieldData) {
  if (!fieldData) return { filled: 0, total: def.fields.length };
  const filled = def.fields.filter((f) => {
    const v = fieldData[f.id];
    return v !== undefined && v !== null && String(v).trim() !== '';
  }).length;
  return { filled, total: def.fields.length };
}

function getSubLevelPrefix(subLevel) {
  if (!subLevel) return 'OTHER';
  if (subLevel.startsWith('PATCH')) return 'PATCH';
  if (subLevel.startsWith('AF'))  return 'AF';
  if (subLevel.startsWith('IFB')) return 'IFB';
  if (subLevel.startsWith('FP'))  return 'FP';
  if (subLevel.startsWith('S'))   return 'S';
  if (subLevel.startsWith('A'))   return 'A';
  if (subLevel.startsWith('V'))   return 'V';
  if (subLevel.startsWith('IC'))  return 'IC';
  return 'OTHER';
}

const PREFIX_LABELS = {
  PATCH: 'Patch Plan Sub-Stage',
  AF:    'Analysis Framework',
  S:     'Strategic Tasks',
  A:     'Asset Tasks',
  V:     'Validation Gates',
  FP:    'Framework Prompts',
  IFB:   'IFB Forms',
  IC:    'Integrity Check',
  OTHER: 'Additional Tasks',
};

// ── Factory classification ───────────────────────────────────────────────────
// Groundwork (research): S, V, FP, PATCH — strategic tasks, validation gates,
// framework prompts, and patch sub-stage gates. Workshop (asset): AF, A, IC.
// Assembly Gate unlocks Workshop after all Groundwork tasks are Done.
const RESEARCH_PREFIXES = new Set(['S', 'V', 'FP', 'PATCH']);
const ASSET_PREFIXES = new Set(['A', 'AF', 'IC']);

function getFactory(prefix) {
  if (RESEARCH_PREFIXES.has(prefix)) return 'research';
  if (ASSET_PREFIXES.has(prefix)) return 'asset';
  return 'research'; // default fallback
}

// ── Bento grid spans (12-column) ─────────────────────────────────────────────

function computeGroupSpans(prefix, defs) {
  return defs.map(() => 12);
}

// ── Star rating helpers ───────────────────────────────────────────────────────

function renderStars(score, max = 3) {
  const clamped = Math.min(Math.max(score, 0), max);
  return (
    <span className="bfd__pa-stars">
      {Array.from({ length: max }, (_, i) => i + 1).map((i) => (
        <Star
          key={i}
          size={14}
          className={i <= clamped ? '' : 'bfd__pa-star--empty'}
          fill={i <= clamped ? 'currentColor' : 'none'}
        />
      ))}
    </span>
  );
}

function ratingToStars(text) {
  const t = (text || '').trim().toLowerCase();
  if (t.startsWith('strong'))                                       return 3;
  if (t.startsWith('moderate'))                                     return 2;
  if (t.startsWith('weak'))                                         return 1;
  if (t.startsWith('unverifiable') || t.startsWith('insufficient')) return 1;
  return null; // fallback: render as text
}

// ── Stage quotes ──────────────────────────────────────────────────────────────

const STAGE_QUOTES = {
  IDY: '"He who is not truthful in establishing the foundation has built upon sand."',
  CRD: '"A business built on self-deception is a business that cannot sustain."',
  STR: '"Before you speak a word to the market, be certain of the truth behind it."',
  OFR: '"The offering is only as sound as the promise it is built upon."',
  OUT: '"Reach those who need you — not those you want to sell to."',
  SLS: '"A sale is not a conquest — it is a covenant entered freely by both parties."',
  DEL: '"Excellence in delivery is not efficiency alone — it is that the client feels cared for at every step."',
  RET: '"The bond after the sale is the true measure of the relationship."',
  OPT: '"Optimization without integrity is just efficient exploitation."',
};

// ── Stage weighted-signal scoring ─────────────────────────────────────────────

function countNonEmpty(...keys) {
  return (fd) => {
    const n = keys.filter((k) => !!fd?.[k]?.trim?.()).length;
    const t = keys.length;
    return n === t ? 5 : n >= t * 0.75 ? 4 : n >= t * 0.5 ? 3 : n >= 1 ? 1 : 0;
  };
}

const STAGE_SCORE_SIGNALS = {
  IDY: [
    { label: 'Capital & Skills Declared',  taskId: 'IDY-S1',
      fieldIds: ['capitalDeclaration', 'skillsDeclaration'],
      score: countNonEmpty('capitalDeclaration', 'skillsDeclaration') },
    { label: 'Proof & Constraints',        taskId: 'IDY-S1',
      fieldIds: ['proofLinks', 'constraintsDeclaration', 'geographyDeclaration', 'regulatoryDeclaration'],
      score: countNonEmpty('proofLinks', 'constraintsDeclaration', 'geographyDeclaration', 'regulatoryDeclaration') },
    { label: 'Normalisation Complete',     taskId: 'IDY-S2',
      fieldIds: ['capitalMapping', 'skillsMapping', 'proofMapping', 'constraintsMapping'],
      score: countNonEmpty('capitalMapping', 'skillsMapping', 'proofMapping', 'constraintsMapping') },
    { label: 'Gap Severity Assessed',      taskId: 'IDY-S3',
      fieldIds: ['gapSeverity', 'resolutionActions'],
      score: (fd) => fd?.gapSeverity?.trim() ? (fd?.resolutionActions?.trim() ? 5 : 3) : 0 },
    { label: 'Routing Decision Made',      taskId: 'IDY-S4',
      fieldIds: ['routingDecision', 'routingBasis'],
      score: (fd) => fd?.routingDecision?.trim() ? (fd?.routingBasis?.trim() ? 5 : 3) : 0 },
  ],
  CRD: [
    { label: 'Overall Proof Strength',    taskId: 'CRD-S3',
      fieldIds: ['overallProofStrength'],
      score: (fd) => ({ strong: 5, moderate: 3, weak: 1, insufficient: 0 }[fd?.overallProofStrength] ?? 0) },
    { label: 'Gate A — Regulatory',       taskId: 'CRD-V1',
      fieldIds: ['gateARegulatory'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateARegulatory] ?? 0) },
    { label: 'Gate B — Market Fit',       taskId: 'CRD-V1',
      fieldIds: ['gateBMarketFit'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateBMarketFit] ?? 0) },
    { label: 'Gate C — Competence Proof', taskId: 'CRD-V1',
      fieldIds: ['gateCCompetenceProof'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateCCompetenceProof] ?? 0) },
    { label: 'Gate D — Proven Demand',    taskId: 'CRD-V1',
      fieldIds: ['gateDProvenDemand'],
      score: (fd) => ({ pass: 5, conditional: 3, fail: 0 }[fd?.gateDProvenDemand] ?? 0) },
  ],
  STR: [
    { label: 'Integrity Verdict',     taskId: 'STR-V1',
      fieldIds: ['integrityVerdict'],
      score: (fd) => ({ pass: 5, conditionalPass: 3, fail: 0 }[fd?.integrityVerdict] ?? 0) },
    { label: 'VoC Depth',             taskId: 'STR-S2',
      fieldIds: ['verbatimPhrases'],
      score: (fd) => { const n = splitLines(fd?.verbatimPhrases).length; return n >= 15 ? 5 : n >= 8 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Content Angles',        taskId: 'STR-AF4',
      fieldIds: ['contentAngle1', 'contentAngle2', 'contentAngle3', 'contentAngle4', 'contentAngle5', 'contentAngle6'],
      score: (fd) => { const n = [1,2,3,4,5,6].filter((i) => !!fd?.[`contentAngle${i}`]?.trim()).length; return n === 6 ? 5 : n >= 4 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Core Belief Defined',   taskId: 'STR-AF1',
      fieldIds: ['beliefStatement'],
      score: (fd) => fd?.beliefStatement?.trim() ? 5 : 0 },
    { label: 'Transformation Arc',    taskId: 'STR-AF2',
      fieldIds: ['beforeState', 'transformation', 'afterState'],
      score: (fd) => { const n = ['beforeState','transformation','afterState'].filter((k) => !!fd?.[k]?.trim()).length; return n === 3 ? 5 : n === 2 ? 3 : n === 1 ? 1 : 0; } },
  ],
  OFR: [
    { label: 'Promise G-Label',       taskId: 'OFR-A1',
      fieldIds: ['promiseGLabel'],
      score: (fd) => ({ G1: 5, G2: 3 }[fd?.promiseGLabel] ?? 0) },
    { label: 'ICP Completeness',      taskId: 'OFR-A2',
      fieldIds: ['demographicProfile', 'psychographicProfile', 'qualificationCriteria', 'disqualificationCriteria'],
      score: (fd) => { const n = ['demographicProfile','psychographicProfile','qualificationCriteria','disqualificationCriteria'].filter((k) => !!fd?.[k]?.trim()).length; return n === 4 ? 5 : n === 3 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Guarantee Rigor',       taskId: 'OFR-A6',
      fieldIds: ['triggerCondition', 'guaranteeScope', 'remedy', 'operatorBoundaries'],
      score: (fd) => { const n = ['triggerCondition','guaranteeScope','remedy','operatorBoundaries'].filter((k) => !!fd?.[k]?.trim()).length; return n === 4 ? 5 : n === 3 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Scope Map',             taskId: 'OFR-A4',
      fieldIds: ['scopeIncluded', 'scopeExcluded'],
      score: (fd) => (!!fd?.scopeIncluded?.trim() && !!fd?.scopeExcluded?.trim()) ? 5 : (!!fd?.scopeIncluded?.trim() || !!fd?.scopeExcluded?.trim()) ? 3 : 0 },
    { label: 'Promise Proof',         taskId: 'OFR-A1',
      fieldIds: ['proofStatus'],
      score: (fd) => ({ verified: 5, pending: 1 }[fd?.proofStatus] ?? 0) },
  ],
  OUT: [
    { label: 'Audience Concern Mapping', taskId: 'OUT-IC',
      fieldIds: ['icOut1'],
      score: (fd) => fd?.icOut1 === 'pass' ? 5 : 0 },
    { label: 'G-Label Compliance',       taskId: 'OUT-IC',
      fieldIds: ['icOut2'],
      score: (fd) => fd?.icOut2 === 'pass' ? 5 : 0 },
    { label: 'Singular CTA',             taskId: 'OUT-IC',
      fieldIds: ['icOut3'],
      score: (fd) => fd?.icOut3 === 'pass' ? 5 : 0 },
    { label: 'Scarcity Verified',        taskId: 'OUT-IC',
      fieldIds: ['icOut4'],
      score: (fd) => fd?.icOut4 === 'pass' ? 5 : 0 },
    { label: 'Readability Check',        taskId: 'OUT-IC',
      fieldIds: ['icOut5'],
      score: (fd) => fd?.icOut5 === 'pass' ? 5 : 0 },
  ],
  SLS: [
    { label: 'Qualification Depth',       taskId: 'SLS-S1',
      fieldIds: ['qualificationQuestions', 'autoDisqualifiers', 'scoringRoutingNotes'],
      score: countNonEmpty('qualificationQuestions', 'autoDisqualifiers', 'scoringRoutingNotes') },
    { label: 'Routing Completeness',      taskId: 'SLS-S2',
      fieldIds: ['routingTable', 'decisionTreeSteps', 'noFitExitPath'],
      score: countNonEmpty('routingTable', 'decisionTreeSteps', 'noFitExitPath') },
    { label: 'Call Script Ready',         taskId: 'SLS-S3',
      fieldIds: ['callStructure', 'verbatimScript', 'branchPrompts'],
      score: countNonEmpty('callStructure', 'verbatimScript', 'branchPrompts') },
    { label: 'Objection Coverage',        taskId: 'SLS-S4',
      fieldIds: ['objectionList'],
      score: (fd) => { const n = splitLines(fd?.objectionList).length; return n >= 10 ? 5 : n >= 5 ? 3 : n >= 1 ? 1 : 0; } },
    { label: 'Asset Assembly',            taskId: 'SLS-A0',
      fieldIds: ['assemblyStatus'],
      score: (fd) => ({ complete: 5, partial: 3, pending: 1 }[fd?.assemblyStatus] ?? 0) },
  ],
  DEL: [
    { label: 'Delivery Phases Mapped',    taskId: 'DEL-S1',
      fieldIds: ['deliveryPhases', 'checkpoints', 'ownerAssignments'],
      score: countNonEmpty('deliveryPhases', 'checkpoints', 'ownerAssignments') },
    { label: 'Quality & Risk Coverage',   taskId: 'DEL-S2',
      fieldIds: ['failureModes', 'qcChecks', 'guaranteeTriggers', 'mitigationSteps'],
      score: countNonEmpty('failureModes', 'qcChecks', 'guaranteeTriggers', 'mitigationSteps') },
    { label: 'Success Milestones',        taskId: 'DEL-S3',
      fieldIds: ['milestoneList', 'successDefinition'],
      score: countNonEmpty('milestoneList', 'successDefinition') },
    { label: 'Proof Capture Plan',        taskId: 'DEL-S4',
      fieldIds: ['proofTypes', 'captureTimeline', 'captureMethod', 'consentLanguage'],
      score: countNonEmpty('proofTypes', 'captureTimeline', 'captureMethod', 'consentLanguage') },
    { label: 'Retention Handoff',         taskId: 'DEL-S5',
      fieldIds: ['handoffNotes', 'retentionSeedMessage', 'nextSteps'],
      score: countNonEmpty('handoffNotes', 'retentionSeedMessage', 'nextSteps') },
  ],
  RET: [
    { label: 'Segment Definitions',       taskId: 'RET-S1',
      fieldIds: ['coldLeadDef', 'pastClientDef', 'reActivationDef', 'warmNonConvertDef'],
      score: countNonEmpty('coldLeadDef', 'pastClientDef', 'reActivationDef', 'warmNonConvertDef') },
    { label: 'Proof Inventory',           taskId: 'RET-S2',
      fieldIds: ['proofAssets', 'segmentRelevance', 'claimStrength'],
      score: countNonEmpty('proofAssets', 'segmentRelevance', 'claimStrength') },
    { label: 'Continuation Map',          taskId: 'RET-S3',
      fieldIds: ['upsellPath', 'ascensionLevels', 'eligibilityRules', 'triggerTiming'],
      score: countNonEmpty('upsellPath', 'ascensionLevels', 'eligibilityRules', 'triggerTiming') },
    { label: 'Message Spine & Tone',      taskId: 'RET-S4',
      fieldIds: ['warmingPosture', 'toneConstraints', 'ctaStandards', 'messageSpines'],
      score: countNonEmpty('warmingPosture', 'toneConstraints', 'ctaStandards', 'messageSpines') },
    { label: 'Deployment Logic',          taskId: 'RET-S5',
      fieldIds: ['proofToSequenceMap', 'channelAssumptions'],
      score: countNonEmpty('proofToSequenceMap', 'channelAssumptions') },
  ],
  OPT: [
    { label: 'Metrics Tracked',           taskId: 'OPT-S1',
      fieldIds: ['cm1OutreachConversion', 'cm2FitToClose', 'cm3MilestoneCompletion', 'cm4UnpromptedReferral'],
      score: countNonEmpty('cm1OutreachConversion', 'cm2FitToClose', 'cm3MilestoneCompletion', 'cm4UnpromptedReferral') },
    { label: 'Weakest Link Identified',   taskId: 'OPT-S2',
      fieldIds: ['weakestLinkStage', 'evidenceSummary', 'suspectedFailureModes'],
      score: countNonEmpty('weakestLinkStage', 'evidenceSummary', 'suspectedFailureModes') },
    { label: 'Root Cause Hypotheses',     taskId: 'OPT-S3',
      fieldIds: ['hypotheses', 'risksAndSideEffects'],
      score: (fd) => fd?.hypotheses?.trim() ? (fd?.risksAndSideEffects?.trim() ? 5 : 3) : 0 },
    { label: 'Optimization Actions',      taskId: 'OPT-S4',
      fieldIds: ['action1', 'action2', 'action3'],
      score: countNonEmpty('action1', 'action2', 'action3') },
    { label: 'Stewardship Score',         taskId: 'OPT-A1',
      fieldIds: ['overallStewardshipScore'],
      score: (fd) => { const s = Number(fd?.overallStewardshipScore); return s >= 80 ? 5 : s >= 60 ? 4 : s >= 40 ? 3 : s >= 20 ? 1 : 0; } },
  ],
};

// Dev-time validation: cross-checks signal fieldIds against task definition fields.
// Logs warnings for any field ID that doesn't exist in the referenced task definition.
if (import.meta.env.DEV) {
  for (const [stage, signals] of Object.entries(STAGE_SCORE_SIGNALS)) {
    for (const sig of signals) {
      const def = getBbosTaskDef(sig.taskId);
      if (!def) {
        console.warn(`[ScoreSignals] Task "${sig.taskId}" referenced by "${sig.label}" (${stage}) does not exist`);
        continue;
      }
      const defFieldIds = new Set(def.fields.map((f) => f.id));
      for (const fid of (sig.fieldIds || [])) {
        if (!defFieldIds.has(fid)) {
          console.warn(`[ScoreSignals] Field "${fid}" referenced by "${sig.label}" (${stage}) not found in ${sig.taskId} fields`);
        }
      }
    }
  }
}

// ── Sub-renderers ─────────────────────────────────────────────────────────────

// CategoryGridRenderer — CRD-AF1
function CategoryGridRenderer({ fieldData }) {
  const categories = splitLines(fieldData.matchedCategories).slice(0, 4);
  const rationales = splitLines(fieldData.matchRationale);
  return (
    <div className="bfd__cat-grid">
      {categories.length > 0 ? categories.map((cat, i) => (
        <div key={i} className={`bfd__cat-item ${i === 0 ? 'bfd__cat-item--primary' : ''}`}>
          <span className="bfd__cat-item-num">{String(i + 1).padStart(2, '0')}</span>
          <div className="bfd__cat-item-body">
            <div className="bfd__cat-item-name">{truncate(cat, 70)}</div>
            {rationales[i] && <div className="bfd__cat-item-rationale">{truncate(rationales[i], 90)}</div>}
          </div>
        </div>
      )) : <span className="bfd__field-empty">—</span>}
    </div>
  );
}

// CandidateTableRenderer — CRD-AF2
function parseCandidateLine(line) {
  const match = line.match(/^(.+?)[\s:—-]+(\d+(?:\.\d+)?)\s*(.*)$/);
  if (match) return { name: match[1].trim(), score: parseFloat(match[2]), note: match[3].trim() };
  return { name: line.trim(), score: null, note: '' };
}

function CandidateTableRenderer({ fieldData }) {
  const candidates = splitLines(fieldData.scoredCandidates).slice(0, 6);
  const velocityLines = splitLines(fieldData.marketVelocityScores);
  const strategicLines = splitLines(fieldData.strategicScores);
  if (candidates.length === 0) return <span className="bfd__field-empty">—</span>;
  return (
    <div className="bfd__cand-table">
      <div className="bfd__cand-head">
        <span>Candidate</span>
        <span>Mkt Vel.</span>
        <span>Strategic</span>
      </div>
      {candidates.map((line, i) => {
        const parsed = parseCandidateLine(line);
        const vel = parseFloat(velocityLines[i]) || (parsed.score ?? null);
        const strat = parseFloat(strategicLines[i]) || (parsed.score ?? null);
        return (
          <div key={i} className="bfd__cand-row">
            <span className="bfd__cand-name">{truncate(parsed.name, 36)}</span>
            <span className="bfd__cand-score">{vel != null ? vel : '—'}</span>
            <span className="bfd__cand-score">{strat != null ? strat : '—'}</span>
          </div>
        );
      })}
    </div>
  );
}

// Matrix2x2Renderer — CRD-AF3, OFR-A2
function Matrix2x2Renderer({ quadrants }) {
  return (
    <div className="bfd__matrix">
      {quadrants.map((q, i) => (
        <div key={i} className={`bfd__matrix-cell ${q.accent ? 'bfd__matrix-cell--accent' : ''}`}>
          <div className="bfd__matrix-cell-label">{q.label}</div>
          <div className="bfd__matrix-cell-content">
            {q.content || <span className="bfd__field-empty">—</span>}
          </div>
        </div>
      ))}
    </div>
  );
}

// GateChecksRenderer — CRD-V1, STR-V1, OUT-IC
function GateChecksRenderer({ checks, overallValue, overallLabel }) {
  const passCount = checks.filter((c) => c.value === 'pass').length;
  const allPending = checks.every((c) => !c.value);
  const verdict = allPending ? 'PENDING' : passCount === checks.length ? 'CLEARED' : checks.some((c) => c.value === 'fail') ? 'BLOCKED' : 'PARTIAL';
  const verdictColor = { CLEARED: 'var(--col-done)', BLOCKED: 'var(--pri-urgent)', PARTIAL: 'var(--pri-high)', PENDING: 'var(--text3)' }[verdict];
  return (
    <div className="bfd__gate-checks">
      <div className="bfd__gate-summary" style={{ color: verdictColor }}>
        <span className="bfd__gate-verdict">{overallLabel || verdict}</span>
        <span className="bfd__gate-count">{passCount}/{checks.length} passed</span>
      </div>
      {checks.map((check, i) => {
        const isPass = check.value === 'pass';
        const isFail = check.value === 'fail';
        const isCond = check.value === 'conditional';
        return (
          <div key={i} className={`bfd__gate-check bfd__gate-check--${check.value || 'pending'}`}>
            <span className="bfd__gate-check-icon">
              {isPass ? <CheckCircle size={14} style={{ color: 'var(--col-done)' }} />
               : isFail ? <XCircle size={14} style={{ color: 'var(--pri-urgent)' }} />
               : isCond ? <AlertTriangle size={14} style={{ color: 'var(--pri-high)' }} />
               : <span className="bfd__gate-pending-dot" />}
            </span>
            <span className="bfd__gate-check-label">{check.label}</span>
            <span className={`bfd__gate-check-badge bfd__gate-check-badge--${check.value || 'pending'}`}>
              {isPass ? 'PASS' : isFail ? 'FAIL' : isCond ? 'COND' : '—'}
            </span>
          </div>
        );
      })}
      {overallValue && (
        <div className="bfd__gate-overall">
          <span className="bfd__gate-overall-label">Overall</span>
          <span className="bfd__gate-overall-value">{overallLabel || overallValue.toUpperCase()}</span>
        </div>
      )}
    </div>
  );
}

// ProofAuditRenderer — CRD-AF5
function ProofAuditRenderer({ fieldData }) {
  const claims = splitLines(fieldData.auditedClaims).slice(0, 5);
  const ratings = splitLines(fieldData.claimStrengthRatings);
  const conclusion = fieldData.auditConclusion || '';
  return (
    <div className="bfd__proof-audit">
      {claims.length > 0 && (
        <div className="bfd__audit-list">
          {claims.map((claim, i) => (
            <div key={i} className="bfd__audit-item">
              <span className="bfd__audit-num">{String(i + 1).padStart(2, '0')}</span>
              <div className="bfd__audit-body">
                <div className="bfd__audit-claim">{truncate(claim, 90)}</div>
                {ratings[i] && (
                  <div className="bfd__audit-rating">
                    {ratingToStars(ratings[i]) !== null
                      ? <>{renderStars(ratingToStars(ratings[i]))}<span className="bfd__audit-rating-label">{ratings[i].split('—')[0].trim()}</span></>
                      : truncate(ratings[i], 70)}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
      {conclusion && (
        <div className="bfd__audit-conclusion">
          <div className="bfd__audit-conclusion-label">Audit Conclusion</div>
          <p>{truncate(conclusion, 200)}</p>
        </div>
      )}
      {claims.length === 0 && !conclusion && <span className="bfd__field-empty">—</span>}
    </div>
  );
}

// TransformationArcRenderer — STR-AF2
function TransformationArcRenderer({ fieldData }) {
  const steps = [
    { label: 'Before', content: fieldData.beforeState, cls: 'bfd__arc-step--before' },
    { label: 'Transformation', content: fieldData.transformation, cls: 'bfd__arc-step--mid' },
    { label: 'After', content: fieldData.afterState, cls: 'bfd__arc-step--after' },
  ];
  return (
    <div className="bfd__arc">
      {steps.map((step, i) => (
        <Fragment key={i}>
          <div className={`bfd__arc-step ${step.cls}`}>
            <div className="bfd__arc-step-label">{step.label}</div>
            <div className="bfd__arc-step-content">
              {step.content ? truncate(step.content, 150) : <span className="bfd__field-empty">—</span>}
            </div>
          </div>
          {i < steps.length - 1 && <div className="bfd__arc-connector">↓</div>}
        </Fragment>
      ))}
    </div>
  );
}

// ContentGridRenderer — STR-AF4
function ContentGridRenderer({ fieldData }) {
  const angles = [1, 2, 3, 4, 5, 6]
    .map((n) => ({ n, text: fieldData[`contentAngle${n}`] }))
    .filter((a) => a.text);
  if (angles.length === 0) return <span className="bfd__field-empty">—</span>;
  return (
    <div className="bfd__content-grid">
      {angles.map(({ n, text }) => (
        <div key={n} className="bfd__content-angle">
          <div className="bfd__content-angle-num">Angle {n}</div>
          <div className="bfd__content-angle-text">{truncate(text, 100)}</div>
        </div>
      ))}
    </div>
  );
}

// VerdictBadgeRenderer — IDY-S4, STR-V1
function VerdictBadgeRenderer({ verdict, color, basisLabel, basisContent }) {
  return (
    <div className="bfd__verdict-wrap">
      <div
        className="bfd__verdict-badge"
        style={{ color, borderColor: color, background: `color-mix(in srgb, ${color} 10%, transparent)` }}
      >
        <div className="bfd__verdict-badge-label">Status</div>
        <div className="bfd__verdict-badge-value">{verdict}</div>
      </div>
      {basisContent && (
        <div className="bfd__verdict-basis">
          <div className="bfd__verdict-basis-label">{basisLabel || 'Basis'}</div>
          <p className="bfd__verdict-basis-text">{truncate(basisContent, 200)}</p>
        </div>
      )}
      {!basisContent && <span className="bfd__verdict-empty">No basis recorded.</span>}
    </div>
  );
}

// TimelineRenderer — OUT-A4, DEL-S3
function TimelineRenderer({ steps, subItems, exitNote, exitLabel }) {
  if (steps.length === 0) return <span className="bfd__field-empty">—</span>;
  return (
    <div className="bfd__timeline">
      {steps.map((step, i) => (
        <div key={i} className="bfd__timeline-step">
          <div className="bfd__timeline-marker">
            <span className="bfd__timeline-dot" />
            {i < steps.length - 1 && <span className="bfd__timeline-line" />}
          </div>
          <div className="bfd__timeline-body">
            <span className="bfd__timeline-touch">{subItems?.[i] ?? `Step ${i + 1}`}</span>
            <span className="bfd__timeline-text">{truncate(step, 110)}</span>
          </div>
        </div>
      ))}
      {exitNote && (
        <div className="bfd__timeline-exit">
          <div className="bfd__timeline-exit-label">{exitLabel || 'Exit / Definition'}</div>
          <p>{truncate(exitNote, 130)}</p>
        </div>
      )}
    </div>
  );
}

// SegmentListRenderer — SLS-A3
function SegmentListRenderer({ fieldData }) {
  const SEGS = ['HOT', 'WARM', 'COLD'];
  const criteriaLines = splitLines(fieldData.criteriaDefinitions).slice(0, 3);
  const treeSteps = splitLines(fieldData.treeSteps).slice(0, 5);
  return (
    <div className="bfd__segment-wrap">
      {criteriaLines.length > 0 ? (
        <div className="bfd__segment-list">
          {criteriaLines.map((line, i) => (
            <div key={i} className={`bfd__segment bfd__segment--${(SEGS[i] || 'cold').toLowerCase()}`}>
              <span className="bfd__segment-badge">{SEGS[i] || `SEG ${i + 1}`}</span>
              <span className="bfd__segment-text">{truncate(line, 100)}</span>
            </div>
          ))}
        </div>
      ) : (
        <span className="bfd__field-empty">No criteria defined.</span>
      )}
      {treeSteps.length > 0 && (
        <div className="bfd__tree-steps">
          {treeSteps.map((step, i) => (
            <div key={i} className="bfd__tree-step">
              <span className="bfd__tree-arrow">→</span>
              <span>{truncate(step, 90)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// MetricBarRenderer — for tasks with numeric metric fields (OPT-S1, OPT-A1)
function MetricBarRenderer({ metrics }) {
  return (
    <div className="bfd__metrics">
      {metrics.map((m, i) => {
        const pct = Math.min(100, Math.max(0, (m.value / m.max) * 100));
        return (
          <div key={i} className="bfd__metric">
            <div className="bfd__metric-head">
              <span className="bfd__metric-label">{m.label}</span>
              <span className="bfd__metric-value">{m.value ?? '—'}{m.unit || ''}</span>
            </div>
            <div className="bfd__metric-track">
              <div
                className="bfd__metric-fill"
                style={{ width: `${pct}%`, background: pct >= 75 ? 'var(--col-done)' : pct >= 40 ? 'var(--pri-high)' : 'var(--pri-urgent)' }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ScopeMapRenderer — for tasks with included/excluded/triggers (OFR-A4)
function ScopeMapRenderer({ included, excluded, footer, footerLabel }) {
  return (
    <div className="bfd__scope">
      <div className="bfd__scope-cols">
        <div className="bfd__scope-col bfd__scope-col--in">
          <div className="bfd__scope-head">✓ Included</div>
          <p className="bfd__scope-body">{included ? truncate(included, 200) : '—'}</p>
        </div>
        <div className="bfd__scope-col bfd__scope-col--out">
          <div className="bfd__scope-head">✗ Excluded</div>
          <p className="bfd__scope-body">{excluded ? truncate(excluded, 200) : '—'}</p>
        </div>
      </div>
      {footer && (
        <div className="bfd__scope-footer">
          <span className="bfd__scope-footer-label">{footerLabel || 'Note'}</span>
          <span>{truncate(footer, 160)}</span>
        </div>
      )}
    </div>
  );
}

// DualColumnRenderer — paired textareas side by side (objections+responses, scripts, etc.)
function DualColumnRenderer({ left, right, footer, footerLabel }) {
  return (
    <div className="bfd__dual">
      <div className="bfd__dual-cols">
        <div className="bfd__dual-col">
          <div className="bfd__dual-head">{left.label}</div>
          <p className="bfd__dual-body">{left.content ? truncate(left.content, 220) : '—'}</p>
        </div>
        <div className="bfd__dual-col">
          <div className="bfd__dual-head">{right.label}</div>
          <p className="bfd__dual-body">{right.content ? truncate(right.content, 220) : '—'}</p>
        </div>
      </div>
      {footer && (
        <div className="bfd__dual-footer">
          <span className="bfd__dual-footer-label">{footerLabel || 'Note'}</span>
          <span>{truncate(footer, 160)}</span>
        </div>
      )}
    </div>
  );
}

// StepPanelRenderer — vertical cards with step indicators for sequential/phased content
function StepPanelRenderer({ steps }) {
  return (
    <div className="bfd__steps">
      {steps.map((step, i) => (
        <div key={i} className="bfd__step">
          <div className="bfd__step-marker">{i + 1}</div>
          <div className="bfd__step-content">
            <div className="bfd__step-label">{step.label}</div>
            {step.content ? (
              <p className="bfd__step-body">{truncate(step.content, 180)}</p>
            ) : (
              <span className="bfd__field-empty">—</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// ── TASK_RENDERERS registry ───────────────────────────────────────────────────

const TASK_RENDERERS = {
  'CRD-AF1': ({ fieldData }) => <CategoryGridRenderer fieldData={fieldData} />,

  'CRD-AF2': ({ fieldData }) => <CandidateTableRenderer fieldData={fieldData} />,

  'CRD-AF3': ({ fieldData }) => {
    const lines = splitLines(fieldData.topCandidateRanking);
    const clean = lines.map((l) => l.replace(/^\d+[.)]\s*/, '').trim());
    const quadrants = [
      { label: 'High Revenue · High Ease',  content: clean.slice(0, 2).join('\n') || null, accent: true },
      { label: 'High Revenue · Low Ease',   content: clean[2] || null },
      { label: 'Low Revenue · High Ease',   content: clean[3] || null },
      { label: 'Low Revenue · Low Ease',    content: clean[4] || null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  'CRD-AF5': ({ fieldData }) => <ProofAuditRenderer fieldData={fieldData} />,

  'CRD-V1': ({ fieldData }) => {
    const checks = [
      { label: 'Gate A — Regulatory Clearance',   value: fieldData.gateARegulatory },
      { label: 'Gate B — Addressable Market Fit',  value: fieldData.gateBMarketFit },
      { label: 'Gate C — Competence Proof',        value: fieldData.gateCCompetenceProof },
      { label: 'Gate D — Proven Demand',           value: fieldData.gateDProvenDemand },
    ];
    const viabilityLabels = { viable: 'VIABLE', conditionallyViable: 'CONDITIONAL', removed: 'REMOVED' };
    return (
      <GateChecksRenderer
        checks={checks}
        overallValue={fieldData.overallViability}
        overallLabel={viabilityLabels[fieldData.overallViability]}
      />
    );
  },

  'STR-AF2': ({ fieldData }) => <TransformationArcRenderer fieldData={fieldData} />,

  'STR-AF4': ({ fieldData }) => <ContentGridRenderer fieldData={fieldData} />,

  'STR-V1': ({ fieldData }) => {
    const verdictMap = { pass: 'CLEARED', conditionalPass: 'CONDITIONAL', fail: 'BLOCKED' };
    const verdict = verdictMap[fieldData.integrityVerdict] || 'PENDING';
    const colorMap = {
      CLEARED:     'var(--col-done)',
      CONDITIONAL: 'var(--pri-high)',
      BLOCKED:     'var(--pri-urgent)',
      PENDING:     'var(--text3)',
    };
    return (
      <VerdictBadgeRenderer
        verdict={verdict}
        color={colorMap[verdict]}
        basisLabel="Integrity Assessment"
        basisContent={fieldData.integrityAssessment}
      />
    );
  },

  'OFR-A2': ({ fieldData }) => {
    const quadrants = [
      { label: 'Demographic Profile',    content: fieldData.demographicProfile    ? truncate(fieldData.demographicProfile, 130)    : null },
      { label: 'Psychographic Profile',  content: fieldData.psychographicProfile  ? truncate(fieldData.psychographicProfile, 130)  : null },
      { label: 'Qualifies When',         content: fieldData.qualificationCriteria ? truncate(fieldData.qualificationCriteria, 130) : null, accent: true },
      { label: 'Disqualified When',      content: fieldData.disqualificationCriteria ? truncate(fieldData.disqualificationCriteria, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  'OUT-A4': ({ fieldData }) => {
    const steps = splitLines(fieldData.sequenceMap).slice(0, 8);
    const touches = steps.map((_, i) => `Touch ${i + 1}`);
    return <TimelineRenderer steps={steps} subItems={touches} exitNote={fieldData.exitCriteria} exitLabel="Exit Criteria" />;
  },

  'OUT-IC': ({ fieldData }) => {
    const checks = [
      { label: 'Audience Concern Mapping', value: fieldData.icOut1 },
      { label: 'G-Label Compliance',       value: fieldData.icOut2 },
      { label: 'Singular CTA',             value: fieldData.icOut3 },
      { label: 'Scarcity Verified',        value: fieldData.icOut4 },
      { label: 'Readability Check',        value: fieldData.icOut5 },
    ];
    return <GateChecksRenderer checks={checks} />;
  },

  'SLS-A3': ({ fieldData }) => <SegmentListRenderer fieldData={fieldData} />,

  'IDY-S4': ({ fieldData }) => {
    const verdictMap = { proceed: 'PROCEED', incomplete: 'INCOMPLETE', reject: 'REJECT' };
    const verdict = verdictMap[fieldData.routingDecision] || 'PENDING';
    const colorMap = {
      PROCEED:    'var(--col-done)',
      INCOMPLETE: 'var(--pri-high)',
      REJECT:     'var(--pri-urgent)',
      PENDING:    'var(--text3)',
    };
    return (
      <VerdictBadgeRenderer
        verdict={verdict}
        color={colorMap[verdict]}
        basisLabel="Routing Basis"
        basisContent={fieldData.routingBasis}
      />
    );
  },

  'DEL-S3': ({ fieldData }) => {
    const steps = splitLines(fieldData.milestoneList).slice(0, 5);
    const labels = steps.map((_, i) => `Milestone ${i + 1}`);
    return (
      <TimelineRenderer
        steps={steps}
        subItems={labels}
        exitNote={fieldData.successDefinition}
        exitLabel="Success Definition"
      />
    );
  },

  // ── Phase 2 additions (14 new renderers) ──────────────────────────────────

  // VerdictBadge — IDY-S3: Gap Check
  'IDY-S3': ({ fieldData }) => {
    const verdictMap = { none: 'NO GAPS', minor: 'MINOR', major: 'MAJOR', disqualifying: 'DISQUALIFYING' };
    const verdict = verdictMap[fieldData.gapSeverity] || 'PENDING';
    const colorMap = {
      'NO GAPS':        'var(--col-done)',
      MINOR:            'var(--pri-high)',
      MAJOR:            'var(--pri-urgent)',
      DISQUALIFYING:    'var(--pri-urgent)',
      PENDING:          'var(--text3)',
    };
    return <VerdictBadgeRenderer verdict={verdict} color={colorMap[verdict]} basisLabel="Resolution Actions" basisContent={fieldData.resolutionActions} />;
  },

  // VerdictBadge — CRD-S3: Integrity Proof Audit
  'CRD-S3': ({ fieldData }) => {
    const verdictMap = { strong: 'STRONG', moderate: 'MODERATE', weak: 'WEAK', insufficient: 'INSUFFICIENT' };
    const verdict = verdictMap[fieldData.overallProofStrength] || 'PENDING';
    const colorMap = {
      STRONG:       'var(--col-done)',
      MODERATE:     'var(--pri-high)',
      WEAK:         'var(--pri-urgent)',
      INSUFFICIENT: 'var(--pri-urgent)',
      PENDING:      'var(--text3)',
    };
    return <VerdictBadgeRenderer verdict={verdict} color={colorMap[verdict]} basisLabel="Reliability Assessment" basisContent={fieldData.reliabilityAssessment} />;
  },

  // VerdictBadge — CRD-S6: Regulatory Baseline
  'CRD-S6': ({ fieldData }) => {
    const verdictMap = { clear: 'CLEAR', pending: 'PENDING', hardStop: 'HARD STOP' };
    const verdict = verdictMap[fieldData.regulatoryStatus] || 'UNSET';
    const colorMap = {
      CLEAR:       'var(--col-done)',
      PENDING:     'var(--pri-high)',
      'HARD STOP': 'var(--pri-urgent)',
      UNSET:       'var(--text3)',
    };
    return <VerdictBadgeRenderer verdict={verdict} color={colorMap[verdict]} basisLabel="Operational Standards" basisContent={fieldData.operationalStandards} />;
  },

  // VerdictBadge — OFR-A1: The Promise (G1/G2)
  'OFR-A1': ({ fieldData }) => {
    const gLabel = fieldData.promiseGLabel || null;
    const verdict = gLabel || 'UNSET';
    const colorMap = { G1: 'var(--col-done)', G2: 'var(--pri-high)', UNSET: 'var(--text3)' };
    return <VerdictBadgeRenderer verdict={verdict} color={colorMap[verdict]} basisLabel="Promise Statement" basisContent={fieldData.promiseStatement} />;
  },

  // VerdictBadge — SLS-A0: Sales Asset Pack Assembly
  'SLS-A0': ({ fieldData }) => {
    const verdictMap = { complete: 'COMPLETE', partial: 'PARTIAL', blocked: 'BLOCKED' };
    const verdict = verdictMap[fieldData.assemblyStatus] || 'PENDING';
    const colorMap = {
      COMPLETE: 'var(--col-done)',
      PARTIAL:  'var(--pri-high)',
      BLOCKED:  'var(--pri-urgent)',
      PENDING:  'var(--text3)',
    };
    return <VerdictBadgeRenderer verdict={verdict} color={colorMap[verdict]} basisLabel="NO-SHIP List" basisContent={fieldData.noShipList} />;
  },

  // GateChecks — CRD-FP02: Amanah Intake Screening Rubric (10 questions)
  'CRD-FP02': ({ fieldData }) => {
    // Q3, Q5, Q8 are auto-disqualifiers (★) — reversed polarity (yes = fail)
    const normalQ = (v) => v === 'yes' ? 'pass' : v === 'no' ? 'fail' : undefined;
    const invertQ = (v) => v === 'no' ? 'pass' : v === 'yes' ? 'fail' : undefined;
    const checks = [
      { label: 'Q1 — Verifiable proof',         value: normalQ(fieldData.q1ProofVerifiable) },
      { label: 'Q2 — Regulatory verifiable',     value: normalQ(fieldData.q2RegulatoryVerifiable) },
      { label: 'Q3 ★ Unverifiable claims',       value: invertQ(fieldData.q3UnverifiableClaims) },
      { label: 'Q4 — Runway sufficient',         value: normalQ(fieldData.q4RunwaySufficient) },
      { label: 'Q5 ★ Regulatory misuse',         value: invertQ(fieldData.q5RegulatoryMisuse) },
      { label: 'Q6 — Goal alignment',            value: normalQ(fieldData.q6GoalAlignment) },
      { label: 'Q7 — Energy aversion',           value: normalQ(fieldData.q7EnergyAversion) },
      { label: 'Q8 ★ False information',          value: invertQ(fieldData.q8FalseInformation) },
      { label: 'Q9 — Scope understanding',       value: normalQ(fieldData.q9ScopeUnderstanding) },
      { label: 'Q10 — Capacity realistic',       value: normalQ(fieldData.q10CapacityRealistic) },
    ];
    const verdictMap = { proceed: 'pass', escalate: 'conditional', reject: 'fail' };
    return (
      <GateChecksRenderer
        checks={checks}
        overallValue={verdictMap[fieldData.rubricRouting]}
        overallLabel={fieldData.rubricRouting ? fieldData.rubricRouting.toUpperCase() : undefined}
      />
    );
  },

  // Matrix2x2 — OFR-A6: Risk Reversal (Guarantee)
  'OFR-A6': ({ fieldData }) => {
    const quadrants = [
      { label: 'Trigger Condition',     content: fieldData.triggerCondition ? truncate(fieldData.triggerCondition, 130) : null, accent: true },
      { label: 'Guarantee Scope',       content: fieldData.guaranteeScope ? truncate(fieldData.guaranteeScope, 130) : null },
      { label: 'Remedy',                content: fieldData.remedy ? truncate(fieldData.remedy, 130) : null },
      { label: 'Operator Boundaries',   content: fieldData.operatorBoundaries ? truncate(fieldData.operatorBoundaries, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  // Matrix2x2 — DEL-S2: Quality & Risk Map
  'DEL-S2': ({ fieldData }) => {
    const quadrants = [
      { label: 'Failure Modes',       content: fieldData.failureModes ? truncate(fieldData.failureModes, 130) : null, accent: true },
      { label: 'QC Checks',           content: fieldData.qcChecks ? truncate(fieldData.qcChecks, 130) : null },
      { label: 'Guarantee Triggers',  content: fieldData.guaranteeTriggers ? truncate(fieldData.guaranteeTriggers, 130) : null },
      { label: 'Mitigation Steps',    content: fieldData.mitigationSteps ? truncate(fieldData.mitigationSteps, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  // Matrix2x2 — RET-S1: Segment Map
  'RET-S1': ({ fieldData }) => {
    const quadrants = [
      { label: 'Cold Lead',          content: fieldData.coldLeadDef ? truncate(fieldData.coldLeadDef, 130) : null },
      { label: 'Past Client',        content: fieldData.pastClientDef ? truncate(fieldData.pastClientDef, 130) : null, accent: true },
      { label: 'Re-Activation (60d)', content: fieldData.reActivationDef ? truncate(fieldData.reActivationDef, 130) : null },
      { label: 'Warm Non-Convert',   content: fieldData.warmNonConvertDef ? truncate(fieldData.warmNonConvertDef, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  // Timeline — DEL-S1: Offer-to-Delivery Map
  'DEL-S1': ({ fieldData }) => {
    const steps = splitLines(fieldData.deliveryPhases).slice(0, 6);
    const labels = steps.map((_, i) => `Phase ${i + 1}`);
    return <TimelineRenderer steps={steps} subItems={labels} exitNote={fieldData.timingConstraints} exitLabel="Timing" />;
  },

  // Timeline — DEL-S4: Proof Capture Plan
  'DEL-S4': ({ fieldData }) => {
    const steps = splitLines(fieldData.proofTypes).slice(0, 5);
    const labels = steps.map((_, i) => `Proof ${i + 1}`);
    return <TimelineRenderer steps={steps} subItems={labels} exitNote={fieldData.captureTimeline} exitLabel="Capture Timeline" />;
  },

  // ScopeMap — OFR-A4: Scope Map
  'OFR-A4': ({ fieldData }) => (
    <ScopeMapRenderer
      included={fieldData.scopeIncluded}
      excluded={fieldData.scopeExcluded}
      footer={fieldData.changeOrderTriggers}
      footerLabel="Change-Order Triggers"
    />
  ),

  // MetricBar — OPT-S1: Metric Dashboard
  'OPT-S1': ({ fieldData }) => (
    <MetricBarRenderer metrics={[
      { label: 'CM-1 Outreach Conversion', value: Number(fieldData.cm1OutreachConversion) || 0, max: 100, unit: '%' },
      { label: 'CM-2 Fit-to-Close',        value: Number(fieldData.cm2FitToClose) || 0, max: 100, unit: '%' },
      { label: 'CM-3 Milestone Completion', value: Number(fieldData.cm3MilestoneCompletion) || 0, max: 100, unit: '%' },
      { label: 'CM-4 Unprompted Referral',  value: Number(fieldData.cm4UnpromptedReferral) || 0, max: 100, unit: '%' },
    ]} />
  ),

  // MetricBar — OPT-A1: Stewardship Score
  'OPT-A1': ({ fieldData }) => (
    <MetricBarRenderer metrics={[
      { label: 'System Vitality',    value: Number(fieldData.systemVitality) || 0, max: 10 },
      { label: 'Ethical Integrity',  value: Number(fieldData.ethicalIntegrity) || 0, max: 10 },
      { label: 'Time Sovereignty',   value: Number(fieldData.timeSovereignty) || 0, max: 10 },
      { label: 'Trust vs. Scarcity', value: Number(fieldData.trustVsScarcity) || 0, max: 10 },
      { label: 'Asset Clarity',      value: Number(fieldData.assetClarity) || 0, max: 10 },
    ]} />
  ),

  // ── SLS/OUT expansion (11 new renderers) ──────────────────────────────────

  // DualColumn — OUT-S4: Objection Intelligence
  'OUT-S4': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Common Objections', content: fieldData.commonObjections }}
      right={{ label: 'Response Framework', content: fieldData.objectionResponses }}
    />
  ),

  // DualColumn — OUT-A5: Appointment Setter & No-Fit Scripts
  'OUT-A5': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Appointment Setter', content: fieldData.appointmentSetterScript }}
      right={{ label: 'No-Fit Script', content: fieldData.noFitScript }}
      footer={fieldData.noFitRedirectOptions}
      footerLabel="Redirect Options"
    />
  ),

  // DualColumn — OUT-A6: Objection Handling Matrix
  'OUT-A6': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Objection Matrix', content: fieldData.objectionMatrix }}
      right={{ label: 'Response Guidelines', content: fieldData.responseGuidelines }}
    />
  ),

  // DualColumn — SLS-A5: Objection Library
  'SLS-A5': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Objection Library (Top 10)', content: fieldData.objections }}
      right={{ label: 'Proof Asset References', content: fieldData.proofAssetReferences }}
    />
  ),

  // DualColumn — SLS-S5: Pre-Call Nurture
  'SLS-S5': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Nurture Messages (3-5)', content: fieldData.nurtureMessages }}
      right={{ label: 'Proof Asset Mapping', content: fieldData.proofAssetMapping }}
    />
  ),

  // StepPanel — SLS-S3: Fit Call Script Deep-Dive
  'SLS-S3': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Call Structure (15 min)', content: fieldData.callStructure },
      { label: 'Verbatim Script Blocks', content: fieldData.verbatimScript },
      { label: 'Branch Prompts (Hot/Warm/Cold)', content: fieldData.branchPrompts },
    ]} />
  ),

  // StepPanel — SLS-S6: Show-Rate Reminders
  'SLS-S6': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: '24-Hour Reminder', content: fieldData.reminder24hr },
      { label: '1-Hour Reminder', content: fieldData.reminder1hr },
      { label: 'No-Show Follow-Up', content: fieldData.noShowFollowUp },
    ]} />
  ),

  // StepPanel — SLS-S7: Post-Call Follow-Up (Non-Closes)
  'SLS-S7': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Follow-Up Sequence (7-14 days)', content: fieldData.followUpSequence },
      { label: 'Stop Triggers', content: fieldData.stopTriggers },
      { label: 'Graceful Close', content: fieldData.gracefulClose },
    ]} />
  ),

  // StepPanel — SLS-A4: Fit Call Script (Asset)
  'SLS-A4': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Minute-by-Minute (0-15)', content: fieldData.minuteByMinute },
      { label: 'Verbatim Script Blocks', content: fieldData.verbatimBlocks },
      { label: 'Branch Prompts (Hot/Warm/Cold)', content: fieldData.branchPromptsAsset },
    ]} />
  ),

  // StepPanel — SLS-A6: Nurture + Reminders + Follow-Up
  'SLS-A6': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Pre-Call Nurture (3-5 Messages)', content: fieldData.preCallNurture },
      { label: 'Show-Rate Reminders', content: fieldData.showRateReminders },
      { label: 'Post-Call Follow-Up (7-14 Days)', content: fieldData.postCallFollowUp },
      { label: 'Stop & Escalation', content: fieldData.stopAndEscalation },
    ]} />
  ),

  // StepPanel — OUT-A7: Content-to-DM Pipeline Map
  'OUT-A7': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Content Assets', content: fieldData.contentAssets },
      { label: 'Pipeline Sequence', content: fieldData.pipelineSequence },
      { label: 'Conversion Path', content: fieldData.conversionPath },
    ]} />
  ),

  // ── DEL/RET/OPT expansion (Tier 3) ─────────────────────────────────────────

  // DualColumn — OUT-A2: Hook Library
  'OUT-A2': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Hooks by Platform', content: fieldData.hooksByPlatform }}
      right={{ label: 'Hooks by Persona', content: fieldData.hooksByPersona }}
      footer={fieldData.hookComplianceNotes}
      footerLabel="Compliance Notes"
    />
  ),

  // StepPanel — OUT-A3: DM Conversation Scripts
  'OUT-A3': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Initial Connection Messages', content: fieldData.initialMessages },
      { label: 'Value Frames', content: fieldData.valueFrames },
      { label: 'Scope Map Alignment Check', content: fieldData.scopeAlignment },
    ]} />
  ),

  // StepPanel — OUT-S1: Channel Selection
  'OUT-S1': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Primary Outreach Channels', content: fieldData.primaryChannels },
      { label: 'Secondary Channels', content: fieldData.secondaryChannels },
      { label: 'Selection Rationale', content: fieldData.channelRationale },
    ]} />
  ),

  // StepPanel — OUT-S2: Lead Segments
  'OUT-S2': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Lead Sources', content: fieldData.leadSources },
      { label: 'Segment Definitions', content: fieldData.segmentDefinitions },
      { label: 'Qualification Filters', content: fieldData.qualificationFilters },
    ]} />
  ),

  // StepPanel — OUT-S3: Language & Trigger Mapping
  'OUT-S3': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Language Patterns', content: fieldData.languagePatterns },
      { label: 'Emotional Triggers', content: fieldData.emotionalTriggers },
      { label: 'Value Proposition Signals', content: fieldData.valuePropositionSignals },
    ]} />
  ),

  // StepPanel — OUT-S5: Capacity Constraints
  'OUT-S5': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Outreach Bandwidth', content: fieldData.outreachBandwidth },
      { label: 'Tool Proficiency', content: fieldData.toolProficiency },
      { label: 'Communication Constraints', content: fieldData.communicationConstraints },
    ]} />
  ),

  // StepPanel — OUT-A1: Channel Strategy Asset
  'OUT-A1': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Channel Strategy', content: fieldData.channelStrategy },
      { label: 'Ideal Prospect Profile (IPP)', content: fieldData.idealProspectProfile },
      { label: 'Qualification Filters', content: fieldData.qualificationFiltersAsset },
    ]} />
  ),

  // StepPanel — SLS-S0: Sales Research Intake
  'SLS-S0': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Lead States', content: fieldData.leadStates },
      { label: 'Qualification Criteria Draft', content: fieldData.qualificationCriteriaDraft },
      { label: 'Objections Seed List', content: fieldData.objectionsSeedList },
      { label: 'Nurture Proof Assets', content: fieldData.nurtureProofAssets },
    ]} />
  ),

  // StepPanel — SLS-S1: Qualification Questions
  'SLS-S1': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Qualification Questions (8-10)', content: fieldData.qualificationQuestions },
      { label: 'Automatic Disqualifiers (3)', content: fieldData.autoDisqualifiers },
      { label: 'Scoring & Routing Notes', content: fieldData.scoringRoutingNotes },
    ]} />
  ),

  // StepPanel — SLS-S2: Routing & Decision Tree
  'SLS-S2': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Routing Table', content: fieldData.routingTable },
      { label: 'Decision Tree Steps', content: fieldData.decisionTreeSteps },
      { label: 'No-Fit Exit Path', content: fieldData.noFitExitPath },
      { label: 'Waitlist / Education Path', content: fieldData.waitlistPath },
    ]} />
  ),

  // StepPanel — SLS-S4: Objection Research
  'SLS-S4': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Top 10 Objections', content: fieldData.objectionList },
      { label: 'Best Responses', content: fieldData.bestResponses },
      { label: 'Next Question to Ask', content: fieldData.nextQuestions },
    ]} />
  ),

  // StepPanel — SLS-A1: Qualification Form Asset
  'SLS-A1': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Form Introduction', content: fieldData.formIntro },
      { label: 'Questions (Q1-Q10)', content: fieldData.questions },
      { label: 'Auto-Disqualifiers (3)', content: fieldData.autoDisqualifiersTemplate },
      { label: 'Scoring & Routing Logic', content: fieldData.scoringRouting },
      { label: 'Next-Step Messages (Hot/Warm/Cold)', content: fieldData.nextStepMessages },
    ]} />
  ),

  // StepPanel — SLS-A2: Routing Automation Flow
  'SLS-A2': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Flow Triggers', content: fieldData.triggers },
      { label: 'Flow Map (Step-by-Step)', content: fieldData.flowMap },
      { label: 'Branching Rules (Hot/Warm/Cold)', content: fieldData.branchingRules },
      { label: 'Tags & Fields to Write', content: fieldData.tagsAndFields },
      { label: 'Notifications & Handoff Rules', content: fieldData.notificationRules },
    ]} />
  ),

  // StepPanel — DEL-S5: Handoff to RET
  'DEL-S5': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Handoff Notes to RET', content: fieldData.handoffNotes },
      { label: 'Retention Seed Message', content: fieldData.retentionSeedMessage },
      { label: 'Next Steps', content: fieldData.nextSteps },
    ]} />
  ),

  // StepPanel — DEL-A1: Onboarding SOP
  'DEL-A1': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Payment → Work-Start Steps', content: fieldData.paymentToStartSteps },
      { label: 'Communication Triggers', content: fieldData.communicationTriggers },
      { label: 'Owner / Role', content: fieldData.ownerRole },
    ]} />
  ),

  // Matrix2x2 — DEL-A2: Client Brief
  'DEL-A2': ({ fieldData }) => {
    const quadrants = [
      { label: 'Client Constraints',    content: fieldData.clientConstraints ? truncate(fieldData.clientConstraints, 130) : null },
      { label: 'Access Requirements',   content: fieldData.accessRequirements ? truncate(fieldData.accessRequirements, 130) : null },
      { label: 'Client Preferences',    content: fieldData.preferences ? truncate(fieldData.preferences, 130) : null },
      { label: 'Success Definition',    content: fieldData.clientSuccessDefinition ? truncate(fieldData.clientSuccessDefinition, 130) : null, accent: true },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  // StepPanel — DEL-A3: Execution SOP
  'DEL-A3': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Execution Steps', content: fieldData.sopSteps },
      { label: 'Templates & Scripts', content: fieldData.templates },
      { label: 'Edge Cases & Notes', content: fieldData.edgeCases },
    ]} />
  ),

  // Matrix2x2 — DEL-A4: QC Checklist
  'DEL-A4': ({ fieldData }) => {
    const quadrants = [
      { label: 'QC Checklist Items',     content: fieldData.qcItems ? truncate(fieldData.qcItems, 130) : null, accent: true },
      { label: 'Guarantee Alignment',    content: fieldData.guaranteeAlignment ? truncate(fieldData.guaranteeAlignment, 130) : null },
      { label: 'IC-OFR Checks',          content: fieldData.icOfrChecks ? truncate(fieldData.icOfrChecks, 130) : null },
      { label: 'IC-DEL Checks',          content: fieldData.icDelChecks ? truncate(fieldData.icDelChecks, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  // DualColumn — DEL-A5: Milestone Messages
  'DEL-A5': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Milestone Message Templates', content: fieldData.milestoneTemplates }}
      right={{ label: 'Delivery Schedule', content: fieldData.deliverySchedule }}
    />
  ),

  // StepPanel — DEL-A6: Proof Capture Protocol
  'DEL-A6': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Capture Protocol Steps', content: fieldData.protocolSteps },
      { label: 'Consent Template', content: fieldData.consentTemplate },
      { label: 'Case Study Data Template', content: fieldData.caseStudyTemplate },
    ]} />
  ),

  // StepPanel — DEL-A7: Close & Handoff
  'DEL-A7': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Close Communication', content: fieldData.closeCommunication },
      { label: 'Retention Seed Message', content: fieldData.retentionSeed },
      { label: 'RET Stage Handoff', content: fieldData.retHandoff },
    ]} />
  ),

  // DualColumn — RET-S2: Proof Asset Inventory
  'RET-S2': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Proof Assets List', content: fieldData.proofAssets }}
      right={{ label: 'Segment Relevance Tags', content: fieldData.segmentRelevance }}
      footer={fieldData.claimStrength}
      footerLabel="Claim Strength / G-Label"
    />
  ),

  // Matrix2x2 — RET-S3: Ascension Framework
  'RET-S3': ({ fieldData }) => {
    const quadrants = [
      { label: 'Upsell Path',         content: fieldData.upsellPath ? truncate(fieldData.upsellPath, 130) : null, accent: true },
      { label: 'Ascension Levels',    content: fieldData.ascensionLevels ? truncate(fieldData.ascensionLevels, 130) : null },
      { label: 'Eligibility Rules',   content: fieldData.eligibilityRules ? truncate(fieldData.eligibilityRules, 130) : null },
      { label: 'Trigger Timing',      content: fieldData.triggerTiming ? truncate(fieldData.triggerTiming, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  // Matrix2x2 — RET-S4: Re-engagement Tone & CTA
  'RET-S4': ({ fieldData }) => {
    const quadrants = [
      { label: 'Warming Posture',    content: fieldData.warmingPosture ? truncate(fieldData.warmingPosture, 130) : null },
      { label: 'Non-Pushy Constraints', content: fieldData.toneConstraints ? truncate(fieldData.toneConstraints, 130) : null },
      { label: 'CTA Standards',      content: fieldData.ctaStandards ? truncate(fieldData.ctaStandards, 130) : null, accent: true },
      { label: 'Message Spines',     content: fieldData.messageSpines ? truncate(fieldData.messageSpines, 130) : null },
    ];
    return <Matrix2x2Renderer quadrants={quadrants} />;
  },

  // DualColumn — RET-S5: Proof-to-Sequence Mapping
  'RET-S5': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Proof → Sequence Mapping', content: fieldData.proofToSequenceMap }}
      right={{ label: 'Channel Assumptions', content: fieldData.channelAssumptions }}
      footer={fieldData.channelVariations}
      footerLabel="Required Variations"
    />
  ),

  // StepPanel — RET-A1: Post-Delivery Touch Sequence (5 touches)
  'RET-A1': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Touch 1', content: fieldData.touch1 },
      { label: 'Touch 2', content: fieldData.touch2 },
      { label: 'Touch 3', content: fieldData.touch3 },
      { label: 'Touch 4', content: fieldData.touch4 },
      { label: 'Touch 5 (with CTA)', content: fieldData.touch5WithCta },
    ]} />
  ),

  // StepPanel — RET-A2: Nurture Sequence
  'RET-A2': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Touch 1 — Value Forward', content: fieldData.nurtureTouch1 },
      { label: 'Touch 2 — Continued Value', content: fieldData.nurtureTouch2 },
      { label: 'Touch 3 — Upsell Seed', content: fieldData.nurtureTouch3 },
    ]} />
  ),

  // StepPanel — RET-A3: Re-Activation Campaign
  'RET-A3': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Campaign Cadence', content: fieldData.campaignCadence },
      { label: 'Message Objectives', content: fieldData.messageObjectives },
      { label: 'Proof Inserts (1-2)', content: fieldData.proofInserts },
    ]} />
  ),

  // StepPanel — RET-A4: Upsell Offer Asset
  'RET-A4': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Next Offer Framing', content: fieldData.nextOfferFraming },
      { label: 'Eligibility Rules', content: fieldData.eligibility },
      { label: '"Why Now" Logic', content: fieldData.whyNowLogic },
    ]} />
  ),

  // StepPanel — RET-A5: Loyalty Ladder
  'RET-A5': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Value Levels', content: fieldData.valueLevels },
      { label: 'Progression Triggers', content: fieldData.progressionTriggers },
      { label: 'Level Eligibility', content: fieldData.levelEligibility },
    ]} />
  ),

  // StepPanel — RET-A6: Proof Deployment Map
  'RET-A6': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Deployment Map Table', content: fieldData.deploymentTable },
      { label: 'Claim Labelling', content: fieldData.claimLabelling },
      { label: 'Consent Status per Asset', content: fieldData.consentStatus },
    ]} />
  ),

  // DualColumn — OPT-S3: Root Cause Hypotheses
  'OPT-S3': ({ fieldData }) => (
    <DualColumnRenderer
      left={{ label: 'Root Cause Hypotheses', content: fieldData.hypotheses }}
      right={{ label: 'Risks & Side Effects', content: fieldData.risksAndSideEffects }}
    />
  ),

  // StepPanel — OPT-S4: Action Plan (3 actions)
  'OPT-S4': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Action 1', content: fieldData.action1 },
      { label: 'Action 2', content: fieldData.action2 },
      { label: 'Action 3', content: fieldData.action3 },
    ]} />
  ),

  // VerdictBadge — OPT-S5: Hold Gate
  'OPT-S5': ({ fieldData }) => {
    const verdictMap = { yes: 'BELOW 7.0', no: 'ABOVE 7.0' };
    const verdict = verdictMap[fieldData.g72Check] || 'UNSET';
    const colorMap = {
      'BELOW 7.0': 'var(--pri-urgent)',
      'ABOVE 7.0': 'var(--col-done)',
      UNSET:       'var(--text3)',
    };
    return (
      <VerdictBadgeRenderer
        verdict={verdict}
        color={colorMap[verdict]}
        basisLabel="Hold List"
        basisContent={fieldData.holdItems}
      />
    );
  },

  // StepPanel — OPT-S6: Test Design
  'OPT-S6': ({ fieldData }) => (
    <StepPanelRenderer steps={[
      { label: 'Test Hypothesis', content: fieldData.testHypothesis },
      { label: 'Scope & Duration', content: fieldData.testScope },
      { label: 'Success Metrics', content: fieldData.successMetrics },
      { label: 'Stop Conditions', content: fieldData.stopConditions },
      { label: 'Rollback Plan', content: fieldData.rollbackPlan },
    ]} />
  ),

  // MetricBar — OPT-S7: Trust Vitality Score
  'OPT-S7': ({ fieldData }) => (
    <MetricBarRenderer metrics={[
      { label: 'TV-1 Work Sustainability', value: Number(fieldData.tv1WorkSustainability) || 0, max: 10 },
      { label: 'TV-2 Clarity of Purpose',  value: Number(fieldData.tv2ClarityOfPurpose) || 0, max: 10 },
      { label: 'TV-3 Integrity Comfort',   value: Number(fieldData.tv3IntegrityComfort) || 0, max: 10 },
      { label: 'TVS Overall',              value: Number(fieldData.tvsOverall) || 0, max: 10 },
    ]} />
  ),

  // MetricBar — OPT-A2: Barakah Health Index
  'OPT-A2': ({ fieldData }) => (
    <MetricBarRenderer metrics={[
      { label: 'BHI-1 Referral Rate',      value: Number(fieldData.bhi1ReferralRate) || 0, max: 100, unit: '%' },
      { label: 'BHI-2 Energy Rating',      value: Number(fieldData.bhi2EnergyRating) || 0, max: 10 },
      { label: 'BHI-3 Right-Fit Ratio',    value: Number(fieldData.bhi3RightFitRatio) || 0, max: 100, unit: '%' },
      { label: 'BHI-4 Decision Clarity',   value: Number(fieldData.bhi4DecisionClarity) || 0, max: 100, unit: '%' },
    ]} />
  ),

  // VerdictBadge — OPT-A5: Cycle Close & Pack Audit
  'OPT-A5': ({ fieldData }) => {
    const verdictMap = { complete: 'COMPLETE', partial: 'PARTIAL', blocked: 'BLOCKED' };
    const verdict = verdictMap[fieldData.packCompleteness] || 'PENDING';
    const colorMap = {
      COMPLETE: 'var(--col-done)',
      PARTIAL:  'var(--pri-high)',
      BLOCKED:  'var(--pri-urgent)',
      PENDING:  'var(--text3)',
    };
    return (
      <VerdictBadgeRenderer
        verdict={verdict}
        color={colorMap[verdict]}
        basisLabel="NO-SHIP Items"
        basisContent={fieldData.missingItems}
      />
    );
  },
};

// ── DefaultTaskRenderer ───────────────────────────────────────────────────────

function DefaultTaskRenderer({ def, fieldData }) {
  return (
    <div className="bfd__default-fields">
      {def.fields.map((field) => {
        const raw = fieldData?.[field.id];
        const isEmpty = !raw || String(raw).trim() === '';
        let displayValue;
        if (isEmpty) {
          displayValue = <span className="bfd__field-empty">—</span>;
        } else if (field.type === 'select') {
          displayValue = <span className="bfd__field-value">{resolveSelectLabel(field, raw)}</span>;
        } else if (field.type === 'textarea') {
          displayValue = <p className="bfd__field-textarea">{raw}</p>;
        } else {
          displayValue = <span className="bfd__field-value">{raw}</span>;
        }
        return (
          <div key={field.id} className="bfd__field">
            <div className="bfd__field-label">{field.label}</div>
            {displayValue}
          </div>
        );
      })}
    </div>
  );
}

// ── BbosTaskCard ─────────────────────────────────────────────────────────────
// Renders a BBOS task using the consumer-provided `renderTaskCard` render-prop
// when available, or the package's `FallbackTaskCard` otherwise.

function BbosTaskCard({
  def,
  task,
  index,
  onSelectTask,
  span,
  doneColumnId,
  viewOnly,
  accessLevel,
  renderTaskCard,
  renderGLabelBadge,
}) {
  const fieldData = task?.bbosFieldData || {};
  const { filled, total } = countFilledFields(def, task ? fieldData : null);
  const CustomRenderer = TASK_RENDERERS[def.id];

  const allEmpty = task
    ? def.fields.every((f) => {
        const v = fieldData[f.id];
        return !v || String(v).trim() === '';
      })
    : true;

  const hasData = task && !allEmpty;

  const status = (task && doneColumnId && task.columnId === doneColumnId) || (task && task.completedAt)
    ? 'complete'
    : (!task || allEmpty)
      ? 'empty'
      : 'active';

  const GLabelComp = renderGLabelBadge
    ? ({ gLabel }) => renderGLabelBadge({ gLabel })
    : FallbackGLabelBadge;

  const chips = [
    { label: def.id, className: 'dtc__chip dtc__chip--id' },
    ...(task ? [{
      label: `${filled}/${total}`,
      className: `dtc__chip dtc__chip--complete ${filled === total && total > 0 ? 'dtc__chip--complete-full' : ''}`,
    }] : []),
    ...(def.hasGLabel && task?.gLabel
      ? [{ label: <GLabelComp gLabel={task.gLabel} size="sm" />, className: 'dtc__chip dtc__chip--glabel-badge' }]
      : def.hasGLabel
        ? [{ label: 'G', className: 'dtc__chip dtc__chip--glabel' }]
        : []),
    ...(accessLevel === 'V' ? [{ label: 'View', className: 'dtc__chip dtc__chip--access-view' }] : []),
    ...(accessLevel === 'E' ? [{ label: 'Edit', className: 'dtc__chip dtc__chip--access-edit' }] : []),
  ];

  const cardProps = {
    taskId: task?.id,
    index: index - 1,
    title: def.label,
    span,
    status,
    onSelectTask: task && !viewOnly ? onSelectTask : undefined,
    chips,
    fieldProgress: task ? { filled, total } : undefined,
    purpose: hasData && def.purpose ? truncate(def.purpose, 110) : undefined,
  };

  const body = hasData ? (CustomRenderer
    ? <CustomRenderer fieldData={fieldData} />
    : <DefaultTaskRenderer def={def} fieldData={fieldData} />
  ) : null;

  if (renderTaskCard) {
    return renderTaskCard({ cardProps, def, task, fieldsFilled: filled, fieldsTotal: total, body });
  }

  return <FallbackTaskCard {...cardProps}>{body}</FallbackTaskCard>;
}

// ── ProjectAuditCard ─────────────────────────────────────────────────────────

function hasUserFieldData(task) {
  const fd = task.bbosFieldData || {};
  return Object.entries(fd).some(([k, v]) => !k.startsWith('_') && (typeof v === 'string' ? v.trim() : !!v));
}

function ProjectAuditCard({ tasks, doneColumnId }) {
  const total = tasks.length;
  const startedTasks = tasks.filter(hasUserFieldData);
  const started = startedTasks.length;
  const completed = tasks.filter((t) => t.completedAt || t.columnId === doneColumnId).length;
  const pct = total > 0 ? Math.round((completed / total) * 100) : 0;
  // Scheduling discipline measured only against started tasks
  const noDueDate = startedTasks.filter((t) => !t.dueDate && !t.completedAt).length;

  let totalSubtasks = 0;
  let doneSubtasks = 0;
  for (const t of tasks) {
    if (t.subtasks && t.subtasks.length > 0) {
      totalSubtasks += t.subtasks.length;
      doneSubtasks += t.subtasks.filter((s) => s.done).length;
    }
  }
  const subtaskPct = totalSubtasks > 0 ? Math.round((doneSubtasks / totalSubtasks) * 100) : 0;

  const checks = [
    { label: 'Task Coverage', sub: started > 10 ? 'Comprehensive' : started > 3 ? 'Building' : started > 0 ? 'Started' : 'Not Started', score: started > 10 ? 3 : started > 3 ? 2 : started > 0 ? 1 : 1 },
    { label: 'Completion Rate', sub: pct > 50 ? 'Strong Progress' : pct > 0 ? 'In Progress' : 'Not Started', score: pct >= 80 ? 3 : pct >= 50 ? 2 : pct > 0 ? 1 : 1 },
    { label: 'Scheduling Discipline', sub: started === 0 ? 'Not Started' : noDueDate === 0 ? 'Well Dated' : 'Dates Needed', score: started === 0 ? 1 : noDueDate === 0 ? 3 : noDueDate < started * 0.3 ? 2 : 1 },
    { label: 'Subtask Depth', sub: totalSubtasks > 0 ? `${subtaskPct}% Complete` : 'Not Used', score: subtaskPct >= 80 ? 3 : subtaskPct >= 50 ? 2 : totalSubtasks > 0 ? 1 : 1 },
  ];

  const avgScore = checks.length > 0 ? checks.reduce((s, c) => s + c.score, 0) / checks.length : 0;
  const verdict = avgScore >= 2.5 ? 'STRONG' : avgScore >= 2 ? 'QUALIFIED' : avgScore >= 1.5 ? 'DEVELOPING' : 'NEEDS WORK';
  const thresholdPct = Math.round((avgScore / 3) * 100);

  return (
    <div className="bfd__pa" style={{ gridColumn: '1 / -1' }}>
      <div className="bfd__pa-left">
        <div className="bfd__card-head">
          <span className="bfd__card-num">
            <Star size={14} fill="currentColor" />
          </span>
          <span className="bfd__card-label">Project Audit</span>
        </div>
        <div className="bfd__pa-verdict-box">
          <div className="bfd__pa-verdict-label">Audit Conclusion</div>
          <div className="bfd__pa-verdict-value">{verdict}</div>
          <div className="bfd__pa-verdict-sub">Health Threshold: {thresholdPct}% Met</div>
        </div>
      </div>
      <div className="bfd__pa-right">
        <div className="bfd__pa-title">Audited Metrics</div>
        <div className="bfd__pa-grid">
          {checks.map((chk, i) => (
            <div key={i} className="bfd__pa-item">
              <div className="bfd__pa-item-info">
                <span className="bfd__pa-item-name">{chk.label}</span>
                <span className="bfd__pa-item-sub">{chk.sub}</span>
              </div>
              {renderStars(chk.score)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── StageScoreCard ────────────────────────────────────────────────────────────

function StageScoreCard({ bbosFilter, taskMap }) {
  const signals = STAGE_SCORE_SIGNALS[bbosFilter];
  if (!signals) return null;

  const MAX_PER_SIGNAL = 5;
  const scored = signals.map((sig) => {
    const fd = taskMap[sig.taskId]?.bbosFieldData || {};
    return { label: sig.label, pts: sig.score(fd) };
  });

  const totalPts = scored.reduce((s, r) => s + r.pts, 0);
  const maxPts = signals.length * MAX_PER_SIGNAL;
  const pct = Math.round((totalPts / maxPts) * 100);
  const verdict =
    pct >= 75 ? 'QUALIFIED' :
    pct >= 50 ? 'DEVELOPING' :
    pct >= 25 ? 'REVIEW NEEDED' : 'BLOCKED';
  const verdictColor = {
    QUALIFIED:       'var(--col-done)',
    DEVELOPING:      'var(--pri-high)',
    'REVIEW NEEDED': 'var(--pri-urgent)',
    BLOCKED:         'var(--pri-urgent)',
  }[verdict];

  return (
    <div className="bfd__ssc" style={{ gridColumn: '1 / -1' }}>
      <div className="bfd__ssc-left">
        <div className="bfd__card-head">
          <span className="bfd__card-num"><CheckCircle size={14} /></span>
          <span className="bfd__card-label">Stage Health Score</span>
        </div>
        <div className="bfd__ssc-verdict-box">
          <div className="bfd__ssc-verdict-label">Stage Verdict</div>
          <div className="bfd__ssc-verdict-value" style={{ color: verdictColor }}>{verdict}</div>
          <div className="bfd__ssc-verdict-sub">{pct}% · {totalPts}/{maxPts} pts</div>
        </div>
      </div>
      <div className="bfd__ssc-right">
        <div className="bfd__ssc-title">Weighted Signals</div>
        <div className="bfd__ssc-grid">
          {scored.map((sig, i) => (
            <div key={i} className="bfd__ssc-signal">
              <div className="bfd__ssc-signal-info">
                <span className="bfd__ssc-signal-label">{sig.label}</span>
              </div>
              {renderStars(sig.pts, 5)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── BbosFullDashboard ─────────────────────────────────────────────────────────

const EMPTY_TASKS = [];

export default function BbosFullDashboard({
  project,
  tasks: tasksProp,
  bbosFilter,
  onSelectTask,
  onStageAdvance,
  onRejectStage,
  onUnrejectStage,
  renderTaskCard,
  renderGLabelBadge,
}) {
  const tasks = tasksProp || EMPTY_TASKS;
  const bbosRole = project.bbosRole || 'all';
  const [activeFactory, setActiveFactoryRaw] = useState('research');
  const setActiveFactory = (key) => setActiveFactoryRaw(key);

  // Two-layer cross-fade on factory swap (Groundwork ↔ Workshop).
  const [prevFactory, setPrevFactory] = useState(null);
  const trackedFactoryRef = useRef(activeFactory);
  const prevTimerRef = useRef(null);
  const hasTransitionedRef = useRef(false);
  useLayoutEffect(() => {
    if (trackedFactoryRef.current === activeFactory) return;
    hasTransitionedRef.current = true;
    setPrevFactory(trackedFactoryRef.current);
    trackedFactoryRef.current = activeFactory;
    clearTimeout(prevTimerRef.current);
    prevTimerRef.current = setTimeout(() => setPrevFactory(null), 320);
  }, [activeFactory]);

  const { stageMeta, taskGroups, taskMap, globalIdxMap, stageTasks, doneColumnId, allDefs, totalCount, stagePct } = useMemo(() => {
    const stageMeta = getStage(bbosFilter) || { label: bbosFilter, description: '', attributes: '', order: 0 };
    const allDefs = getBbosTaskDefsByStage(bbosFilter);

    // Filter defs by role access — hide tasks the role cannot see
    const defs = (!bbosRole || bbosRole === 'all')
      ? allDefs
      : allDefs.filter((d) => getTaskAccessLevel(bbosRole, d.id) !== '-');

    const taskMap = {};
    const stageTasks = [];
    for (const t of tasks) {
      if (t.bbosTaskType) {
        taskMap[t.bbosTaskType] = t;
        if (t.bbosTaskType.startsWith(bbosFilter + '-')) stageTasks.push(t);
      }
    }

    // Group defs by subLevel prefix
    const groups = [];
    let currentGroup = null;
    for (const def of defs) {
      const prefix = getSubLevelPrefix(def.subLevel);
      if (!currentGroup || currentGroup.prefix !== prefix) {
        currentGroup = { prefix, label: PREFIX_LABELS[prefix] || 'Additional Tasks', defs: [] };
        groups.push(currentGroup);
      }
      currentGroup.defs.push(def);
    }

    // Global sequential index across all groups
    const globalIdxMap = {};
    let idx = 0;
    for (const g of groups) {
      for (const def of g.defs) {
        idx++;
        globalIdxMap[def.id] = idx;
      }
    }

    const doneColumnId = project.columns?.find((c) => c.name === 'Done')?.id ?? null;

    // Completion stats — count against all defs (not just seeded tasks)
    const doneCount = allDefs.filter((d) => {
      const t = taskMap[d.id];
      return t && (t.columnId === doneColumnId || t.completedAt);
    }).length;
    const totalCount = allDefs.length;
    const stagePct = totalCount > 0 ? Math.round((doneCount / totalCount) * 100) : 0;

    return { stageMeta, taskGroups: groups, taskMap, globalIdxMap, stageTasks, doneColumnId, allDefs, doneCount, totalCount, stagePct };
  }, [tasks, project, bbosFilter, bbosRole]);

  const quote = STAGE_QUOTES[bbosFilter] || '';
  const nextStage = BBOS_STAGES[(stageMeta.order ?? 0) + 1] ?? null;

  // ── Rejection / off-ramp state ────────────────────────────────────────────
  const isRejected = !!project.rejectedAt;
  const rejectionReasonMeta = isRejected ? getBbosRejectionReason(project.rejectionReason) : null;

  // Operator with audit-edit access on the proof task may reject.
  const canReject = bbosRole === 'all' || getTaskAccessLevel(bbosRole, 'CRD-V1') === 'O';
  const showRejectButton = bbosFilter === 'CRD' && !isRejected && canReject && !!onRejectStage;

  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectReasonId, setRejectReasonId] = useState(BBOS_REJECTION_REASONS[0]?.id || '');

  const handleConfirmReject = () => {
    if (!rejectReasonId) return;
    onRejectStage?.(project.id, rejectReasonId, project.bbosRole || null);
    setRejectModalOpen(false);
  };

  const handleResume = () => {
    if (typeof window !== 'undefined' && !window.confirm(
      'Resume this BBOS pipeline? The rejection record will be cleared and stages will unlock.'
    )) return;
    onUnrejectStage?.(project.id);
  };

  return (
    <div className="bfd">
      {/* ── Rejection banner ── */}
      {isRejected && (
        <div className="bfd__rejection-banner" role="alert">
          <ShieldOff size={20} className="bfd__rejection-icon" />
          <div className="bfd__rejection-body">
            <div className="bfd__rejection-title">
              Pipeline rejected at Amanah Proof Audit
            </div>
            <div className="bfd__rejection-reason">
              {rejectionReasonMeta?.label || 'Unspecified reason'}
              {rejectionReasonMeta?.description && (
                <> — {rejectionReasonMeta.description}</>
              )}
            </div>
            <div className="bfd__rejection-meta">
              {project.rejectedAt && (
                <>Rejected {new Date(project.rejectedAt).toLocaleDateString()}</>
              )}
              {project.rejectedBy && <> · by {project.rejectedBy}</>}
            </div>
          </div>
          {canReject && (
            <button
              className="bfd__rejection-resume"
              onClick={handleResume}
              type="button"
              aria-label="Resume pipeline"
            >
              <RotateCcw size={14} /> Resume
            </button>
          )}
        </div>
      )}

      {/* ── Header ── */}
      <div className="bfd__header">

        <p className="bfd__desc">
          {stageMeta.description}
          {stageMeta.attributes && <>{' '}<em>{stageMeta.attributes}</em></>}
        </p>

        {showRejectButton && (
          <button
            className="bfd__reject-btn"
            onClick={() => setRejectModalOpen(true)}
            type="button"
          >
            <ShieldOff size={14} /> Reject pipeline
          </button>
        )}

        {!isRejected && stagePct === 100 && onStageAdvance && (
          <div className="bfd__stage-ready">
            <CheckCircle size={16} className="bfd__stage-ready-icon" />
            <span className="bfd__stage-ready-text">
              Stage complete — {totalCount}/{totalCount} tasks done
            </span>
            <button className="bfd__stage-advance-btn" onClick={onStageAdvance}>
              {nextStage ? `Advance to ${nextStage.label}` : 'Complete Cycle'} →
            </button>
          </div>
        )}
      </div>

      {/* ── Reject modal ── */}
      {rejectModalOpen && (
        <div className="bfd__modal-overlay" onClick={() => setRejectModalOpen(false)}>
          <div className="bfd__modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Reject BBOS pipeline">
            <div className="bfd__modal-head">
              <ShieldOff size={18} />
              <span>Reject BBOS pipeline</span>
            </div>
            <p className="bfd__modal-desc">
              Mark this pipeline as rejected at the Amanah Proof Audit. Stage advancement will be locked. You can resume the pipeline later if circumstances change.
            </p>
            <div className="bfd__modal-options" role="radiogroup" aria-label="Rejection reason">
              {BBOS_REJECTION_REASONS.map((r) => (
                <label key={r.id} className={`bfd__modal-option${rejectReasonId === r.id ? ' bfd__modal-option--active' : ''}`}>
                  <input
                    type="radio"
                    name="bfd-reject-reason"
                    value={r.id}
                    checked={rejectReasonId === r.id}
                    onChange={() => setRejectReasonId(r.id)}
                  />
                  <span className="bfd__modal-option-label">{r.label}</span>
                  <span className="bfd__modal-option-desc">{r.description}</span>
                </label>
              ))}
            </div>
            <div className="bfd__modal-actions">
              <button className="bfd__modal-cancel" type="button" onClick={() => setRejectModalOpen(false)}>
                Cancel
              </button>
              <button className="bfd__modal-confirm" type="button" onClick={handleConfirmReject} disabled={!rejectReasonId}>
                Confirm rejection
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Task grid ── */}
      <div className="bfd__grid">
        {bbosRole !== 'all' && allDefs.length > 0 && taskGroups.length === 0 ? (
          <InternalScopeGate bbosRole={bbosRole} bbosFilter={bbosFilter} />
        ) : (<>
        {/* eslint-disable-next-line react-hooks/refs -- hasTransitionedRef is a one-way mount-flag toggled in useLayoutEffect; reading during render is intentional and stable */}
        {(() => {
          const researchGroups = taskGroups.filter((g) => getFactory(g.prefix) === 'research');
          const assetGroups = taskGroups.filter((g) => getFactory(g.prefix) === 'asset');

          // Assembly gate: are all research tasks in Done column?
          const researchDefs = researchGroups.flatMap((g) => g.defs);
          const researchAllDone = doneColumnId && researchDefs.length > 0 && researchDefs.every((def) => {
            const t = taskMap[def.id];
            return t && t.columnId === doneColumnId;
          });
          // Roles with no Research visibility (researchDefs empty) treat the gate as N/A,
          // not locked — otherwise their Asset tasks would never unlock.
          const gateCleared = researchDefs.length === 0 || researchAllDone || !doneColumnId;

          const renderGroup = (group, assetLocked) => {
            const spans = computeGroupSpans(group.prefix, group.defs);
            return (
              <Fragment key={group.prefix}>
                <div className="bfd__divider">
                  <span className="bfd__divider-label">{group.label}</span>
                  <span className="bfd__divider-count">{group.defs.length} task{group.defs.length !== 1 ? 's' : ''}</span>
                </div>
                {group.defs.map((def, i) => (
                  <BbosTaskCard
                    key={def.id}
                    def={def}
                    task={taskMap[def.id]}
                    index={globalIdxMap[def.id]}
                    onSelectTask={onSelectTask}
                    span={spans[i]}
                    doneColumnId={doneColumnId}
                    viewOnly={assetLocked || (bbosRole !== 'all' && getTaskAccessLevel(bbosRole, def.id) === 'V')}
                    accessLevel={bbosRole !== 'all' ? getTaskAccessLevel(bbosRole, def.id) : null}
                    renderTaskCard={renderTaskCard}
                    renderGLabelBadge={renderGLabelBadge}
                  />
                ))}
              </Fragment>
            );
          };

          const hasBoth = researchGroups.length > 0 && assetGroups.length > 0;

          return (
            <>
              {/* Factory tab selector */}
              {hasBoth && (
                <div className="bfd__factory-tabs">
                  {[
                    activeFactory === 'research'
                      ? ['research', 'asset']
                      : ['asset', 'research'],
                  ][0].map((key) => (
                    <button
                      key={key}
                      className={`bfd__factory-tab${activeFactory === key ? ' bfd__factory-tab--active' : ''}`}
                      onClick={() => setActiveFactory(key)}
                    >
                      {key === 'research' ? 'Groundwork' : 'Workshop'}
                      <span className="bfd__factory-tab-count">
                        {key === 'research'
                          ? researchDefs.length
                          : assetGroups.flatMap((g) => g.defs).length}
                      </span>
                      {key === 'asset' && !gateCleared && <span className="bfd__factory-tab-lock">🔒</span>}
                    </button>
                  ))}
                </div>
              )}

              {/* Active factory content — two-layer cross-fade */}
              {(() => {
                const renderFactoryBody = (factory) => {
                  if (hasBoth ? factory === 'research' : researchGroups.length > 0) {
                    return (
                      <div className="bfd__factory bfd__factory--research">
                        {researchGroups.map((g) => renderGroup(g, false))}
                      </div>
                    );
                  }
                  if (hasBoth ? factory === 'asset' : assetGroups.length > 0 && researchGroups.length === 0) {
                    return (
                      <>
                        {!gateCleared ? (
                          <div className="bfd__assembly-gate bfd__assembly-gate--locked">
                            <span className="bfd__assembly-gate-icon">⏳</span>
                            <span className="bfd__assembly-gate-text">Assembly Gate: LOCKED — complete Research tasks first</span>
                          </div>
                        ) : (
                          <div className="bfd__assembly-gate bfd__assembly-gate--cleared">
                            <span className="bfd__assembly-gate-icon">✅</span>
                            <span className="bfd__assembly-gate-text">Assembly Gate: CLEARED</span>
                          </div>
                        )}
                        <div className={`bfd__factory bfd__factory--asset${!gateCleared ? ' bfd__factory--locked' : ''}`}>
                          {assetGroups.map((g) => renderGroup(g, !gateCleared))}
                        </div>
                      </>
                    );
                  }
                  return null;
                };
                return (
                  <div className="bfd__factory-content">
                    {prevFactory && prevFactory !== activeFactory && (
                      <div key={prevFactory} className="bfd__factory-content__layer bfd__factory-content__layer--out">
                        {renderFactoryBody(prevFactory)}
                      </div>
                    )}
                    <div key={activeFactory} className={`bfd__factory-content__layer${hasTransitionedRef.current ? ' bfd__factory-content__layer--in' : ''}`}>
                      {renderFactoryBody(activeFactory)}
                    </div>
                  </div>
                );
              })()}
            </>
          );
        })()}

        {/* ── Stage Health Score ── */}
        <StageScoreCard bbosFilter={bbosFilter} taskMap={taskMap} />

        {/* ── Project Audit ── */}
        <ProjectAuditCard tasks={stageTasks} doneColumnId={doneColumnId} />
        </>)}
      </div>

      {/* ── Footer ── */}
      <div className="bfd__footer">
        {quote && <p className="bfd__footer-quote">{quote}</p>}
        <p className="bfd__footer-meta">
          BBOS Strategy Engine · Stage {String((stageMeta.order ?? 0) + 1).padStart(2, '0')} {bbosFilter} · {project.name}
        </p>
      </div>
    </div>
  );
}
