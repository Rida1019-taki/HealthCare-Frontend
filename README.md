# HealthCare+ Frontend

## 1. Nom du projet

**Nom du projet :** HealthCare+ Frontend – Système de Gestion Médicale

---

# 2. Présentation du projet

HealthCare+ Frontend est une application web développée avec React.js permettant de gérer les patients, les médecins, les rendez-vous et les dossiers médicaux d'une clinique. Elle s'adresse au personnel médical et administratif. L'application consomme une API REST sécurisée par JWT afin de faciliter la gestion des informations médicales. Son objectif principal est de proposer une interface moderne, sécurisée et intuitive pour simplifier le travail quotidien des utilisateurs.

---

# 3. Problématique

Le problème identifié est que la gestion des informations médicales est souvent réalisée avec plusieurs outils ou de manière manuelle, ce qui ralentit le travail et augmente le risque d'erreurs.

La solution proposée permet de centraliser la gestion des patients, des médecins, des rendez-vous et des dossiers médicaux dans une seule application sécurisée et facile à utiliser.

---

# 4. Fonctionnalités principales

- Se connecter avec une authentification JWT.
- Gérer les patients (ajouter, modifier, supprimer et consulter).
- Gérer les médecins (ajouter, modifier, supprimer et consulter).
- Gérer les rendez-vous médicaux.
- Gérer les dossiers médicaux.
- Rechercher, trier et filtrer les données.
- Consulter les détails d'un patient.
- Recevoir des notifications après chaque opération.
- Protéger les routes selon le rôle de l'utilisateur.
- Gérer automatiquement les erreurs de l'API.

---

# 5. Technologies utilisées

| Technologie | Utilisation dans le projet |
|-------------|----------------------------|
| React.js | Développement de l'interface utilisateur |
| React Router | Navigation entre les différentes pages |
| Axios | Communication avec l'API REST |
| React Hook Form | Gestion des formulaires |
| Yup | Validation des formulaires |
| React Toastify | Notifications utilisateur |
| CSS | Mise en forme de l'interface |
| Docker | Déploiement du frontend |
| Git & GitHub | Gestion des versions |
| Figma | Réalisation de la maquette |

Nous avons utilisé **React.js** pour développer une interface dynamique.

Nous avons utilisé **Axios** pour communiquer avec l'API HealthCare+.

Nous avons utilisé **React Hook Form** et **Yup** pour créer des formulaires fiables avec validation.

Nous avons utilisé **React Router** pour la navigation entre les différentes pages.

---

# 6. Installation et lancement

## 6.1 Prérequis

Pour utiliser ce projet, vous devez disposer de :

- Node.js
- npm
- Git
- Visual Studio Code
- API HealthCare+ en cours d'exécution

---

## 6.2 Cloner le dépôt

```bash
git clone https://github.com/VOTRE_COMPTE/healthcare-frontend.git
```

---

## 6.3 Ouvrir le dossier

```bash
cd healthcare-frontend
```

---

## 6.4 Installer les dépendances

```bash
npm install
```

---

## 6.5 Variables d'environnement

Créer un fichier `.env`

```env
VITE_API_URL=http://localhost:8080
```

ou

```env
VITE_API_URL=https://votre-api.onrender.com
```

---

## 6.6 Lancer le projet

```bash
npm run dev
```

---

## 6.7 Ouvrir le projet

```
http://localhost:5173
```

### Point de vigilance

- Vérifier que l'API est démarrée.
- Vérifier l'URL de l'API dans le fichier `.env`.
- Ne jamais publier les clés secrètes ou les tokens JWT.

---

# 7. Captures d'écran

## Capture 1

### Titre

Accueil

```md
![Accueil](images/home.png)
```

### Explication

Cette capture montre la page d'accueil présentant les principales fonctionnalités de l'application.

---

## Capture 2

### Titre

Gestion des patients

```md
![Patients](images/patients.png)
```

### Explication

Cette capture montre la liste des patients avec les fonctionnalités de recherche, de tri et de gestion.

---

# 8. Contribution personnelle

Ma contribution principale a porté sur le développement complet de l'application frontend.

J'ai également travaillé sur l'intégration de l'API HealthCare+, la sécurisation de l'application avec JWT, la gestion des rôles, les formulaires, les validations et les appels HTTP.

J'ai été responsable de la conception de l'interface utilisateur, de la navigation, des composants React réutilisables, des interceptors Axios, de la gestion des erreurs, des notifications utilisateur et du déploiement avec Docker.

---

# 9. Difficultés rencontrées

## Difficulté 1

### Problème rencontré

Les routes protégées restaient accessibles après certaines manipulations de la session utilisateur.

### Recherches / Tests

J'ai vérifié le stockage du token, les guards React Router et les interceptors Axios.

### Solution

J'ai créé un AuthGuard, un RoleGuard et une gestion centralisée de la session permettant de rediriger automatiquement l'utilisateur vers la page de connexion lorsque le token est absent ou invalide.

### Ce que j'ai appris

J'ai appris à sécuriser une application React avec JWT et React Router.

### Texte final

J'ai rencontré un problème lié à la protection des routes. Pour comprendre son origine, j'ai testé la gestion du token, des rôles et des interceptors. J'ai résolu le problème grâce à un AuthGuard, un RoleGuard et une gestion centralisée de la session. Cette difficulté m'a permis de mieux comprendre la sécurisation d'une application React.

---

## Difficulté 2

### Problème rencontré

La gestion des erreurs était répétée dans chaque appel API.

### Recherches / Tests

J'ai étudié les Axios Interceptors et leur fonctionnement.

### Solution

J'ai créé des interceptors de requête et de réponse permettant d'ajouter automatiquement le token JWT et de gérer les erreurs HTTP (400, 401, 403, 404 et 500).

### Ce que j'ai appris

J'ai appris à centraliser la gestion des appels HTTP afin de rendre le code plus propre et plus maintenable.

---

# 10. Améliorations possibles

Dans une prochaine version, je pourrais :

- ajouter la pagination des listes ;
- intégrer des graphiques statistiques dans le tableau de bord ;
- permettre l'upload de documents médicaux ;
- développer des tests unitaires et des tests d'intégration.

### Conclusion

Ces améliorations permettraient d'améliorer les performances, l'expérience utilisateur et la qualité globale de l'application.

---

# ✅ Checklist finale

## Présentation

- [x] Le nom du projet est clair.
- [x] Le projet est présenté en 3 à 5 lignes.
- [x] Le public cible est identifié.
- [x] Le besoin est expliqué.
- [x] L'objectif est précisé.

## Fonctionnalités

- [x] 3 à 6 fonctionnalités.
- [x] Chaque fonctionnalité commence par un verbe.
- [x] Elles correspondent à des actions réelles.

## Technologies

- [x] Les technologies sont indiquées.
- [x] Leur rôle est expliqué.

## Installation

- [x] Les prérequis sont présents.
- [x] Le dépôt est correct.
- [x] Les commandes fonctionnent.
- [x] L'adresse locale est indiquée.
- [x] Aucune donnée sensible n'est publiée.

## Captures

- [ ] Deux captures minimum.

## Contribution

- [x] Ma contribution est précise.
- [x] Les tâches sont clairement décrites.

## Difficultés

- [x] Les difficultés sont expliquées.
- [x] Les recherches sont décrites.
- [x] Les solutions sont précisées.
- [x] Les apprentissages sont présentés.

## Améliorations

- [x] 4 améliorations réalistes.

---

# Validation finale

Une personne qui découvre le projet peut comprendre :

- son objectif ;
- ses fonctionnalités ;
- les technologies utilisées ;
- la manière de l'installer ;
- les difficultés rencontrées ;
- les améliorations envisagées.