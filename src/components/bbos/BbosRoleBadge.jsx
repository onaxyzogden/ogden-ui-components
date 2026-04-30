import { getBbosRole } from '../../data/bbos/bbos-role-access';

export default function BbosRoleBadge({ roleId, size = 'sm' }) {
  const role = getBbosRole(roleId);
  if (!role) return null;

  const isSm = size === 'sm';

  return (
    <span
      title={`${role.label} — ${role.description}`}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '3px',
        padding: isSm ? '1px 6px' : '2px 8px',
        fontSize: isSm ? '0.65rem' : '0.72rem',
        fontWeight: 600,
        fontFamily: "var(--font-mono)",
        color: role.color,
        background: role.bg,
        border: `1px solid ${role.color}30`,
        borderRadius: '4px',
        letterSpacing: '0.03em',
        lineHeight: 1.4,
        whiteSpace: 'nowrap',
      }}
    >
      {role.abbr}
    </span>
  );
}
