terraform {
  required_version = ">= 1.5.0"

  required_providers {
    aws = {
      source  = "hashicorp/aws"
      version = "~> 5.0"
    }
  }

  # Estado remoto en el bucket creado por ./bootstrap.
  # El backend NO admite variables: estos valores van literales y deben
  # coincidir con los del bootstrap. Si cambiaste algún nombre allí, cámbialo aquí.
  backend "s3" {
    bucket       = "crc-miguel-tfstate"
    key          = "frontend/terraform.tfstate"
    region       = "eu-west-1"
    encrypt      = true
    use_lockfile = true # lock nativo en S3 (sin tabla DynamoDB)
    profile      = "crc"
  }
}
