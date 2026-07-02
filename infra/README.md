# infra/

Infraestructura del proyecto en Terraform. Todo se autentica con el **profile `crc`**
del AWS CLI y todos los recursos llevan prefijo **`crc-`** (permisos IAM acotados).

## Orden de ejecución

### 1. Bootstrap (una sola vez) — crea el backend remoto
Crea el bucket S3 del estado. El lock lo hace el propio S3 (`use_lockfile`), sin
tabla DynamoDB. Usa estado **local**.

```bash
cd infra/bootstrap
terraform init
terraform plan      # revisar
terraform apply     # crea el bucket crc-miguel-tfstate
```

### 2. Proyecto principal — S3 privado + CloudFront (OAC)
Usa como backend el bucket creado en el paso 1.

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars   # y ajusta si hace falta
terraform init      # conecta con el backend S3 remoto
terraform plan      # revisar QUÉ se va a crear
terraform apply     # crea la infra real en AWS
```

> ⚠️ `apply` crea recursos reales en AWS. Revisa siempre el `plan` antes.

## Estado
- Backend: S3 (`crc-miguel-tfstate`), cifrado y versionado, con lock nativo de S3 (`use_lockfile`).
- El bootstrap guarda su propio estado en local (`infra/bootstrap/terraform.tfstate`), ignorado por git.

## Salidas útiles (`terraform output`)
- `cloudfront_domain_name` — URL pública del sitio.
- `cloudfront_distribution_id` — para invalidar caché desde el pipeline.
- `site_bucket_name` — bucket a sincronizar con `frontend/`.
