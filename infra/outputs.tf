output "cloudfront_domain_name" {
  description = "URL pública del sitio -> https://<este valor>"
  value       = aws_cloudfront_distribution.site.domain_name
}

output "cloudfront_distribution_id" {
  description = "ID de la distribución (lo usará el pipeline para invalidar la caché)"
  value       = aws_cloudfront_distribution.site.id
}

output "site_bucket_name" {
  description = "Bucket que el pipeline sincronizará con el contenido de frontend/"
  value       = aws_s3_bucket.site.bucket
}
