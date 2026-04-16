# 🚀 Déploiement DiasporaConnect

## Option 1: Déploiement Automatique (GitHub Actions)

Le projet contient un workflow GitHub Actions dans `.github/workflows/deploy.yml`.

### Configuration requise :
1. Créer un compte Netlify : https://app.netlify.com
2. Créer un nouveau site
3. Récupérer le **Site ID** et **Personal Access Token**
4. Dans GitHub, aller dans Settings → Secrets and variables → Actions
5. Ajouter :
   - `NETLIFY_AUTH_TOKEN` : votre token Netlify
   - `NETLIFY_SITE_ID` : l'ID de votre site

Le déploiement se fera automatiquement à chaque push sur `main`.

---

## Option 2: Déploiement Manuel (CLI Netlify)

### Prérequis :
```bash
npm install -g netlify-cli
```

### Commandes :
```bash
# Se connecter à Netlify (une seule fois)
netlify login

# Lier le projet (une seule fois)
netlify link

# Déployer
netlify deploy --prod --dir=dist
```

---

## Option 3: Déploiement Manuel (Drag & Drop)

1. Construire le projet :
```bash
npm run build
```

2. Aller sur https://app.netlify.com/drop

3. Glisser-déposer le dossier `dist/`

---

## 📁 Structure du build

Le dossier `dist/` contient :
- `index.html` - Page d'accueil (landing)
- `dashboard.html` - Dashboard utilisateur
- `carte-graphique.html` - Carte de visite & affiche
- `transfer/` - Pages de transfert
- `fees/` - Comparaison des frais
- `_next/` - Assets statiques

---

## 🌐 URL suggérée
- **Domaine suggéré** : `diasporaconnect-benin.netlify.app`
- **Domaine personnalisé** : `diasporaconnect.bj` (à configurer après)

---

## 📱 Aperçu local

```bash
# Développement
npm run dev

# Build + serve local
npm run build
npx serve dist
```
