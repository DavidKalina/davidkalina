# Portfolio media — DigitalOcean Spaces bucket for demo videos rendered on
# davidkalina.com. Mirrors the public-read + CDN model that Route King's
# trail-media bucket uses (see route-king/terraform/spaces.tf), but stands
# in its OWN bucket so portfolio marketing assets never mix with app user
# media, and so this never has to borrow the backups key (which is — by the
# comments in both apps — scoped to backups only and must not be reused).

terraform {
  required_version = ">= 1.6"
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.0"
    }
  }

  # State lives locally by default. Fine for a single-bucket, single-operator
  # setup. If you ever want remote state, point this at a Space exactly like
  # route-king/terraform/main.tf does (commented out so `init` works as-is):
  #
  # backend "s3" {
  #   endpoints                   = { s3 = "https://sfo3.digitaloceanspaces.com" }
  #   bucket                      = "davidkalina-tfstate"
  #   key                         = "portfolio-media/terraform.tfstate"
  #   region                      = "us-east-1"   # ignored by DO, required by the s3 backend
  #   skip_credentials_validation = true
  #   skip_metadata_api_check     = true
  #   skip_region_validation      = true
  #   skip_requesting_account_id  = true
  #   skip_s3_checksum            = true
  # }
}

provider "digitalocean" {
  token = var.do_token

  # Spaces (the S3-compatible object store) authenticates with a SEPARATE
  # access-key pair, not the API token above. These must be an UNSCOPED key:
  # creating the bucket policy (PutBucketPolicy) is denied to per-bucket
  # scoped keys — same gotcha called out in route-king's spaces.tf. Generate
  # one under API -> Spaces Keys with no bucket grant, use it for `apply`,
  # then you never need it again at runtime (uploads use the scoped key this
  # config mints below).
  spaces_access_id  = var.do_spaces_key
  spaces_secret_key = var.do_spaces_secret
}
