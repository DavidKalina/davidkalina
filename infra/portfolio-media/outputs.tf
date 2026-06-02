output "bucket_name" {
  value       = digitalocean_spaces_bucket.media.name
  description = "Bucket name — pass to the upload script as SPACES_BUCKET."
}

output "region" {
  value       = digitalocean_spaces_bucket.media.region
  description = "Region — pass to the upload script as SPACES_REGION."
}

output "media_base" {
  # https://<bucket>.<region>.digitaloceanspaces.com — the Spaces ORIGIN host.
  # The portfolio prefixes this onto each object key. Put it in .env.local as
  # NEXT_PUBLIC_MEDIA_CDN_BASE (name is legacy; it's the origin, not a CDN).
  value       = "https://${digitalocean_spaces_bucket.media.bucket_domain_name}"
  description = "Public origin base URL the site renders from. Set NEXT_PUBLIC_MEDIA_CDN_BASE to this."
}

output "upload_key" {
  value       = digitalocean_spaces_key.media.access_key
  description = "Scoped upload key -> SPACES_KEY for the upload script. Keep it out of git."
}

output "upload_secret" {
  value       = digitalocean_spaces_key.media.secret_key
  sensitive   = true
  description = "Run `terraform output -raw upload_secret` to read it. -> SPACES_SECRET."
}
