import Link from "next/link";

interface ArticleCardProps {
  slug: string;
  title: string;
  category: string;
  readTime: string;
  date?: string;
}

const formatDate = (raw?: string) => {
  if (!raw) return null;
  const d = new Date(raw);
  if (Number.isNaN(d.getTime())) return raw;
  return d
    .toLocaleDateString("en-US", { month: "short", year: "numeric" })
    .toUpperCase();
};

export function ArticleCard({ slug, title, category, readTime, date }: ArticleCardProps) {
  return (
    <Link
      href={`/blog/${slug}`}
      className="group block py-8"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="flex items-center justify-between mb-8">
        <span
          className="font-mono text-[11px] tracking-[0.1em]"
          style={{ color: "var(--fg-mute)" }}
        >
          {formatDate(date) ?? "—"}
        </span>
        <span
          className="font-mono text-[11px] tracking-[0.1em]"
          style={{ color: "var(--fg-mute)" }}
        >
          {readTime.toUpperCase()}
        </span>
      </div>
      <div className="eyebrow mb-3" style={{ color: "var(--signal)" }}>
        {category}
      </div>
      <h3 className="serif text-[26px] leading-[1.15] group-hover:italic transition-all duration-500 text-fg">
        {title}
      </h3>
      <div
        className="mt-10 font-mono text-[11px] tracking-[0.1em] flex items-center gap-2 group-hover:gap-3 transition-all text-fg"
      >
        READ ENTRY →
      </div>
    </Link>
  );
}
