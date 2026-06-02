// Upload portfolio demo clips to the DigitalOcean Spaces bucket created by
// infra/portfolio-media. DO Spaces is S3-compatible, so the AWS SDK works
// unchanged once `endpoint` is set — same approach as Route King's
// DOSpacesMediaStorage.
//
// Setup (once):
//   pnpm add -D @aws-sdk/client-s3 mime-types
//
// Usage:
//   SPACES_KEY=...      \   # `terraform output -raw upload_key`
//   SPACES_SECRET=...   \   # `terraform output -raw upload_secret`
//   SPACES_BUCKET=davidkalina-portfolio \
//   SPACES_REGION=sfo3  \
//   node scripts/upload-media.mjs ./media/route-king/demo.mp4 route-king/demo.mp4
//
// Arg 1 = local file path. Arg 2 = object key (the path under the bucket the
// portfolio will reference as `${CDN_BASE}/${key}`). Omit arg 2 to default the
// key to the file's basename.
//
// The bucket policy from Terraform makes every object public-read, so you do
// NOT pass an ACL here (and shouldn't — see the long note in Route King's
// media-storage-spaces.ts about why per-object ACL is unreliable on Spaces).

import { readFile } from "node:fs/promises";
import { basename } from "node:path";
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import mime from "mime-types";

function requireEnv(name) {
  const v = process.env[name];
  if (!v) {
    console.error(`Missing env var ${name}. See the header of this file.`);
    process.exit(1);
  }
  return v;
}

const REGION = requireEnv("SPACES_REGION");
const BUCKET = requireEnv("SPACES_BUCKET");
const KEY = requireEnv("SPACES_KEY");
const SECRET = requireEnv("SPACES_SECRET");

const [filePath, keyArg] = process.argv.slice(2);
if (!filePath) {
  console.error("Usage: node scripts/upload-media.mjs <file> [objectKey]");
  process.exit(1);
}
// Guard against the leading/trailing-space key bug that bit a console upload
// once (a folder named " ai-pipeline" made every object unreachable at the
// clean key). Trim and reject stray whitespace so the key is exactly what the
// site references.
const objectKey = (keyArg ?? basename(filePath)).trim();
if (/\s/.test(objectKey)) {
  console.error(`Refusing key with whitespace: "${objectKey}"`);
  process.exit(1);
}

const client = new S3Client({
  region: REGION,
  endpoint: `https://${REGION}.digitaloceanspaces.com`,
  credentials: { accessKeyId: KEY, secretAccessKey: SECRET },
  // DO Spaces rejects the AWS-native checksum trailer the SDK sends by
  // default (v3.730+) with a 501. Match Route King and only checksum when
  // required.
  requestChecksumCalculation: "WHEN_REQUIRED",
  responseChecksumValidation: "WHEN_REQUIRED",
});

const body = await readFile(filePath);
const contentType = mime.lookup(filePath) || "application/octet-stream";

await client.send(
  new PutObjectCommand({
    Bucket: BUCKET,
    Key: objectKey,
    Body: body,
    ContentType: contentType,
    // public-read makes the object world-readable on upload. Required: there
    // is no bucket-wide public policy (DO scoped keys can't set one), so each
    // object publishes itself via its ACL. This is a DIRECT PutObject (not a
    // presigned URL), so DO Spaces honors the ACL header — the x-amz-acl
    // query-param hoisting that breaks the presigned path doesn't apply here.
    ACL: "public-read",
    // Lets the browser cache the asset. Safe because you version by key name
    // (demo-v2.mp4) rather than overwrite in place.
    CacheControl: "public, max-age=31536000, immutable",
  }),
);

console.log(`Uploaded ${filePath}`);
console.log(`  key:  ${objectKey}`);
console.log(`  type: ${contentType}`);
console.log(`  url:  https://${BUCKET}.${REGION}.digitaloceanspaces.com/${objectKey}`);

// ── Your turn (guided challenge) ─────────────────────────────────────────
// Right now this uploads ONE file per invocation. Two small extensions worth
// doing yourself:
//   1. Accept a directory and walk it, uploading each file under a key prefix
//      (e.g. `route-king/<filename>`). `node:fs/promises` `readdir` + a loop.
//   2. Skip the PUT if the object already exists with the same size — a
//      HeadObjectCommand returning ContentLength === body.length means no-op.
//      (Route King's DOSpacesMediaStorage.head() shows the NotFound handling.)
