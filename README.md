# SportSee

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)
![Recharts](https://img.shields.io/badge/Recharts-2-FF0101)

SportSee est une startup dédiée au coaching sportif. Ce projet est la nouvelle
version de la **page profil utilisateur** : un tableau de bord d'analytics qui
permet à l'utilisateur de suivre son activité quotidienne, la durée de ses
sessions, ses performances, son score du jour et ses données nutritionnelles.

## Structure du projet

| Dossier     | Description                                                        |
| ----------- | ------------------------------------------------------------------ |
| `backend/`  | Micro API NodeJS fournie par OpenClassrooms (données d'exemple)     |
| `frontend/` | Application React du tableau de bord (Vite, React Router, Recharts) |

## Prérequis

- [NodeJS](https://nodejs.org/fr) version 18 ou supérieure
- npm (installé avec NodeJS)

## Installation

### 1. Backend (API)

```bash
cd backend
npm install
npm run dev
```

L'API est alors disponible sur `http://localhost:3000`.

> Le port peut être changé via la variable d'environnement `PORT` :
> `PORT=3001 npm run dev`

### 2. Frontend (tableau de bord)

```bash
cd frontend
npm install
npm run dev
```

L'application est alors disponible sur l'URL affichée dans le terminal
(par défaut `http://localhost:5173`).

## Données : mock ou API

Par défaut, l'application fonctionne avec des **données mockées** : elle est
donc utilisable immédiatement, sans démarrer le backend.

Pour brancher l'application sur l'API, créer un fichier `frontend/.env`
(un modèle est fourni dans `frontend/.env.example`) :

```bash
VITE_USE_MOCK=false
VITE_API_URL=http://localhost:3000
```

Puis relancer le serveur de développement.

| Variable        | Valeurs          | Rôle                                             |
| --------------- | ---------------- | ------------------------------------------------ |
| `VITE_USE_MOCK` | `true` / `false` | Utiliser les données mockées ou l'API            |
| `VITE_API_URL`  | URL              | URL de base de l'API (si `VITE_USE_MOCK=false`)  |

Seuls deux utilisateurs sont disponibles dans les données d'exemple :
`12` (Karl) et `18` (Cecilia). Le tableau de bord est accessible sur
`/user/12` et `/user/18`.

## Scripts disponibles (frontend)

| Commande          | Description                          |
| ----------------- | ------------------------------------ |
| `npm run dev`     | Serveur de développement             |
| `npm run build`   | Build de production                  |
| `npm run preview` | Prévisualisation du build            |
| `npm run lint`    | Analyse du code avec ESLint          |
| `npm test`        | Tests unitaires (Vitest)             |

## Architecture du frontend

```
frontend/src/
├── assets/        # Logo et icônes SVG
├── components/    # Composants réutilisables (header, sidebar, graphiques…)
├── hooks/         # Hooks personnalisés (useFetchData)
├── models/        # Standardisation des données (formatters + tests)
├── pages/         # Pages (Accueil, Tableau de bord, 404)
└── services/      # Couche d'accès aux données (API, mock)
```

### Flux de données

1. Les composants n'appellent **jamais** l'API directement : ils passent par le
   hook `useFetchData`, qui délègue au service `dataService`.
2. `dataService` choisit le fournisseur (`apiProvider` ou `mockProvider`)
   selon la configuration.
3. Les données brutes sont ensuite **standardisées** par `models/dataFormatter`
   avant d'être retournées aux composants. C'est cette couche qui unifie les
   différences de schéma de l'API (ex. `todayScore` vs `score`), traduit les
   catégories de performance et convertit les jours en initiales françaises.

### Choix techniques

- **Recharts** pour les graphiques : API déclarative adaptée à React,
  plus rapide à prendre en main que D3 pour un résultat équivalent ici.
- **Fetch** natif pour les appels HTTP : aucun besoin justifiant une
  dépendance supplémentaire comme Axios.
- **PropTypes** et **JSDoc** pour documenter et fiabiliser les composants
  et les services.

## Endpoints de l'API

| Endpoint                          | Description                                |
| --------------------------------- | ------------------------------------------ |
| `/user/:id`                       | Informations principales et données clés   |
| `/user/:id/activity`              | Activité quotidienne (poids, calories)     |
| `/user/:id/average-sessions`      | Durée moyenne des sessions par jour        |
| `/user/:id/performance`           | Performances (cardio, énergie, etc.)       |

## Compatibilité

Projet optimisé pour un affichage **desktop** (1024 × 780 minimum).
Les versions tablette et mobile seront traitées dans un sprint ultérieur.
