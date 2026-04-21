"use client";

import Link from "next/link";
import { ArticleCard } from "@/app/components/ArticleCard";
import { type BlogPost } from "@/lib/blog-data";
import { useReveal } from "@/hooks/useReveal";

interface BlogProps {
  posts: BlogPost[];
}

const ModernBlog = ({ posts }: BlogProps) => {
  useReveal();
  const featured = posts.slice(0, 3);

  return (
    <section
      id="journal"
      className="py-32 md:py-40 relative"
      style={{
        background: "color-mix(in srgb, var(--bg-elev) 85%, transparent)",
        backdropFilter: "blur(4px)",
        WebkitBackdropFilter: "blur(4px)",
      }}
    >
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-16 reveal">
          <span className="idx">— 004 · JOURNAL</span>
          <div className="flex-1 dotline" />
          <Link
            href="/blog"
            className="font-mono text-[12px] tracking-[0.1em] arrow-link text-fg"
          >
            ALL ENTRIES →
          </Link>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-14">
          <div className="col-span-12 md:col-span-6">
            <h2 className="display text-[32px] md:text-[44px] leading-[1.05] reveal text-fg">
              Notes from the <span className="italic-serif">workbench.</span>
            </h2>
          </div>
        </div>

        {featured.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 reveal-stagger">
            {featured.map((post) => (
              <ArticleCard
                key={post.slug}
                slug={post.slug}
                title={post.title}
                category={post.category}
                readTime={post.readTime}
                date={post.date}
              />
            ))}
          </div>
        ) : (
          <div
            className="py-16 text-center"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-[16px] text-fg-dim">
              New entries are drafting. Check back soon.
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ModernBlog;
