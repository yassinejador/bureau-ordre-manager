# 🏛️ Application de Gestion de Bureau d'Ordre

## 📖 Description

Application web développée avec **Next.js** pour la gestion du bureau d'ordre universitaire.  
Fonctionnalités principales :

- Suivi automatisé des courriers entrants/sortants
- Gestion des utilisateurs et permissions
- Tableau de bord administratif

---

## 🛠 Stack Technique

| Catégorie            | Technologies          |
| -------------------- | --------------------- |
| **Framework**        | Next.js 14            |
| **Base de données**  | MySQL 8+              |
| **Authentification** | JWT (JSON Web Tokens) |
| **Style**            | Tailwind CSS          |

---

## ✅ Prérequis

### Vérifications système

1. **Node.js 16.x+** :

   ```bash
   node -v
   ```

   [Télécharger Node.js](https://nodejs.org/) si non installé

2. **npm** (inclus avec Node.js) :

   ```bash
   npm -v
   ```

3. **MySQL 8+** :

   ```bash
   mysql --version
   ```

   [Installer MySQL](https://dev.mysql.com/downloads/)

---

## 🚀 Démarrage Rapide

### 1. Clonage du dépôt

```bash
git clone https://github.com/yassinejador/bureau-ordre-manager.git
cd bureau-ordre-manager
```

### 2. Installation des dépendances et config

```bash
npm install
```

### 3. Configuration

1. Modifier `setupDatabase.js` avec vos identifiants MySQL
2. Exécuter les migrations :
   ```bash
   npm run db
   ```

### 4. Configuration de l'environnement (`.env`)

#### Copier `.env.example` dans `.env`

```bash
cp .env.example .env
```

#### Puis le configurer :

```env
DB_HOST=localhost
DB_USER=VOTRE_UTILISATEUR
DB_PASSWORD=VOTRE_MDP
DB_NAME=bureau_ordre
JWT_SECRET=VOTRE_JWT_SECRET
```

#### Vous pouvez exécuter la commande suivante pour générer une clé secrète JWT :

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"

```

### 5. Lancement de l'application

```bash
npm run dev
```

---

## 🔐 Accès utilisateurs

**Identifiants par défaut** :

### 📌 Direction

- **Email** : `admin.admin@fs.ucd.ac.ma`
- **Mot de passe** : `Admin@Admin`

### 📌 Secrétariat général

- **Email** : `secretariat.secretariat@fs.ucd.ac.ma`
- **Mot de passe** : `Secretariat@Secretariat`

### 📌 Agents administratifs

- **Email** : `agent.administratif@fs.ucd.ac.ma`
- **Mot de passe** : `Agent@Administratif`

---

## 👥 Contributeurs

| Membre            | GitHub                                            |
| ----------------- | ------------------------------------------------- |
| Oussama TAGHLAOUI | [ouss-tagh-dev](https://github.com/ouss-tagh-dev) |
| Yassmin ELBAZ     | [yassminelbaz](https://github.com/yassminelbaz)   |
| Yassine JADOR     | [yassinejador](https://github.com/yassinejador)   |
| Sanaa AZZA        | [sanaaazza](https://github.com/sanaaazza)         |
