# 🌍 DiasporaConnect - MIABE Hackathon 2026

Bienvenue sur le dépôt Backend de **DiasporaConnect** ! 

**DiasporaConnect** est une plateforme de transfert de fonds basés sur la blockchain (Polygon), conçue spécifiquement pour la diaspora, permettant d'envoyer de l'argent vers l'Afrique avec des frais quasi nuls (0.1%), de façon quasi instantanée, et en convertissant l'argent reçu directement en Mobile Money (Francs CFA).

---

## 🏗️ Architecture du Projet

Le projet est divisé en deux grandes parties :

1. **`/contracts` (Smart Contracts)** : Contient le code Solidity déployé sur Polygon (Amoy Testnet).
   - `DiasporaTransfer.sol` : Le contrat qui verrouille les fonds (USDC) envoyés par l'expéditeur et les libère après vérification du backend.
   - `MockUSDC.sol` : Un stablecoin simulé créé pour effectuer nos tests sur le réseau.
2. **`/backend` (API Node.js/Express & Prisma)** : Le cœur opérationnel. Le pont entre le frontend (l'utilisateur) et la blockchain.

---

## 🚀 Comment fonctionne l'application ? (Le Flux)

### 1. Inscription (Le système "Passwordless")
**Oubliez les mots de passe.** Nous utilisons un système d'authentification par numéro de téléphone.
- **Le front** envoie le numéro de téléphone du client (`POST /api/auth/register`).
- **Le back** crée automatiquement un **Portefeuille Blockchain (Wallet Ethereum)** pour ce client en arrière-plan.
- La clé privée du Wallet est **chiffrée (sécurisée via AES-256)** avant d'être sauvegardée en base de données. *La clé privée n'est jamais exposée.*
- Un SMS contenant un code OTP à 6 chiffres est envoyé au client via Twilio.
- **Le front** valide le code (`POST /api/auth/verify-otp`) et le client est connecté !

### 2. Le Transfert d'argent
Alice (en France) veut envoyer 50€ à Bob (au Bénin).
- **Le front** affiche les taux de change en temps réel grâce à notre abstraction de l'API CoinGecko (`GET /api/rates`).
- Alice valide l'envoi (`POST /api/transfer`).
- **Le back** prend le relais :
  1. Il déchiffre la clé blockchain d'Alice.
  2. Il convertit discrètement ses Euros en USDC (Stablecoin).
  3. Il signe une transaction sur la **Blockchain Polygon** pour "bloquer" les fonds d'Alice vers le destinataire.

### 3. La Réception en Mobile Money
Bob (le destinataire) reçoit l'argent.
- Bob demande le retrait de son transfert (`POST /api/withdraw`).
- **Le back** se connecte au Smart Contract avec sa propre clé administrateur (Relayer) et lance la fonction `releaseTransfer()`.
- Les USDC arrivent de façon sécurisée sur le Wallet de Bob.
- **Côté Front/Real-world** : Le backend convertit la valeur USDC en XOF (Francs CFA) et déclenche l'API Mobile Money (MTN, Moov, etc.) pour envoyer ce solde sur le téléphone local de Bob.

---

## 🛠️ Installation & Démarrage (Pour les Devs)

Si vous rejoignez l'équipe, voici comment tout lancer en local !

### Prérequis
- **Node.js** (v22 recommandée)
- **Hardhat**
- Optionnel : Un vrai compte Twilio & une clé privée de portefeuille Polygon Amoy pour la production (Variables d'environnement).

### Étape 1 : Base de données & Backend
1. Naviguez dans le dossier `backend`.
2. Installez les dépendances :
   ```bash
   npm install
   ```
3. Initialisez la base de données SQLite avec Prisma :
   ```bash
   npx prisma db push
   npx prisma generate
   ```
4. Démarrez l'API :
   ```bash
   npm start
   # ou 'npm run dev' pour activer le rechargement automatique
   ```
*Le serveur tournera sur http://localhost:3000.*

### Étape 2 : Lancer la Blockchain Locale (Optionnel pour tester sans Internet)
Si vous ne visez pas le Vrai Testnet Amoy et que vous développez, Hardhat peut simuler une blockchain.
1. Naviguez dans `/contracts`.
2. Lancez le nœud : `npx hardhat node`
3. Déployez nos contrats : `npx hardhat run scripts/deploy.js --network localhost`

---

## 📚 Documentation Frontend

Le développeur Front-end n'a pas besoin de toucher ou de lire le dossier Blockchain ou le détail de `src/services`.
Toutes les routes exposées, les Headers demandés (`Authorization: Bearer <token>`) et les structures JSON nécessaires pour faire marcher l'application React/NextJS sont documentées dans le fichier **`API_FRONTEND_DOCS.md`** à la racine du projet.

---

## 🌍 Déploiement (Mise en Ligne pour l'Équipe)

Si vous êtes chargé d'héberger ce backend (sur **Render.com**, **Railway**, ou **Heroku**) pour le rendre accessible au développeur Frontend ou pour la présentation au jury, voici la marche à suivre :

### 1. Base de données (Passez sur PostgreSQL !)
Ce projet utilise **SQLite** pour aller très vite en dev local. Sur le cloud gratuit (comme Render), les fichiers locaux SQLite s'effacent à chaque redémarrage (stockage éphémère).
Pour une démo solide, créez une base **PostgreSQL** gratuite (ex: sur *Supabase* ou *Neon.tech*), puis :
1. Allez dans `backend/prisma/schema.prisma` et remplacez `provider = "sqlite"` par `provider = "postgresql"`.
2. Placez l'URL fournie par Supabase/Neon dans la variable `DATABASE_URL` (voir ci-dessous).

### 2. Configuration sur la Plateforme Cloud (ex: Render)
- **Root Directory** : `backend`
- **Build Command** : `npm install && npx prisma db push && npx prisma generate`
- **Start Command** : `npm start`

### 3. Les Variables d'Environnement (Secrets)
Vous devez insérer ces secrets (fichier `.env`) directement dans le tableau de bord de votre hébergeur :
- `DATABASE_URL` : L'URL de votre base PostgreSQL (`postgresql://...`).
- `ENCRYPTION_KEY` : Clé de *64 caractères hexadécimaux* obligatoire pour le chiffrement des wallets ! *(Générez une chaîne aléatoire et ne la perdez pas).*
- `JWT_SECRET` : Clé secrète pour les tokens de connexion.
- `RELAYER_PRIVATE_KEY` : Clé secrète du Wallet système Ethereum qui a du MATIC sur Amoy (il paiera les frais de gas au moment de libérer l'argent).
- `AMOY_RPC_URL` : URL de connexion à Polygon (générée sur *Alchemy* ou *Infura*, ou prenez `https://rpc-amoy.polygon.technology`).
- `USE_REAL_TWILIO` : Mettez à `true` si les credentials Twilio sont renseignés pour des vrais SMS.
- `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER` : Au besoin.

> 🌟 **Bienvenue dans l'équipe et bon Hackathon !** 🌟
