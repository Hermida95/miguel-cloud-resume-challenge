variable "region" {
  description = "Región AWS para el bucket del sitio (CloudFront es global)"
  type        = string
  default     = "eu-west-1"
}

variable "aws_profile" {
  description = "Profile del AWS CLI. Los permisos IAM están acotados al prefijo crc-."
  type        = string
  default     = "crc"
}

variable "project_name" {
  description = "Prefijo/etiqueta del proyecto"
  type        = string
  default     = "cloud-resume"
}

# NOTA: nombre con prefijo crc- obligatorio (permisos IAM acotados a ese prefijo).
variable "site_bucket_name" {
  description = "Nombre GLOBALMENTE ÚNICO del bucket que aloja el sitio. Debe empezar por crc-."
  type        = string
  default     = "crc-miguel-site"
}
