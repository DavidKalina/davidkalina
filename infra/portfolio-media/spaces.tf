# The portfolio media bucket. Objects are made public individually with a
# `public-read` ACL at upload time (the upload script and `aws s3 cp --acl
# public-read` both set it). We deliberately do NOT use a bucket-wide
# public-read policy here: `PutBucketPolicy` requires a legacy *full-access*
# Spaces key, and DO's current "all permissions" keys are scoped keys that
# return 403 on it. Per-object ACL needs only the scoped read/write key below
# and is plenty for a handful of demo clips. (If you ever want set-and-forget
# bucket-wide public read, create a full-access Spaces key and re-add the
# `digitalocean_spaces_bucket_policy` resource — see the commented block at
# the bottom of this file.)
resource "digitalocean_spaces_bucket" "media" {
  name   = var.bucket_name
  region = var.do_region
  acl    = "private"

  # Allow GET/HEAD from the browser so a <video> on davidkalina.com can range-
  # request the MP4 for scrubbing. PUT is allowed too so the upload script can
  # run from anywhere; the scoped key is the real auth gate, CORS only governs
  # browser preflight.
  cors_rule {
    allowed_methods = ["GET", "HEAD", "PUT"]
    allowed_origins = var.cors_allowed_origins
    allowed_headers = ["*"]
    max_age_seconds = 3000
  }
}

# Per-bucket key scoped read+write to THIS bucket only. This is the key the
# upload script uses — keep it on your laptop / in a password manager, never
# in the repo. A leak of it can touch nothing else in your DO account. It can
# also set per-object `public-read` ACLs, which is how objects are published.
resource "digitalocean_spaces_key" "media" {
  name = "${var.bucket_name}-rw"

  grant {
    bucket     = digitalocean_spaces_bucket.media.name
    permission = "readwrite"
  }
}

# ─── Optional: CDN (removed) ─────────────────────────────────────────────────
# The site renders from the Spaces ORIGIN host
# (`<bucket>.<region>.digitaloceanspaces.com`) — see the `media_base` output.
# A CDN is NOT required: Vercel already edge-serves the page, and the demo
# clips are below-the-fold and lazy-loaded, so a CDN wouldn't move SEO/Core
# Web Vitals. It only helps global latency / egress cost at higher traffic.
# A previous CDN endpoint 404'd in DO and was removed. To add one back later:
#
# resource "digitalocean_cdn" "media" {
#   origin = digitalocean_spaces_bucket.media.bucket_domain_name
#   ttl    = 3600
# }
# ...then point NEXT_PUBLIC_MEDIA_CDN_BASE at `https://${digitalocean_cdn.media.endpoint}`.

# ─── Optional: bucket-wide public read (removed) ─────────────────────────────
# Requires a FULL-ACCESS (unscoped) Spaces key to apply — scoped keys 403 on
# PutBucketPolicy. We use per-object public-read ACL instead. To switch:
#
# resource "digitalocean_spaces_bucket_policy" "media_public_read" {
#   region = digitalocean_spaces_bucket.media.region
#   bucket = digitalocean_spaces_bucket.media.name
#   policy = jsonencode({
#     Version = "2012-10-17"
#     Statement = [{
#       Sid = "AllowPublicReadOfMediaObjects", Effect = "Allow", Principal = "*",
#       Action = "s3:GetObject",
#       Resource = "arn:aws:s3:::${digitalocean_spaces_bucket.media.name}/*"
#     }]
#   })
# }
