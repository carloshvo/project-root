# Atualiza a estrutura do frontend criando o diretório "api" e arquivos em branco

# Caminho raiz do frontend
$root = "frontend/src"

# Diretório "api"
$apiPath = "$root/api"
New-Item -ItemType Directory -Force -Path $apiPath

# Arquivos dentro de "api"
$files = @("api.ts", "userApi.ts", "materialApi.ts", "stockApi.ts")

foreach ($file in $files) {
    New-Item -ItemType File -Force -Path "$apiPath/$file"
}

Write-Host "Estrutura do diretório 'api' criada com sucesso em $apiPath"