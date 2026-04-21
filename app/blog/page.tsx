import { getBlogPosts } from "@/lib/blog-data";
import { ArticleCard } from "../components/ArticleCard";

export const dynamic = "force-static";
export const revalidate = 3600;

export const metadata = {
  title: "Journal | David Kalina",
  description: "Notes on software, tooling, and the seams between systems.",
};

export default async function BlogPage() {
  const posts = await getBlogPosts();

  return (
    <main className="min-h-screen pt-36 pb-32">
      <div className="max-w-page mx-auto px-6 md:px-8">
        <div className="flex items-center gap-3 mb-20">
          <span className="idx">— JOURNAL · ALL ENTRIES</span>
          <div className="flex-1 dotline" />
          <span className="idx">{String(posts.length).padStart(2, "0")} TOTAL</span>
        </div>

        <div className="grid grid-cols-12 gap-8 mb-20">
          <div className="col-span-12 md:col-span-7">
            <h1 className="display text-[56px] md:text-[72px] leading-[1] text-fg">
              Notes from the <span className="italic-serif">workbench.</span>
            </h1>
          </div>
          <div className="col-span-12 md:col-span-5 pt-4">
            <p className="text-[16px] leading-[1.6] text-fg-dim">
              Writing about software development, tooling, and the intersection of code and the
              humans who use it.
            </p>
          </div>
        </div>

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
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
            className="py-20 text-center"
            style={{ borderTop: "1px solid var(--border)" }}
          >
            <p className="text-[16px] text-fg-dim max-w-md mx-auto">
              New entries are drafting. Check back soon.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
