terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # OJO: el bootstrap usa estado LOCAL a propósito.
  # Es la única config que puede, porque su trabajo es crear el bucket
  # de estado remoto que usará el resto del proyecto (huevo y gallina).
}
