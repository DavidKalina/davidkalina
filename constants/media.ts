// Builds public CDN URLs for portfolio media stored in the DigitalOcean
// Spaces bucket (infra/portfolio-media). The bucket is public-read, so the
// browser fetches these with NO credentials — the base is therefore safe to
// expose via a NEXT_PUBLIC_ env var.
//
// Set this in .env.local to the Terraform `cdn_base` output, e.g.
//   NEXT_PUBLIC_MEDIA_CDN_BASE=https://davidkalina-portfolio.sfo3.cdn.digitaloceanspaces.com
//
// Falling back to "" means an unconfigured environment yields a relative
// "/<key>" path — harmless (the <video> just won't load) rather than a crash,
// so the site still builds on Vercel before the bucket exists.
const CDN_BASE = (process.env.NEXT_PUBLIC_MEDIA_CDN_BASE ?? "").replace(
  /\/$/,
  "",
);

/**
 * `mediaUrl("route-king/demo.mp4")` -> full CDN URL for that object key.
 *
 * Returns "" when NEXT_PUBLIC_MEDIA_CDN_BASE is unset. That empty string is
 * load-bearing: `Projects.tsx` treats a falsy `demoVideoSrc` as "no video"
 * and renders the CSS-placeholder demo, so an unconfigured build degrades
 * cleanly instead of mounting a <video> that 404s on a relative path.
 */
export function mediaUrl(key: string): string {
  if (!CDN_BASE) return "";
  const clean = key.replace(/^\//, "");
  return `${CDN_BASE}/${clean}`;
}
