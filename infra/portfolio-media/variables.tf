variable "do_token" {
  type        = string
  sensitive   = true
  description = "DigitalOcean API token (Control Panel -> API -> Tokens). Creates the bucket/CDN/policy."
}

variable "do_spaces_key" {
  type        = string
  sensitive   = true
  description = "UNSCOPED Spaces access key. Needed to apply the bucket policy; scoped keys cannot."
}

variable "do_spaces_secret" {
  type        = string
  sensitive   = true
  description = "Secret paired with do_spaces_key."
}

variable "bucket_name" {
  type        = string
  default     = "davidkalina-portfolio"
  description = "Globally-unique Spaces bucket name. If taken, suffix it (e.g. davidkalina-portfolio-media)."
}

variable "do_region" {
  type        = string
  default     = "sfo3"
  description = "DO region: nyc3, sfo3, ams3, sgp1, fra1, syd1. Pick the one nearest your audience."
}

variable "cors_allowed_origins" {
  type        = list(string)
  default     = ["https://davidkalina.com", "http://localhost:3000"]
  description = "Origins allowed to fetch media in-browser. Add a Vercel preview wildcard if you want previews to play it."
}
