import { useState, useEffect, useRef, useMemo, Component } from 'react';
import { createPortal } from 'react-dom';
import {
  X, Sparkles, Check, RotateCcw, AlertTriangle, ChevronDown, ChevronUp,
  Download, Upload, Loader, Ban, Eye, BookOpen, ArrowUpRight, ArrowDownRight,
  Bookmark,
} from 'lucide-react';
import { getBbosTaskDef, getBbosTaskDeps, BBOS_VALIDATION_FLAG_LABELS } from '../../data/bbos/bbos-task-definitions';
import { BBOS_STAGES } from '../../data/bbos/bbos-pipeline';
import { getBbosStageIslamic } from '../../data/bbos/bbos-stage-islamic';
import { downloadTaskTemplate, validateTaskTemplate, importTaskTemplate } from '../../services/bbos/bbos-template';
import { getTaskAccessLevel, getBbosRole } from '../../data/bbos/bbos-role-access';
import './BbosTaskPanel.css';

const NOOP = () => {};
const EMPTY_ARRAY = [];

function defaultGetInitials(name) {
  if (!name) return '?';
  return name.split(/\s+/).filter(Boolean).slice(0, 2).map((p) => p[0].toUpperCase()).join('') || '?';
}

function formatDateTime(iso) {
  if (!iso) return '';
  return new Date(iso).toLocaleString('en', {
    month: 'short', day: '2-digit', year: 'numeric',
    hour: '2-digit', minute: '2-digit', hour12: true,
  });
}

class InternalErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error) {
    return { error };
  }
  componentDidCatch(error, info) {
    if (typeof console !== 'undefined') {
      console.error('[BbosTaskPanel ErrorBoundary]', this.props.name || '(unnamed)', error, info);
    }
  }
  handleReset = () => {
    this.setState({ error: null });
    this.props.onReset?.();
  };
  render() {
    if (this.state.error) {
      return (
        <div style={{
          padding: '12px',
          margin: '8px 0',
          border: '1px solid var(--danger, #ef4444)',
          borderRadius: '6px',
          background: 'rgba(239, 68, 68, 0.05)',
          fontSize: '13px',
          color: 'var(--text2, #555)',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
            <AlertTriangle size={14} />
            <strong>{this.props.name || 'Section'} failed to render.</strong>
          </div>
          <div style={{ fontSize: '12px', marginBottom: '8px', wordBreak: 'break-word' }}>
            {String(this.state.error?.message || this.state.error)}
          </div>
          <button
            type="button"
            onClick={this.handleReset}
            style={{
              padding: '4px 10px',
              fontSize: '12px',
              border: '1px solid var(--text3, #888)',
              borderRadius: '4px',
              background: 'transparent',
              cursor: 'pointer',
            }}
          >
            Reset
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function FallbackGLabelPicker({ value, onChange }) {
  const options = [
    { id: 'amanah', label: 'Amanah (trust)' },
    { id: 'adl', label: 'Adl (justice)' },
    { id: 'ihsan', label: 'Ihsan (excellence)' },
    { id: 'sabr', label: 'Sabr (patience)' },
    { id: 'shukr', label: 'Shukr (gratitude)' },
  ];
  return (
    <select
      className="btp-field-select"
      value={value || ''}
      onChange={(e) => onChange(e.target.value || null)}
      aria-label="Integrity label"
    >
      <option value="">— None —</option>
      {options.map((o) => (
        <option key={o.id} value={o.id}>{o.label}</option>
      ))}
    </select>
  );
}

export default function BbosTaskPanel(props) {
  return (
    <InternalErrorBoundary name="BbosTaskPanel" onReset={props.onClose}>
      <BbosTaskPanelInner {...props} />
    </InternalErrorBoundary>
  );
}

function BbosTaskPanelInner({
  project,
  projectId,
  taskId,
  onClose,
  bbosRole,
  accentColor,
  task,
  user,
  employees: employeesProp,
  members: membersProp,
  assignee,
  tasks: tasksProp,
  aiAvailable = false,
  setActiveBbosTaskType = NOOP,
  clearActiveBbosTaskType = NOOP,
  onUpdateTask = NOOP,
  onFieldUpdate = NOOP,
  onMoveTask = NOOP,
  onAddProjectMember = NOOP,
  onRequestAiDraft,
  renderGLabelPicker,
  getInitials = defaultGetInitials,
}) {
  const employees = employeesProp || EMPTY_ARRAY;
  const projectMembers = membersProp || EMPTY_ARRAY;
  const allEmployees = employees;
  const projectTasks = tasksProp || EMPTY_ARRAY;
  const templateInputRef = useRef(null);

  const [rationaleOpen, setRationaleOpen] = useState(false);
  const [localFields, setLocalFields] = useState({});
  const [runwayModal, setRunwayModal] = useState(null); // { allTasks, runwayMonths }
  const [notes, setNotes] = useState('');
  const [streamingText, setStreamingText] = useState('');
  const [draftWarnings, setDraftWarnings] = useState([]);
  const [closing, setClosing] = useState(false);
  const [discardConfirm, setDiscardConfirm] = useState(false);
  const [validationErrors, setValidationErrors] = useState([]);
  const saveTimeout = useRef(null);
  const abortRef = useRef(null);
  const taskColumnIdRef = useRef(task?.columnId);
  const initialSnapshotRef = useRef(null);

  const handleClose = useRef(() => {
    setClosing(true);
    setTimeout(() => onClose(), 200);
  });
  useEffect(() => {
    handleClose.current = () => {
      setClosing(true);
      setTimeout(() => onClose(), 200);
    };
  }, [onClose]);

  const def = task?.bbosTaskType ? getBbosTaskDef(task.bbosTaskType) : null;
  const stageAttrs = def ? (getBbosStageIslamic(def.stage)?.attrs || []) : [];
  const deps = def ? getBbosTaskDeps(def.id) : { upstream: [], downstream: [], requirements: '' };

  useEffect(() => {
    if (task?.bbosFieldData) {
      setLocalFields(task.bbosFieldData);
    }
    if (task) setNotes(task.notes || '');
    // Snapshot initial state for discard
    if (task && !initialSnapshotRef.current) {
      initialSnapshotRef.current = {
        fields: { ...(task.bbosFieldData || {}) },
        notes: task.notes || '',
      };
    }
    // reason: hydrate panel only when taskId changes; live task object would refire
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [taskId]);

  // Clean up debounced save on unmount — prevents stale writes after panel close
  useEffect(() => {
    return () => clearTimeout(saveTimeout.current);
  }, []);

  // Lock body scroll while the panel is mounted (mobile body-scroll leak fix)
  useEffect(() => {
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = original; };
  }, []);

  // Wire active BBOS task type for journal badge context
  useEffect(() => {
    if (def?.id) setActiveBbosTaskType(def.id);
    return () => clearActiveBbosTaskType();
    // reason: store actions are stable; deliberately depend only on def.id
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [def?.id]);

  // Runway date assignment — fires when CRD-S5 (Constraint Map) is marked complete
  const prevCompletedAtRef = useRef(task?.completedAt);
  useEffect(() => {
    const wasComplete = prevCompletedAtRef.current;
    const isNowComplete = task?.completedAt;
    prevCompletedAtRef.current = isNowComplete;
    if (wasComplete || !isNowComplete || def?.id !== 'CRD-S5') return;

    const runwayMonths = Number(task.bbosFieldData?.financialRunwayMonths);
    if (!runwayMonths || runwayMonths <= 0) return;

    const stageOrderMap = new Map(BBOS_STAGES.map((s) => [s.id, s.order ?? 0]));
    const allTasks = projectTasks
      .filter((t) => t.bbosTaskType)
      .sort((a, b) => {
        const stA = stageOrderMap.get(a.bbosTaskType?.split('-')[0]) ?? 99;
        const stB = stageOrderMap.get(b.bbosTaskType?.split('-')[0]) ?? 99;
        if (stA !== stB) return stA - stB;
        return (a.seedOrder ?? 999) - (b.seedOrder ?? 999);
      });

    if (allTasks.length === 0) return;
    setRunwayModal({ allTasks, runwayMonths });
    // reason: side-effect should only fire on completion edge of this specific task
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [task?.completedAt]);

  if (!task || !def) return null;

  const accessLevel = bbosRole && bbosRole !== 'all' ? getTaskAccessLevel(bbosRole, task.bbosTaskType) : 'O';
  const isViewOnly = accessLevel === 'V';

  // Keep ref in sync with every render so debounce closures always read the latest columnId
  taskColumnIdRef.current = task?.columnId;

  const fieldData = task.bbosFieldData || {};
  const aiDraftStatus = fieldData._aiDraftStatus || 'none';
  const aiDraftTimestamp = fieldData._aiDraftTimestamp || null;

  const advanceToInProgress = () => {
    const toDoCol = project.columns?.find((c) => c.name === 'To Do');
    const inProgressCol = project.columns?.find((c) => c.name === 'In Progress');
    if (!inProgressCol || !toDoCol) return;
    if (taskColumnIdRef.current === toDoCol.id) {
      onMoveTask(projectId, taskId, inProgressCol.id, 0, project.columns);
    }
  };

  const handleFieldChange = (fieldId, value) => {
    const next = { ...localFields, [fieldId]: value };
    setLocalFields(next);
    // Clear validation error for this field when user fills it
    if (value && value.trim()) {
      setValidationErrors((prev) => prev.filter((id) => id !== fieldId));
    }
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      onFieldUpdate(taskId, fieldId, value);
      // Auto-advance when at least 2 user fields have content (or 1 field with 50+ chars)
      if (!fieldId.startsWith('_')) {
        const filled = Object.entries(next)
          .filter(([k, v]) => !k.startsWith('_') && typeof v === 'string' && v.trim().length > 0);
        if (filled.length >= 2 || filled.some(([, v]) => v.trim().length >= 50)) {
          advanceToInProgress();
        }
      }
    }, 300);
  };

  const handleNotesChange = (e) => {
    setNotes(e.target.value);
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(() => {
      onUpdateTask(taskId, { notes: e.target.value });
    }, 300);
  };

  const handleGLabelChange = (gLabel) => {
    onUpdateTask(taskId, { gLabel });
  };

  const handleGenerateDraft = () => {
    if (!aiAvailable || !onRequestAiDraft) return;

    const now = new Date().toISOString();

    // Set generating status
    onFieldUpdate(taskId, '_aiDraftStatus', 'generating');
    onFieldUpdate(taskId, '_aiDraftTimestamp', now);
    onFieldUpdate(taskId, '_aiDraftError', '');
    setStreamingText('');
    setDraftWarnings([]);

    const controller = new AbortController();
    abortRef.current = controller;
    let fullText = '';

    try {
      const result = onRequestAiDraft({
        taskDef: def,
        projectId,
        signal: controller.signal,
        onDelta: (chunk) => {
          fullText += chunk;
          setStreamingText(fullText);
        },
        onComplete: ({ fieldData: parsedFields, warnings }) => {
          for (const [fieldId, value] of Object.entries(parsedFields || {})) {
            onFieldUpdate(taskId, fieldId, value);
          }
          setLocalFields((prev) => ({ ...prev, ...(parsedFields || {}) }));
          setDraftWarnings(warnings || []);
          advanceToInProgress();
          onFieldUpdate(taskId, '_aiDraftStatus', 'pending');
          abortRef.current = null;
          setStreamingText('');
        },
        onError: (err) => {
          if (err?.name === 'AbortError') {
            onFieldUpdate(taskId, '_aiDraftStatus', 'none');
          } else {
            const msg = err?.message || 'AI generation failed. Check console for details.';
            onFieldUpdate(taskId, '_aiDraftStatus', 'error');
            onFieldUpdate(taskId, '_aiDraftError', msg);
            console.error('[BBOS AI Draft]', err);
          }
          abortRef.current = null;
          setStreamingText('');
        },
      });
      // Caller may return a cancel handle; if so, keep using our controller as the cancel surface
      if (typeof result === 'function') {
        const callerCancel = result;
        const originalAbort = controller.abort.bind(controller);
        controller.abort = () => { try { callerCancel(); } catch { /* ignore */ } originalAbort(); };
      }
    } catch (err) {
      onFieldUpdate(taskId, '_aiDraftStatus', 'error');
      onFieldUpdate(taskId, '_aiDraftError', err?.message || 'AI generation failed.');
      abortRef.current = null;
      setStreamingText('');
    }
  };

  const handleCancelDraft = () => {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
  };

  const handleAcceptDraft = () => {
    onFieldUpdate(taskId, '_aiDraftStatus', 'accepted');
    setDraftWarnings([]);
  };

  const handleRejectDraft = () => {
    // Clear AI-generated field values
    for (const field of def.fields) {
      onFieldUpdate(taskId, field.id, '');
    }
    setLocalFields((prev) => {
      const cleared = { ...prev };
      for (const field of def.fields) cleared[field.id] = '';
      return cleared;
    });
    onFieldUpdate(taskId, '_aiDraftStatus', 'rejected');
    setDraftWarnings([]);
  };

  const handleDiscard = () => {
    if (!initialSnapshotRef.current) { handleClose.current(); return; }
    const snap = initialSnapshotRef.current;
    // Restore all field data
    for (const field of def.fields) {
      const original = snap.fields[field.id] || '';
      onFieldUpdate(taskId, field.id, original);
    }
    setLocalFields(snap.fields);
    // Restore notes
    onUpdateTask(taskId, { notes: snap.notes });
    setNotes(snap.notes);
    setDiscardConfirm(false);
    handleClose.current();
  };

  const handleDownloadTemplate = () => {
    downloadTaskTemplate(def);
  };

  const handleUploadTemplate = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      try {
        const json = JSON.parse(ev.target.result);
        const validation = validateTaskTemplate(json, def);
        if (!validation.valid) {
          alert('Template validation failed:\n' + validation.errors.join('\n'));
          return;
        }
        const { fieldData: importedFields, gLabel } = importTaskTemplate(json, def);
        for (const [fieldId, value] of Object.entries(importedFields)) {
          onFieldUpdate(taskId, fieldId, value);
        }
        setLocalFields((prev) => ({ ...prev, ...importedFields }));
        if (gLabel) handleGLabelChange(gLabel);
        advanceToInProgress();
        alert(`Template imported: ${Object.keys(importedFields).length} field(s) populated.`);
      } catch (err) {
        alert('Template import failed: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  const columns = project?.columns || [];
  const currentColumn = columns.find((c) => c.id === task.columnId);

  const STATUS_DOT_COLORS = {
    'To Do': 'var(--text3)',
    'In Progress': 'var(--col-progress, #f59e0b)',
    'Done': 'var(--success, #22c55e)',
  };

  const hasDeps = deps.upstream.length > 0 || deps.downstream.length > 0;

  const panel = (
    <div
      className={`bbos-task-panel${closing ? ' tdp-scale-out' : ' tdp-scale-in'}`}
      style={accentColor ? { '--btp-accent': accentColor } : undefined}
      onClick={(e) => e.stopPropagation()}
    >

      {/* ── Header ── */}
      <div className="btp-header">
        <div className="btp-header__info">
          {/* Badges row */}
          <div className="btp-header__badges">
            <span className="btp-stage-badge">{def.stage} · {def.subLevel}</span>
            <div className="btp-status-pill">
              <span
                className="btp-status-dot"
                style={{ background: STATUS_DOT_COLORS[currentColumn?.name] || 'var(--text3)' }}
              />
              <select
                className="btp-status-select"
                value={task.columnId}
                onChange={(e) => onMoveTask(projectId, taskId, e.target.value, undefined, project.columns)}
                aria-label="Task status"
              >
                {columns.map((c) => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Title */}
          <h1 className="btp-title">{def.label}</h1>

          {/* Meta row: assignee + governing attributes */}
          <div className="btp-header__meta">
            {/* Assignee */}
            <div className="btp-meta-item">
              <span className={`btp-meta-avatar${assignee ? ' btp-meta-avatar--filled' : ''}`}>
                {assignee ? getInitials(assignee.name) : '?'}
              </span>
              <select
                className="btp-status-select"
                value={task.assigneeId || ''}
                aria-label="Assignee"
                onChange={(e) => {
                  const val = e.target.value;
                  onUpdateTask(taskId, { assigneeId: val || null });
                  if (val) onAddProjectMember(projectId, val);
                }}
              >
                <option value="">Unassigned</option>
                {projectMembers.length > 0 && (
                  <optgroup label="Project members">
                    {projectMembers.map((emp) => (
                      <option key={emp.id} value={emp.id}>{emp.name}</option>
                    ))}
                  </optgroup>
                )}
                {allEmployees.filter((emp) => !(project?.members || []).includes(emp.id)).length > 0 && (
                  <optgroup label="Add from team">
                    {allEmployees
                      .filter((emp) => !(project?.members || []).includes(emp.id))
                      .map((emp) => (
                        <option key={emp.id} value={emp.id}>{emp.name}</option>
                      ))}
                  </optgroup>
                )}
              </select>
            </div>

            {stageAttrs.length > 0 && (
              <>
                <span className="btp-meta-divider" />
                <span className="btp-meta-item" style={{ color: 'var(--text3)', fontSize: '12px' }}>
                  {stageAttrs.map(a => a.name).join(' · ')}
                </span>
              </>
            )}
          </div>
        </div>

        <button type="button" className="btp-close-btn" onClick={() => handleClose.current()} aria-label="Close panel">
          <X size={18} />
        </button>
      </div>

      {/* ── View-only banner ── */}
      {isViewOnly && (
        <div className="btp-view-banner">
          <Eye size={14} />
          VIEW ONLY — The {getBbosRole(bbosRole).label} role has read-only access
        </div>
      )}

      {/* ── Body ── */}
      <div className="btp-body">

        {/* Purpose */}
        <div className="btp-purpose-section">
          <div className="btp-section-label">Purpose</div>
          <p className="btp-purpose-text">{def.purpose}</p>
        </div>

        {/* Bento grid: Dependencies + Template */}
        {(
          <div className="btp-bento">
            {/* Dependencies card */}
            <div className="btp-bento-card">
              <h3 className="btp-bento-card__title">Dependencies</h3>
              {hasDeps ? (
                <div className="btp-dep-chips">
                  {deps.upstream.map((u) => (
                    <span key={u.id} className="btp-dep-chip">
                      <ArrowUpRight size={12} /> {u.id}
                    </span>
                  ))}
                  {deps.downstream.map((d) => (
                    <span key={d.id} className="btp-dep-chip">
                      <ArrowDownRight size={12} /> {d.id}
                    </span>
                  ))}
                </div>
              ) : (
                <span className="btp-bento-card__subtitle">No dependencies</span>
              )}
            </div>

            {/* Template card */}
            <div className="btp-bento-card">
              <h3 className="btp-bento-card__title">Task Template</h3>
              <span className="btp-bento-card__subtitle">JSON import/export</span>
              <div className="btp-template-card">
                <div className="btp-template-btns">
                  <button type="button" className="btp-template-icon-btn" onClick={handleDownloadTemplate} title="Download template" aria-label="Download template">
                    <Download size={16} />
                  </button>
                  <button type="button" className="btp-template-icon-btn" onClick={() => templateInputRef.current?.click()} title="Upload template" aria-label="Upload template">
                    <Upload size={16} />
                  </button>
                  <input
                    ref={templateInputRef}
                    type="file"
                    accept=".json,.bbos"
                    onChange={handleUploadTemplate}
                    style={{ display: 'none' }}
                    aria-label="Upload task template file"
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Rationale accordion */}

        <div className="btp-rationale-card">
          <button
            type="button"
            className="btp-rationale-toggle"
            onClick={() => setRationaleOpen(!rationaleOpen)}
            aria-expanded={rationaleOpen}
          >
            <div className="btp-rationale-toggle__left">
              <BookOpen size={18} />
              <span className="btp-rationale-toggle__title">Theological Rationale</span>
            </div>
            {rationaleOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
          {rationaleOpen && stageAttrs.length > 0 && (
            <div className="btp-rationale-text">
              {stageAttrs.map((a) => (
                <p key={a.name} style={{ marginBottom: '0.75em' }}>
                  <strong>{a.name}</strong> ({a.title}) — {a.body}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Validation error banner */}
        {validationErrors.length > 0 && (
          <div className="btp-validation-banner">
            <AlertTriangle size={16} />
            <span>{validationErrors.length} required field{validationErrors.length > 1 ? 's' : ''} must be completed before marking Done</span>
          </div>
        )}

        {/* Form fields */}
        <div className="btp-fields">
          {def.fields.map((field) => (
            <InternalErrorBoundary key={field.id} name={field.label}>
              <div className={`btp-field${validationErrors.includes(field.id) ? ' btp-field--error' : ''}`}>
                <label className="btp-field-label" htmlFor={`btp-field-${field.id}`}>
                  {field.label}
                  {validationErrors.includes(field.id) && <span className="btp-field-required"> *</span>}
                </label>
                {field.type === 'textarea' ? (
                  <textarea
                    id={`btp-field-${field.id}`}
                    className="btp-field-textarea"
                    rows={field.rows || 3}
                    placeholder={field.placeholder || ''}
                    value={localFields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    readOnly={isViewOnly}
                  />
                ) : field.type === 'select' ? (
                  <select
                    id={`btp-field-${field.id}`}
                    className="btp-field-select"
                    value={localFields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    disabled={isViewOnly}
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                ) : field.type === 'number' ? (
                  <input
                    id={`btp-field-${field.id}`}
                    type="number"
                    className="btp-field-input"
                    placeholder={field.placeholder || ''}
                    value={localFields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    readOnly={isViewOnly}
                  />
                ) : (
                  <textarea
                    id={`btp-field-${field.id}`}
                    className="btp-field-input btp-field-textarea"
                    placeholder={field.placeholder || ''}
                    value={localFields[field.id] || ''}
                    onChange={(e) => handleFieldChange(field.id, e.target.value)}
                    rows={2}
                    readOnly={isViewOnly}
                  />
                )}
              </div>
            </InternalErrorBoundary>
          ))}
        </div>

        {/* G-Label */}
        {def.hasGLabel && (
          <div className="btp-section btp-glabel-row">
            <span className="btp-section-label">Integrity Label</span>
            {renderGLabelPicker
              ? renderGLabelPicker({ value: task.gLabel || null, onChange: handleGLabelChange })
              : <FallbackGLabelPicker value={task.gLabel || null} onChange={handleGLabelChange} />}
          </div>
        )}

        {/* Notes */}
        <div className="btp-section">
          <div className="btp-section-label">Notes</div>
          <div className="btp-notes-container">
            <textarea
              id="btp-notes"
              className="btp-notes-textarea"
              value={notes}
              onChange={handleNotesChange}
              placeholder="Write your thoughts or key learnings here..."
              rows={4}
              aria-label="Notes"
            />
          </div>
        </div>

        {/* Validation flags */}
        {def.validationFlags?.length > 0 && (
          <div className="btp-flags">
            {def.validationFlags.map((flag) => {
              const info = BBOS_VALIDATION_FLAG_LABELS[flag];
              if (!info) return null;
              return (
                <div key={flag} className="btp-flag">
                  <AlertTriangle size={14} className="btp-flag-icon" />
                  <div>
                    <div className="btp-flag-label">{info.label}</div>
                    <div className="btp-flag-detail">{info.detail}</div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* AI Draft section */}
        {def.hasAiDraft && (
          <InternalErrorBoundary name="AI Draft">
          <div className="btp-draft-section">
            <div className="btp-section-label">AI Draft</div>

            {!aiAvailable && (
              <div className="btp-draft-no-key">
                <AlertTriangle size={14} />
                <span>Set your AI provider and API key in Settings to use AI drafts.</span>
              </div>
            )}

            {aiAvailable && aiDraftStatus === 'none' && (
              <button type="button" className="btp-generate-btn" onClick={handleGenerateDraft}>
                <Sparkles size={14} /> Generate Draft
              </button>
            )}

            {aiDraftStatus === 'generating' && (
              <div className="btp-draft-generating">
                <div className="btp-draft-status btp-draft-status--generating">
                  <Loader size={14} className="btp-spinner" /> Generating draft...
                </div>
                {streamingText && (
                  <div className="btp-draft-preview">
                    {streamingText.length > 300 ? '...' + streamingText.slice(-300) : streamingText}
                  </div>
                )}
                <button type="button" className="btp-draft-btn btp-draft-btn--cancel" onClick={handleCancelDraft}>
                  <Ban size={14} /> Cancel
                </button>
              </div>
            )}

            {aiDraftStatus === 'pending' && (
              <div className="btp-draft-pending">
                <div className="btp-draft-status btp-draft-status--pending">
                  <Sparkles size={14} /> AI-Generated Draft · {formatDateTime(aiDraftTimestamp)}
                </div>
                {draftWarnings.length > 0 && (
                  <div className="btp-draft-warnings">
                    {draftWarnings.map((w, i) => (
                      <div key={i} className="btp-draft-warning">
                        <AlertTriangle size={14} /> {w}
                      </div>
                    ))}
                  </div>
                )}
                <div className="btp-draft-actions">
                  <button type="button" className="btp-draft-btn btp-draft-btn--accept" onClick={handleAcceptDraft}>
                    <Check size={14} /> Accept Draft
                  </button>
                  <button type="button" className="btp-draft-btn btp-draft-btn--reject" onClick={handleRejectDraft}>
                    <RotateCcw size={14} /> Reject Draft
                  </button>
                </div>
              </div>
            )}

            {aiDraftStatus === 'accepted' && (
              <div className="btp-draft-status btp-draft-status--accepted">
                <Check size={14} /> Draft Accepted
              </div>
            )}

            {aiDraftStatus === 'error' && (
              <div className="btp-draft-error">
                <div className="btp-draft-status btp-draft-status--error">
                  <AlertTriangle size={14} /> {fieldData._aiDraftError || 'AI generation failed.'}
                </div>
                <button type="button" className="btp-generate-btn" onClick={handleGenerateDraft}>
                  <RotateCcw size={14} /> Retry
                </button>
              </div>
            )}

            {aiAvailable && aiDraftStatus === 'rejected' && (
              <button type="button" className="btp-generate-btn" onClick={handleGenerateDraft}>
                <RotateCcw size={14} /> Regenerate Draft
              </button>
            )}
          </div>
          </InternalErrorBoundary>
        )}
      </div>

      {/* ── Footer ── */}
      <div className="btp-footer">
        <span className="btp-footer-meta">
          {user?.name || 'You'} · {formatDateTime(task.createdAt)}
        </span>
        <div className="btp-footer-actions">
          {!discardConfirm ? (
            <button type="button" className="btp-discard-btn" onClick={() => setDiscardConfirm(true)}>
              Discard Changes
            </button>
          ) : (
            <button type="button" className="btp-discard-btn" style={{ color: 'var(--danger)' }} onClick={handleDiscard}>
              Confirm Discard?
            </button>
          )}
          <button type="button" className="btp-save-later-btn" onClick={() => handleClose.current()}>
            <Bookmark size={14} /> Save for Later
          </button>
          <button type="button" className={`btp-done-btn${validationErrors.length ? ' btp-done-btn--shake' : ''}`} onClick={() => {
            // Validate: all defined fields must have content
            const empty = (def.fields || [])
              .filter((f) => {
                const val = localFields[f.id];
                return !val || (typeof val === 'string' && !val.trim());
              })
              .map((f) => f.id);
            if (empty.length > 0) {
              setValidationErrors(empty);
              // Scroll to first error field
              const firstErr = document.getElementById(`btp-field-${empty[0]}`);
              if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
              return;
            }
            setValidationErrors([]);
            handleClose.current();
          }}>
            <Check size={14} /> Done
          </button>
        </div>
      </div>
    </div>
  );

  const modal = runwayModal ? (
    <RunwayDateModal
      allTasks={runwayModal.allTasks}
      runwayMonths={runwayModal.runwayMonths}
      onUpdateTask={onUpdateTask}
      onClose={() => setRunwayModal(null)}
    />
  ) : null;

  return createPortal(
    <div className={`tdp-overlay${closing ? ' tdp-overlay--closing' : ''}`} onClick={() => handleClose.current()}>
      {panel}
      {modal}
    </div>,
    document.body
  );
}

// ── Runway Date Modal ──────────────────────────────────────────────────────

function formatPreviewDate(dateStr) {
  return new Date(dateStr + 'T00:00:00').toLocaleDateString('en', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

function computePreview(allTasks, runwayMonths, startDate) {
  const start = new Date(startDate + 'T00:00:00');
  const totalMs = runwayMonths * 30 * 24 * 60 * 60 * 1000;
  return allTasks.map((t, i) => {
    const fraction = (i + 1) / allTasks.length;
    const d = new Date(start.getTime() + fraction * totalMs);
    return {
      task: t,
      dueDate: d.toISOString().split('T')[0],
      hasExisting: Boolean(t.dueDate),
      stageId: t.bbosTaskType?.split('-')[0] ?? '—',
    };
  });
}

function RunwayDateModal({ allTasks, runwayMonths, onUpdateTask, onClose }) {
  const today = new Date().toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(today);
  const [overwrite, setOverwrite] = useState(true);

  const preview = useMemo(
    () => computePreview(allTasks, runwayMonths, startDate),
    [allTasks, runwayMonths, startDate]
  );

  const existingCount = allTasks.filter((t) => t.dueDate).length;

  const handleApply = () => {
    preview.forEach(({ task: t, dueDate, hasExisting }) => {
      if (hasExisting && !overwrite) return;
      onUpdateTask(t.id, { dueDate });
    });
    onClose();
  };

  return createPortal(
    <div className="rda-overlay" onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="rda-modal">

        {/* Header */}
        <div className="rda-header">
          <div className="rda-header-title">
            <span className="rda-header-icon">📅</span>
            <span>Runway Date Assignment</span>
          </div>
          <button className="rda-close" onClick={onClose} aria-label="Close">
            <X size={16} />
          </button>
        </div>

        {/* Meta */}
        <div className="rda-meta">
          <span className="rda-meta-pill">{runwayMonths} month{runwayMonths !== 1 ? 's' : ''}</span>
          <span className="rda-meta-sep">·</span>
          <span>{allTasks.length} tasks distributed evenly</span>
        </div>

        {/* Start date */}
        <div className="rda-field">
          <label className="rda-label" htmlFor="rda-start-date">Start date</label>
          <input
            id="rda-start-date"
            type="date"
            className="rda-date-input"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value || today)}
          />
        </div>

        {/* Timeline preview */}
        <div className="rda-timeline-label">Timeline preview</div>
        <div className="rda-timeline">
          {preview.map(({ task: t, dueDate, hasExisting, stageId }, i) => (
            <div key={t.id} className={`rda-row${hasExisting ? ' rda-row--existing' : ''}`}>
              <span className="rda-row-num">{i + 1}</span>
              <span className="rda-row-stage">{stageId}</span>
              <span className="rda-row-title">{t.title?.replace(/^[A-Z]+-\w+\s·\s/, '')}</span>
              <span className="rda-row-date">{formatPreviewDate(dueDate)}</span>
              {hasExisting && <span className="rda-row-dot" title="Has existing date" />}
            </div>
          ))}
        </div>

        {/* Overwrite toggle — only if some tasks already have dates */}
        {existingCount > 0 && (
          <label className="rda-overwrite">
            <input
              type="checkbox"
              checked={overwrite}
              onChange={(e) => setOverwrite(e.target.checked)}
            />
            <span>
              Overwrite {existingCount} task{existingCount !== 1 ? 's' : ''} with existing date{existingCount !== 1 ? 's' : ''}
            </span>
          </label>
        )}

        {/* Actions */}
        <div className="rda-actions">
          <button type="button" className="rda-btn rda-btn--ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="rda-btn rda-btn--primary" onClick={handleApply}>
            Apply Dates
          </button>
        </div>

      </div>
    </div>,
    document.body
  );
}
