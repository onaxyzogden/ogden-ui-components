import { useState, useRef, useEffect, useCallback } from 'react';
import { BBOS_ROLES } from '../../data/bbos/bbos-role-access';
import BbosRoleBadge from './BbosRoleBadge';
import './BbosRolePicker.css';

export default function BbosRolePicker({ value, onChange }) {
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const ref = useRef(null);
  const listRef = useRef(null);
  const triggerId = 'bbos-role-trigger';
  const listboxId = 'bbos-role-listbox';

  const selectedIndex = BBOS_ROLES.findIndex((r) => r.id === (value || 'all'));

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Scroll active option into view
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    const el = listRef.current?.querySelector(`[data-index="${activeIndex}"]`);
    el?.scrollIntoView({ block: 'nearest' });
  }, [open, activeIndex]);

  const openList = useCallback(() => {
    setOpen(true);
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : 0);
  }, [selectedIndex]);

  const select = useCallback((index) => {
    onChange(BBOS_ROLES[index].id);
    setOpen(false);
  }, [onChange]);

  const handleTriggerKeyDown = (e) => {
    switch (e.key) {
      case 'Enter':
      case ' ':
      case 'ArrowDown':
        e.preventDefault();
        if (!open) openList();
        else if (e.key === 'Enter' || e.key === ' ') select(activeIndex);
        break;
      case 'ArrowUp':
        e.preventDefault();
        if (!open) openList();
        break;
      case 'Escape':
        if (open) { e.preventDefault(); setOpen(false); }
        break;
      case 'Home':
        if (open) { e.preventDefault(); setActiveIndex(0); }
        break;
      case 'End':
        if (open) { e.preventDefault(); setActiveIndex(BBOS_ROLES.length - 1); }
        break;
      default:
        break;
    }
  };

  const handleListKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setActiveIndex((i) => (i + 1) % BBOS_ROLES.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setActiveIndex((i) => (i - 1 + BBOS_ROLES.length) % BBOS_ROLES.length);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        if (activeIndex >= 0) select(activeIndex);
        break;
      case 'Escape':
        e.preventDefault();
        setOpen(false);
        ref.current?.querySelector('button')?.focus();
        break;
      case 'Home':
        e.preventDefault();
        setActiveIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setActiveIndex(BBOS_ROLES.length - 1);
        break;
      default:
        break;
    }
  };

  const activeOptionId = activeIndex >= 0 ? `bbos-role-opt-${activeIndex}` : undefined;

  return (
    <div ref={ref} className="bbos-role-picker">
      <button
        id={triggerId}
        type="button"
        className="bbos-role-picker__trigger"
        onClick={() => open ? setOpen(false) : openList()}
        onKeyDown={handleTriggerKeyDown}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-activedescendant={open ? activeOptionId : undefined}
      >
        <BbosRoleBadge roleId={value || 'all'} />
        <span className="bbos-role-picker__label">
          {BBOS_ROLES.find((r) => r.id === (value || 'all'))?.label || 'Role'}
        </span>
      </button>

      {open && (
        <div
          ref={listRef}
          id={listboxId}
          role="listbox"
          aria-labelledby={triggerId}
          className="bbos-role-picker__list"
          onKeyDown={handleListKeyDown}
          tabIndex={-1}
        >
          {BBOS_ROLES.map((role, i) => {
            const isSelected = (value || 'all') === role.id;
            const isActive = i === activeIndex;
            return (
              <div
                key={role.id}
                id={`bbos-role-opt-${i}`}
                role="option"
                aria-selected={isSelected}
                data-index={i}
                className={
                  'bbos-role-picker__option' +
                  (isSelected ? ' bbos-role-picker__option--selected' : '') +
                  (isActive ? ' bbos-role-picker__option--active' : '')
                }
                onClick={() => select(i)}
                onMouseEnter={() => setActiveIndex(i)}
              >
                <BbosRoleBadge roleId={role.id} />
                <span className="bbos-role-picker__option-label">{role.label}</span>
                <span className="bbos-role-picker__option-desc">{role.description}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
