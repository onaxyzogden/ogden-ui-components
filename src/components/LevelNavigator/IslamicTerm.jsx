import { useState, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { formatArabic } from '../../utils/arabic';
import './IslamicTerm.css';

const TOOLTIP_W = 252;
const GAP = 10;
const MIN_ABOVE = 180;

/**
 * IslamicTerm — wraps an Islamic/Arabic term with a hover tooltip definition.
 * Tooltip renders via portal to escape overflow:hidden ancestors.
 *
 * Props:
 *   entry            — { term, arabic?, transliteration?, meaning, source? }
 *                      Provide null/undefined to render children with no tooltip.
 *   tooltipsEnabled  — defaults to true; consumers can wire this to a settings flag
 *   showDiacritics   — defaults to true; controls whether harakat are stripped
 *   children         — optional custom label; defaults to entry.term
 */
export default function IslamicTerm({
  entry,
  tooltipsEnabled = true,
  showDiacritics = true,
  children,
}) {
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState({ top: undefined, bottom: undefined, left: 0, flipped: false });
  const triggerRef = useRef(null);

  const show = useCallback(() => {
    if (!triggerRef.current) return;
    const r = triggerRef.current.getBoundingClientRect();
    const flipped = r.top < MIN_ABOVE;
    const top = flipped ? r.bottom + GAP : undefined;
    const bottom = flipped ? undefined : window.innerHeight - r.top + GAP;
    let left = r.left + r.width / 2 - TOOLTIP_W / 2;
    left = Math.max(8, Math.min(left, window.innerWidth - TOOLTIP_W - 8));
    setPos({ top, bottom, left, flipped });
    setVisible(true);
  }, []);

  const hide = useCallback(() => setVisible(false), []);

  if (!entry) return children ?? null;

  const tooltipId = `islamic-tooltip-${entry.term?.replace(/\s+/g, '-').toLowerCase() || 'term'}`;

  return (
    <span
      ref={triggerRef}
      className="islamic-term"
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={hide}
      tabIndex={0}
      role="note"
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children ?? entry.term}

      {visible && tooltipsEnabled && createPortal(
        <span
          id={tooltipId}
          className={`islamic-term__tooltip${pos.flipped ? ' islamic-term__tooltip--below' : ''}`}
          role="tooltip"
          style={{ top: pos.top, bottom: pos.bottom, left: pos.left }}
        >
          <span className="islamic-term__header">
            <span className="islamic-term__name">{entry.term}</span>
            {entry.arabic && (
              <span className="islamic-term__arabic">{formatArabic(entry.arabic, showDiacritics)}</span>
            )}
          </span>

          {entry.transliteration && (
            <span className="islamic-term__trans">{entry.transliteration}</span>
          )}

          <span className="islamic-term__meaning">{entry.meaning}</span>

          {entry.source && (
            <span className="islamic-term__source">{entry.source}</span>
          )}
        </span>,
        document.body
      )}
    </span>
  );
}
