import { createPortal } from 'react-dom';
import { formatArabic } from '../../utils/arabic';
import './WheelWisdomTooltip.css';

const TOOLTIP_W = 260;
const TOOLTIP_OFFSET = 14;

export default function WheelWisdomTooltip({ wisdom, x, y, levelColor, showDiacritics = true }) {
  if (!wisdom || typeof document === 'undefined') return null;

  const vw = typeof window !== 'undefined' ? window.innerWidth : 1024;
  const maxLeft = vw - TOOLTIP_W - 8;
  const left = Math.max(8, Math.min(maxLeft, x + TOOLTIP_OFFSET));
  const top = Math.max(8, y + TOOLTIP_OFFSET);

  return createPortal(
    <div
      className="wwt-card"
      style={{
        left: `${left}px`,
        top: `${top}px`,
        borderColor: levelColor,
      }}
      role="tooltip"
    >
      <div className="wwt-arabic">{formatArabic(wisdom.arabic, showDiacritics)}</div>
      <div className="wwt-english">{wisdom.english}</div>
      <div className="wwt-citation" style={{ color: levelColor }}>
        {wisdom.citation}
      </div>
    </div>,
    document.body,
  );
}
