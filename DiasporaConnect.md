# DiasporaConnect

## Description
DiasporaConnect est une plateforme de transfert de fonds basée sur la blockchain (Polygon), conçue spécifiquement pour la diaspora africaine. Envoyez de l'argent vers le Bénin avec seulement 0.8% de frais, de façon quasi instantanée, et recevez directement en Mobile Money (XOF).

## Problème résolu
Les frais de transfert traditionnels vers l'Afrique peuvent atteindre 15%, avec des délais de plusieurs jours. DiasporaConnect réduit ces frais à 0.8% et permet une réception en moins de 30 minutes via Mobile Money.

## Solution
- Blockchain Polygon pour des transactions rapides et sécurisées
- Conversion automatique EUR/USDC/XOF
- Retrait sur MTN Mobile Money ou Moov Money
- Frais quasi nuls (0.8% seulement)
- Interface simplifiée avec deux portails (Diaspora et Bénin)

## Tech Stack (Frontend / Backend / Blockchain)
- **Frontend** : HTML5, CSS3, JavaScript (Vanilla), Lucide Icons
- **Backend** : Node.js, Express, Prisma ORM
- **Blockchain** : Polygon (Amoy Testnet), Smart Contracts Solidity, USDC pour la stabilité
- **Base de données** : SQLite (dev) / PostgreSQL (prod)

## Comment lancer en local
1. Cloner le dépôt : `git clone https://github.com/Souraka229/disporaconnect-mbh2026.git`
2. Accéder au dossier : `cd disporaconnect-mbh2026`
3. Pour le backend :
   ```bash
   cd backend
   npm install
   npx prisma db push
   npm start
   ```
4. Pour le frontend : Ouvrir `index.html` ou `app.html` dans un navigateur.

## Variables d'environnement
Configurez ces variables dans un fichier `.env` dans le dossier `backend` :
- `DATABASE_URL` : URL de la base de données
- `ENCRYPTION_KEY` : Clé de chiffrement AES-256 (64 hex)
- `JWT_SECRET` : Secret pour les tokens JWT
- `RELAYER_PRIVATE_KEY` : Clé wallet Ethereum pour les transactions blockchain
- `AMOY_RPC_URL` : URL de connexion à Polygon

## Équipe
- **Souraka** - Lead Developer
- **Équipe MIABE** - Design & Stratégie

## Lien prototype
[https://diaspora-connect-ayaxntwu.devinapps.com/](https://diaspora-connect-ayaxntwu.devinapps.com/)

## MIABE Hackathon 2026
Projet développé dans le cadre du Hackathon MIABE 2026 au Bénin.
