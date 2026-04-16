# Script de déploiement DiasporaConnect
# Usage: .\deploy.ps1

Write-Host "🚀 Déploiement DiasporaConnect" -ForegroundColor Green
Write-Host "==============================" -ForegroundColor Green

# Vérifier si netlify CLI est installé
try {
    $netlifyVersion = netlify --version 2>$null
    Write-Host "✅ Netlify CLI détecté" -ForegroundColor Green
} catch {
    Write-Host "❌ Netlify CLI non installé" -ForegroundColor Red
    Write-Host "Installation: npm install -g netlify-cli" -ForegroundColor Yellow
    exit 1
}

# Se connecter si nécessaire
Write-Host "`n🔐 Vérification connexion Netlify..." -ForegroundColor Cyan
netlify status 2>$null
if ($LASTEXITCODE -ne 0) {
    Write-Host "Connexion requise..." -ForegroundColor Yellow
    netlify login
}

# Vérifier le build
if (-not (Test-Path "dist\index.html")) {
    Write-Host "`n📦 Build non trouvé, construction en cours..." -ForegroundColor Cyan
    npm run build
}

# Lier le site si nécessaire
Write-Host "`n🔗 Lien avec le site Netlify..." -ForegroundColor Cyan
netlify link

# Déployer
Write-Host "`n🚀 Déploiement en production..." -ForegroundColor Cyan
netlify deploy --prod --dir=dist

Write-Host "`n✅ Déploiement terminé!" -ForegroundColor Green
Write-Host "`n💡 Alternative: Glisser-deposer le dossier 'dist' sur https://app.netlify.com/drop" -ForegroundColor Yellow
