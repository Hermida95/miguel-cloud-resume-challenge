provider "aws" {
  region  = var.region
  profile = var.aws_profile
  # Sin credenciales aquí: Terraform usa el profile crc del AWS CLI.

  # Etiquetas aplicadas automáticamente a todo recurso que las soporte.
  # Útil para identificar y, si algún día lo hubiera, rastrear coste por proyecto.
  default_tags {
    tags = {
      Project   = var.project_name
      ManagedBy = "Terraform"
    }
  }
}
