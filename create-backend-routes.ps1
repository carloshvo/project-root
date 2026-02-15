# Cria a estrutura de rotas da API no backend (NestJS)

# Diretório raiz do backend
$root = "backend/src"

# Entidades que terão rotas
$entities = @("material", "user", "stock")

foreach ($entity in $entities) {
    $entityPath = "$root/$entity"
    New-Item -ItemType Directory -Force -Path $entityPath

    # Criar arquivos principais
    New-Item -ItemType File -Force -Path "$entityPath/$entity.controller.ts"
    New-Item -ItemType File -Force -Path "$entityPath/$entity.service.ts"
    New-Item -ItemType File -Force -Path "$entityPath/$entity.module.ts"
}

# Prisma service (se não existir)
New-Item -ItemType File -Force -Path "$root/prisma.service.ts"

Write-Host "Estrutura de rotas criada com sucesso!"