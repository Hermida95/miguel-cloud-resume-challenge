# =============================================================================
#  S3 — bucket PRIVADO que aloja el sitio (nombre con prefijo crc-).
#  Los ficheros los sube el pipeline (Fase 3), no Terraform: separamos
#  "infraestructura" de "contenido".
# =============================================================================

resource "aws_s3_bucket" "site" {
  bucket = var.site_bucket_name
}

# Bloqueo TOTAL de acceso público: el sitio no se sirve desde S3, solo vía CloudFront.
resource "aws_s3_bucket_public_access_block" "site" {
  bucket                  = aws_s3_bucket.site.id
  block_public_acls       = true
  block_public_policy     = true
  ignore_public_acls      = true
  restrict_public_buckets = true
}

# Cifrado en reposo (SSE-S3, gratis).
resource "aws_s3_bucket_server_side_encryption_configuration" "site" {
  bucket = aws_s3_bucket.site.id
  rule {
    apply_server_side_encryption_by_default {
      sse_algorithm = "AES256"
    }
  }
}

# --- Bucket policy: permiso MÍNIMO ---
# Solo s3:GetObject, solo al service principal de CloudFront, y SOLO cuando la
# petición viene de NUESTRA distribución concreta (condición AWS:SourceArn).
# Nada de wildcards en el principal.
data "aws_iam_policy_document" "site" {
  statement {
    sid     = "AllowCloudFrontServicePrincipalReadOnly"
    effect  = "Allow"
    actions = ["s3:GetObject"]

    principals {
      type        = "Service"
      identifiers = ["cloudfront.amazonaws.com"]
    }

    resources = ["${aws_s3_bucket.site.arn}/*"]

    condition {
      test     = "StringEquals"
      variable = "AWS:SourceArn"
      values   = [aws_cloudfront_distribution.site.arn]
    }
  }
}

resource "aws_s3_bucket_policy" "site" {
  bucket = aws_s3_bucket.site.id
  policy = data.aws_iam_policy_document.site.json
}
