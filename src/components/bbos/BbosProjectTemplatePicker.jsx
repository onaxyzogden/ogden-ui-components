import { useState, useEffect } from 'react';
import { Folder, Workflow } from 'lucide-react';
import './BbosProjectTemplatePicker.css';

const DEFAULT_PILLAR_OPTIONS = [
  { id: '',            label: 'Unassigned' },
  { id: 'faith',       label: 'Faith' },
  { id: 'health',      label: 'Health' },
  { id: 'intellect',   label: 'Intellect' },
  { id: 'family',      label: 'Family' },
  { id: 'wealth',      label: 'Wealth' },
  { id: 'environment', label: 'Environment' },
  { id: 'ummah',       label: 'Community' },
];

const NO_SUBMODULES = () => [];
const IDENTITY_LABEL = (id) => id;

export default function BbosProjectTemplatePicker({
  open,
  onClose,
  pillarOptions = DEFAULT_PILLAR_OPTIONS,
  submoduleOptionsForPillar = NO_SUBMODULES,
  getSubmoduleDisplayLabel = IDENTITY_LABEL,
  defaultPillar = '',
  onCreate,
}) {
  const [name, setName] = useState('');
  const [type, setType] = useState('standard');
  const [pillar, setPillar] = useState(defaultPillar);
  const [submodule, setSubmodule] = useState('');

  useEffect(() => {
    if (open) {
      setName('');
      setType('standard');
      setPillar(defaultPillar);
      setSubmodule('');
    }
  }, [open, defaultPillar]);

  if (!open) return null;

  const submoduleOptions = pillar ? submoduleOptionsForPillar(pillar) : [];

  const handleCreate = () => {
    const finalName = name.trim() || 'New Project';
    const moduleId = submodule || pillar || null;
    onCreate?.({
      name: finalName,
      type,
      bbosEnabled: type === 'bbos',
      moduleId,
    });
  };

  return (
    <div className="bbos-tpl-overlay" onClick={onClose}>
      <div className="bbos-tpl-modal" onClick={(e) => e.stopPropagation()}>
        <h3 className="bbos-tpl-title">New Project</h3>
        <input
          className="bbos-tpl-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Project name"
          autoFocus
          onKeyDown={(e) => { if (e.key === 'Enter') handleCreate(); }}
        />

        <p className="bbos-tpl-section-label">Pillar</p>
        <select
          className="bbos-tpl-select"
          value={pillar}
          onChange={(e) => { setPillar(e.target.value); setSubmodule(''); }}
        >
          {pillarOptions.map((opt) => (
            <option key={opt.id} value={opt.id}>{opt.label}</option>
          ))}
        </select>

        {submoduleOptions.length > 0 && (
          <>
            <p className="bbos-tpl-section-label">Submodule</p>
            <select
              className="bbos-tpl-select"
              value={submodule}
              onChange={(e) => setSubmodule(e.target.value)}
            >
              <option value="">Any submodule</option>
              {submoduleOptions.map((id) => (
                <option key={id} value={id}>{getSubmoduleDisplayLabel(id, id)}</option>
              ))}
            </select>
          </>
        )}

        <p className="bbos-tpl-section-label">Project Type</p>
        <div className="bbos-tpl-type-row">
          <button
            type="button"
            className={`bbos-tpl-type-btn${type === 'standard' ? ' bbos-tpl-type-btn--active' : ''}`}
            onClick={() => setType('standard')}
          >
            <div className="bbos-tpl-type-head">
              <Folder size={16} />
              <strong>Standard</strong>
            </div>
            <p>3-column Kanban board (To Do, In Progress, Done)</p>
          </button>
          <button
            type="button"
            className={`bbos-tpl-type-btn bbos-tpl-type-btn--bbos${type === 'bbos' ? ' bbos-tpl-type-btn--active' : ''}`}
            onClick={() => setType('bbos')}
          >
            <div className="bbos-tpl-type-head">
              <Workflow size={16} className="bbos-tpl-type-icon-bbos" />
              <strong>BBOS Pipeline</strong>
            </div>
            <p>9-stage business cultivation pipeline (Think / Execute / Reckon)</p>
          </button>
        </div>

        <div className="bbos-tpl-actions">
          <button type="button" className="bbos-tpl-btn bbos-tpl-btn--ghost" onClick={onClose}>Cancel</button>
          <button type="button" className="bbos-tpl-btn bbos-tpl-btn--primary" onClick={handleCreate}>Create</button>
        </div>
      </div>
    </div>
  );
}
