# SaaS Boilerplate

Boilerplate monorepo pour lancer un nouveau projet SaaS rapidement.
Basé sur les patterns extraits de : **vinted-money**, **sport_tracking/mobly**, **@theoleao/libs**.

## Stack

| Couche | Techno |
|--------|--------|
| **Monorepo** | npm workspaces + Turbo |
| **Backend** | NestJS 11 + TypeScript |
| **Database** | PostgreSQL + Prisma 6 |
| **Auth** | JWT (Bearer + cookie httpOnly) + Passport |
| **Frontend** | React 19 + Vite 6 + React Router 7 |
| **Styles** | Tailwind CSS 4 (design tokens CSS) |
| **État** | TanStack Query + Zustand |
| **Libs partagées** | `@theoleao/messaging`, `@theoleao/stripe-helpers` |
| **Déploiement** | rsync → VPS + Nginx + PM2 |

## Structure

```
saas-boilerplate/
├── apps/
│   ├── api/                    # Backend NestJS
│   │   ├── prisma/schema.prisma
│   │   └── src/
│   │       ├── auth/           # JWT auth (register, login, guards)
│   │       ├── users/          # User CRUD
│   │       ├── health/         # Health check endpoint
│   │       ├── prisma/         # Prisma service (global)
│   │       └── common/         # Decorators (@Public, @CurrentUser)
│   └── web/                    # Frontend React SPA
│       └── src/
│           ├── components/     # UI + layout (shell type VintedMoney)
│           ├── pages/          # Écrans app (dashboard, settings, docs…)
│           ├── config/         # Navigation + méta titres (nav.tsx)
│           ├── routes/         # Auth hors shell (login, register)
│           ├── stores/         # Zustand (auth, app shell)
│           ├── lib/            # API client, cn() helper
│           └── styles/         # Tailwind + design tokens
├── packages/
│   └── shared-types/           # Enums, API contracts TypeScript
├── deploy/
│   ├── deploy.sh               # Script rsync + PM2
│   └── nginx.conf              # Config Nginx reverse proxy
├── docs/                       # Doc humaine (architecture, runbooks, ADR)
├── skills/                     # Skills agents (SKILL.md + registry.yml)
├── scripts/
│   └── devctl.sh               # start/stop/restart front | back | app
├── turbo.json
└── .env.example
```

## Démarrage

```bash
# 1. Cloner et configurer
cp .env.example .env
# Éditer .env avec tes valeurs

# 2. Installer
npm install

# 3. Configurer la DB
npm run db:push

# 4. Lancer en dev
npm run dev
# → API sur http://localhost:4000
# → Frontend sur http://localhost:5173
```

## Commandes utiles

| Commande | Description |
|----------|-------------|
| `npm run dev` | Lance API + frontend en parallèle |
| `npm run dev:api` | Lance seulement l'API |
| `npm run dev:web` | Lance seulement le frontend |
| `npm run build` | Build tout |
| `npm run db:generate` | Génère le client Prisma |
| `npm run db:push` | Push le schéma vers la DB |
| `npm run db:migrate` | Crée une migration |
| `npm run db:studio` | Ouvre Prisma Studio |
| `npm run deploy` | Déploie sur le VPS |
| `npm run front:start` / `front:stop` / `front:restart` | Vite en arrière-plan (logs `.run/web.log`) |
| `npm run back:start` / `back:stop` / `back:restart` | Nest en arrière-plan (logs `.run/api.log`) |
| `npm run app:start` / `app:stop` / `app:restart` | API puis web (même dossier `.run/`) |
| `npm run front:status` / `back:status` / `app:status` | Affiche si les PID sont actifs |

### Documentation et skills IA

- **`docs/`** — index : [`docs/README.md`](./docs/README.md) (architecture, runbooks, ADR).
- **`skills/`** — skills agents : [`skills/README.md`](./skills/README.md) et `skills/registry.yml`.

Pour la convention détaillée : [`docs/architecture/ai-skills.md`](./docs/architecture/ai-skills.md) et [`docs/architecture/documentation.md`](./docs/architecture/documentation.md).

## Nouveau projet à partir de ce boilerplate

```bash
# 1. Copier
cp -r saas-boilerplate mon-projet
cd mon-projet

# 2. Réinitialiser git
rm -rf .git && git init

# 3. Renommer
# - Mettre à jour APP_NAME dans .env
# - Mettre à jour deploy/nginx.conf (YOUR_DOMAIN, APP_NAME)
# - Mettre à jour le titre dans apps/web/index.html
# - Mettre à jour le nom dans apps/web/src/components/layout/AppLayout.tsx

# 4. Ajouter tes modules métier
# - Créer un nouveau module NestJS : nest g module <nom> dans apps/api/
# - Créer les pages correspondantes dans apps/web/src/routes/
# - Mettre à jour le schéma Prisma
```

## Packages @theoleao disponibles

| Package | Usage |
|---------|-------|
| `@theoleao/messaging` | Email (Brevo, Klaviyo) + SMS |
| `@theoleao/stripe-helpers` | Checkout, Connect, webhooks, remboursements |
| `@theoleao/google-oauth` | OAuth2 Google |
| `@theoleao/fitbit-client` | API Fitbit |
| `@theoleao/google-health-client` | Health Connect Google |
| `@theoleao/calendar-sync` | Google Calendar sync |
| `@theoleao/nestjs-stripe-connect` | Module NestJS Stripe Connect |
| `@theoleao/nestjs-upload` | Module NestJS upload fichiers |
