# Script para levantar todo Docker con tu estructura actual

Write-Host "Copiando .env de ejemplo si no existe..."
if (-not (Test-Path ".\docker\.env")) {
    Copy-Item ".\docker\.env.example" ".\docker\.env"
    Write-Host ".env copiado desde .env.example"
} else {
    Write-Host ".env ya existe, se usará tal cual"
}

Write-Host "Borrando volumen de postgres para cargar backup..."
docker compose -f .\docker\docker-compose.yml down -v

Write-Host "Construyendo contenedores..."
docker compose -f .\docker\docker-compose.yml build

Write-Host "Levantando contenedores en segundo plano..."
docker compose -f .\docker\docker-compose.yml up -d

Write-Host "Esperando 5 segundos para que los servicios se inicien..."
Start-Sleep -Seconds 5

Write-Host "Logs de backend y postgres (Ctrl+C para salir)"
docker compose -f .\docker\docker-compose.yml logs -f backend postgres
