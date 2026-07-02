# =============================================================================
#  BOOTSTRAP — crea el backend remoto de Terraform (se ejecuta UNA sola vez)
#  Recurso: bucket S3 para el tfstate.
#  El lock lo hace el propio S3 (use_lockfile), sin tabla DynamoDB.
# =============================================================================

variable "region" {
  description = "Región AWS del bucket de estado y la tabla de lock"
  type        = string
  default     = "eu-west-1"
}

variable "aws_profile" {
  description = "Profile del AWS CLI a usar. Los permisos IAM están acotados al prefijo crc-."
  type        = string
  default     = "crc"
}

# NOTA: todos los nombres llevan prefijo crc- porque el usuario tiene permisos
# IAM acotados a ese prefijo. Deben empezar por crc-.
variable "state_bucket_name" {
  description = "Nombre GLOBALMENTE ÚNICO del bucket del tfstate. Debe coincidir con el backend de ../versions.tf"
  type        = string
  default     = "crc-miguel-tfstate"
}

provider "aws" {
  region  = var.region
  profile = var.aws_profile
  # Sin credenciales aquí: Terraform usa el profile crc del AWS CLI.
}

# --- Bucket que guardará el tfstate del proyecto principal ---
resource "aws_s3_bucket" "tfstate" {
  bucket = var.state_bucket_name

  # Red de seguridad: evita destruir por error el bucket que contiene TODO el estado.
  lifecycle {
    prevent_destroy = true
  }
}

# Versionado: cada guardado del estado queda archivado -> se puede recuperar uno anterior.
resource "aws_s3_bucket_versioning" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  versioning_configuration {
    status = "Enabled"
  }
}

# Cifrado en reposo (SSE-S3, sin coste).
resource "aws_s3_bucket_server_side_encryption_configuration" "tfstate" {
  bucket = aws_s3_bucket.tfstate.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# El bucket de estado NUNCA debe ser público.
resource "aws_s3_bucket_public_access_block" "tfstate" {
  bucket                  = aws_s3_bucket.tfstate.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

output "state_bucket" {
  description = "Cópialo al backend de ../versions.tf si cambiaste el nombre"
  value       = aws_s3_bucket.tfstate.bucket
}
