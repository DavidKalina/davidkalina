# DigitalOcean Project grouping the portfolio resources in the console
# sidebar. On first apply the bucket (and CDN, via the bucket) is *moved* out
# of the account's Default project into this one — a metadata reassignment,
# no data loss. Modeled on route-king/terraform/project.tf.
#
# Note: a Spaces key (digitalocean_spaces_key.media) is an account-level
# credential, not a regional resource with a URN, so it is not — and cannot
# be — listed here. Only the bucket is grouped; the CDN follows its origin.
resource "digitalocean_project" "davidkalina" {
  name        = "davidkalina"
  description = "davidkalina.com — portfolio media (public demo videos served via CDN)."
  purpose     = "Web Application"
  environment = "Production"

  resources = [
    digitalocean_spaces_bucket.media.urn,
  ]
}
