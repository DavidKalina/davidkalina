// Shared project card components

const TechIcon = ({ name }) => {
  const size = 18;
  switch (name) {
    case "react":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
          <circle cx="12" cy="12" r="2" fill="var(--pc-accent-2)" />
          <g stroke="var(--pc-accent-2)" strokeWidth="1" fill="none">
            <ellipse cx="12" cy="12" rx="10" ry="4" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
            <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
          </g>
        </svg>
      );
    case "ts":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24">
          <rect x="1" y="1" width="22" height="22" rx="2" fill="var(--pc-accent-3)" />
          <text x="12" y="17" textAnchor="middle" fill="#fff" fontFamily="var(--pc-mono)" fontSize="11" fontWeight="700">TS</text>
        </svg>
      );
    case "ai":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--pc-accent)" strokeWidth="1.5">
          <path d="M5 20 L12 4 L19 20" />
          <path d="M8 14 L16 14" />
        </svg>
      );
    case "mcp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--pc-accent)" strokeWidth="1.5">
          <path d="M5 20 L12 4 L19 20" />
          <path d="M8 14 L16 14" />
        </svg>
      );
    case "gp":
      return (
        <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="var(--pc-fg-dim)" strokeWidth="1.5">
          <path d="M12 22 C12 22 4 14 4 9 A8 8 0 0 1 20 9 C20 14 12 22 12 22 Z" />
          <circle cx="12" cy="9" r="2.5" />
        </svg>
      );
    default:
      return null;
  }
};

const Chip = ({ icon, label, className = "" }) => (
  <div className={`pc-chip ${className}`}>
    <span className="pc-chip-icon"><TechIcon name={icon} /></span>
    <span className="pc-chip-label">{label}</span>
  </div>
);

// Left-side meta block (shared)
const ProjectMeta = ({ data }) => (
  <div className="pc-meta">
    <div className="pc-index">{data.index}</div>
    <h2 className="pc-title">{data.title}</h2>
    <p className="pc-desc">{data.description}</p>
    {data.tags && (
      <div className="pc-tags">
        {data.tags.map((t) => <span key={t}>{t}</span>)}
      </div>
    )}
  </div>
);

Object.assign(window, { TechIcon, Chip, ProjectMeta });
