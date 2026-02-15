# Cria a estrutura completa de pastas e arquivos do frontend (versão atualizada com testes)

# Diretório raiz
$root = "frontend"
New-Item -ItemType Directory -Force -Path $root

# Subpastas principais
$folders = @(
    "$root/public",
    "$root/src",
    "$root/src/api",
    "$root/src/components",
    "$root/src/pages",
    "$root/src/styles",
    "$root/tests",
    "$root/tests/components",
    "$root/tests/pages",
    "$root/tests/api"
)

foreach ($folder in $folders) {
    New-Item -ItemType Directory -Force -Path $folder
}

# Arquivos na raiz
New-Item -ItemType File -Force -Path "$root/package.json"
New-Item -ItemType File -Force -Path "$root/tsconfig.json"
New-Item -ItemType File -Force -Path "$root/vite.config.ts"

# Public
New-Item -ItemType File -Force -Path "$root/public/index.html"

# API
New-Item -ItemType File -Force -Path "$root/src/api/axios.ts"
New-Item -ItemType File -Force -Path "$root/src/api/userApi.ts"
New-Item -ItemType File -Force -Path "$root/src/api/materialApi.ts"
New-Item -ItemType File -Force -Path "$root/src/api/stockApi.ts"

# Components
New-Item -ItemType File -Force -Path "$root/src/components/Navbar.tsx"
New-Item -ItemType File -Force -Path "$root/src/components/Sidebar.tsx"
New-Item -ItemType File -Force -Path "$root/src/components/Dashboard.tsx"
New-Item -ItemType File -Force -Path "$root/src/components/UserForm.tsx"
New-Item -ItemType File -Force -Path "$root/src/components/MaterialForm.tsx"
New-Item -ItemType File -Force -Path "$root/src/components/StockForm.tsx"

# Pages
New-Item -ItemType File -Force -Path "$root/src/pages/UsersPage.tsx"
New-Item -ItemType File -Force -Path "$root/src/pages/MaterialsPage.tsx"
New-Item -ItemType File -Force -Path "$root/src/pages/StockPage.tsx"

# Styles
New-Item -ItemType File -Force -Path "$root/src/styles/global.css"

# App e Main
New-Item -ItemType File -Force -Path "$root/src/App.tsx"
New-Item -ItemType File -Force -Path "$root/src/main.tsx"

# Testes (arquivos base)
New-Item -ItemType File -Force -Path "$root/tests/components/Navbar.test.tsx"
New-Item -ItemType File -Force -Path "$root/tests/components/Sidebar.test.tsx"
New-Item -ItemType File -Force -Path "$root/tests/pages/UsersPage.test.tsx"
New-Item -ItemType File -Force -Path "$root/tests/pages/MaterialsPage.test.tsx"
New-Item -ItemType File -Force -Path "$root/tests/pages/StockPage.test.tsx"
New-Item -ItemType File -Force -Path "$root/tests/api/userApi.test.ts"
New-Item -ItemType File -Force -Path "$root/tests/api/materialApi.test.ts"
New-Item -ItemType File -Force -Path "$root/tests/api/stockApi.test.ts"

Write-Host "Estrutura completa do frontend (com testes) criada com sucesso!"