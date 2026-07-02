# =============================================================================
#  CloudFront — CDN + HTTPS delante del bucket S3 privado, con OAC.
# =============================================================================

# OAC: CloudFront firma con SigV4 cada petición al origen S3 privado.
# Sustituye al antiguo OAI (legacy).
resource "aws_cloudfront_origin_access_control" "site" {
  name                              = "crc-${var.project_name}-oac"
  description                       = "OAC para el bucket privado del sitio"
  origin_access_control_origin_type = "s3"
  signing_behavior                  = "always"
  signing_protocol                  = "sigv4"
}

resource "aws_cloudfront_distribution" "site" {
  enabled             = true
  default_root_object = "index.html"
  comment             = "crc-${var.project_name}"

  # PriceClass_100 = edges de Norteamérica + Europa. El más barato y suficiente
  # para una audiencia europea. (El plan plano Free cubre el uso igualmente.)
  price_class = "PriceClass_100"

  origin {
    domain_name              = aws_s3_bucket.site.bucket_regional_domain_name
    origin_id                = "s3-${aws_s3_bucket.site.id}"
    origin_access_control_id = aws_cloudfront_origin_access_control.site.id
  }

  default_cache_behavior {
    target_origin_id       = "s3-${aws_s3_bucket.site.id}"
    viewer_protocol_policy = "redirect-to-https" # fuerza HTTPS
    allowed_methods        = ["GET", "HEAD"]
    cached_methods         = ["GET", "HEAD"]

    # Política de caché GESTIONADA por AWS: "CachingOptimized" (id fijo y conocido).
    # Evita definir a mano TTLs y compresión.
    cache_policy_id = "658327ea-f89d-4fab-a63d-7e88639e58f6"
  }

  # Sin restricción geográfica: el portfolio debe verse desde cualquier país.
  restrictions {
    geo_restriction {
      restriction_type = "none"
    }
  }

  # Certificado por defecto *.cloudfront.net (HTTPS gratis, sin dominio propio).
  viewer_certificate {
    cloudfront_default_certificate = true
  }
}

# NOTA de diseño: NO añadimos custom_error_response (403/404 -> index.html).
# Tu sitio es UNA sola página con navegación por anclas (#about, #projects...),
# no una SPA con rutas. Redirigir todos los errores a index.html enmascararía
# assets que falten (una imagen rota devolvería el HTML con 200). Preferimos
# que un recurso inexistente devuelva su error real.
