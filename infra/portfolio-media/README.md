# Portfolio media bucket

A DigitalOcean Spaces bucket for the demo videos rendered on davidkalina.com.
Standing in its **own** bucket with its **own** scoped key — it does not reuse
Route King's or Social Log's keys (those are scoped to their backup/media
buckets and must not be shared).

Objects are served from the Spaces **origin** host (no CDN — see "Do I need a
CDN?" below) and published individually with a `public-read` ACL.

## Why no key in the website

Reads are public. The portfolio renders `https://<origin>/<key>` with **no
credentials** — the scoped key is only ever used by the upload script, which
runs from your laptop. Nothing secret ships to Vercel or the browser.

## One-time provision

```bash
cd infra/portfolio-media
cp terraform.tfvars.example terraform.tfvars   # fill in token + spaces key
terraform init
terraform apply
```

Grab the outputs:

```bash
terraform output media_base        # -> NEXT_PUBLIC_MEDIA_CDN_BASE in .env.local
terraform output bucket_name
terraform output region
terraform output -raw upload_key
terraform output -raw upload_secret
```

## Upload a clip

Two ways. **Either way, the object must be `public-read` and the key must have
no leading/trailing spaces** — a space in a console folder name once made every
object unreachable at its clean key.

**A) The script (sets `public-read` + trims whitespace automatically):**

```bash
pnpm add -D @aws-sdk/client-s3 mime-types     # once

SPACES_KEY=$(terraform -chdir=infra/portfolio-media output -raw upload_key) \
SPACES_SECRET=$(terraform -chdir=infra/portfolio-media output -raw upload_secret) \
SPACES_BUCKET=$(terraform -chdir=infra/portfolio-media output -raw bucket_name) \
SPACES_REGION=$(terraform -chdir=infra/portfolio-media output -raw region) \
node scripts/upload-media.mjs ./media/route-king/demo.mp4 route-king/demo.mp4
```

**B) The AWS CLI (note the explicit `--acl public-read`):**

```bash
cd infra/portfolio-media
export AWS_ACCESS_KEY_ID=$(terraform output -raw upload_key)
export AWS_SECRET_ACCESS_KEY=$(terraform output -raw upload_secret)
aws s3 cp ./route-king-demo.mp4 \
  s3://davidkalina-portfolio/route-king/demo.mp4 \
  --acl public-read --content-type video/mp4 \
  --endpoint-url https://sfo3.digitaloceanspaces.com
```

Prefer the CLI over the DO console — you type the exact key, no hidden spaces,
and `--acl public-read` guarantees it's served. Verify any upload:

```bash
curl -sI https://davidkalina-portfolio.sfo3.digitaloceanspaces.com/route-king/demo.mp4 | head -1
# want: HTTP/2 200
```

## Wire the site

```bash
# .env.local  (name is legacy — this is the origin, not a CDN)
NEXT_PUBLIC_MEDIA_CDN_BASE=https://davidkalina-portfolio.sfo3.digitaloceanspaces.com
```

`constants/projectGrid.ts` already points each project's `demoVideoSrc` at
`mediaUrl("<slug>/demo.mp4")` (`route-king`, `ai-pipeline`). Restart
`npm run dev` after changing `.env.local` (NEXT_PUBLIC_* is baked at start).

## Do I need a CDN?

No. The page itself is edge-served by Vercel (that's what matters for SEO /
Core Web Vitals); the demo clips are below-the-fold, lazy-loaded, and muted, so
a CDN wouldn't change rankings. A CDN only helps global latency / egress cost
at higher traffic. A previous DO CDN endpoint 404'd and was removed; the
origin path is the supported setup. To re-add a CDN later, see the commented
block in `spaces.tf` and repoint `media_base` / `NEXT_PUBLIC_MEDIA_CDN_BASE`.

## Publishing model

There is **no** bucket-wide public policy — DO's scoped Spaces keys can't set
one (`PutBucketPolicy` → 403; that needs a legacy full-access key). Instead
every object is published via its own `public-read` ACL on upload. Fine for a
handful of demo clips. To switch to bucket-wide public read, create a
full-access Spaces key and uncomment the policy block in `spaces.tf`.

## Your turn

1. Upload a Route King clip (portrait, muted, H.264 MP4, ~30s) to key
   `route-king/demo.mp4` with `public-read`.
2. Confirm `curl -sI <origin>/route-king/demo.mp4` is `200`, then `npm run dev`.
3. Tune the `time:` markers on each project's journey steps to your footage.
4. Optional: add poster frames (`<slug>/demo-poster.jpg`).
