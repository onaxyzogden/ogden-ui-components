import './MaqasidNextActionCard.css';

/**
 * Sector-adjacent "Next" card — rendered inside the wheel SVG via <foreignObject>
 * at the hovered sector's outer midangle. Flips leftward for left-half sectors so
 * the card always opens away from the wheel center.
 */
export default function MaqasidNextActionCard({ x, y, flip, levelColor, text, label = 'Next', width = 160, height = 40, multiline = false }) {
  if (!text) return null;
  const W = width;
  const H = height;
  return (
    <foreignObject
      x={flip ? x - W : x}
      y={y - H / 2}
      width={W}
      height={H}
      className="mcw-next-card-fo"
      pointerEvents="none"
      style={{ overflow: 'visible' }}
    >
      <div className={`mcw-next-card${multiline ? ' mcw-next-card--wrap' : ''}`} style={{ borderColor: levelColor }}>
        <span className="mcw-next-card-label">{label}</span>
        <span className="mcw-next-card-text">{text}</span>
      </div>
    </foreignObject>
  );
}
