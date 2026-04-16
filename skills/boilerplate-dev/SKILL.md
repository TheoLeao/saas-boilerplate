---
name: boilerplate-dev
description: Conventions du monorepo saas-boilerplate (Nest API, Vite web, scripts dev/deploy).
---

# Développement — saas-boilerplate

## Quand l’utiliser

- Toute tâche touchant `apps/api`, `apps/web`, `packages/shared-types`, ou les scripts racine.

## Structure à respecter

- **API** : nouveaux domaines sous `apps/api/src/<domain>/` (module + controller + service), enregistrer dans `app.module.ts`.
- **Web** : pages sous `apps/web/src/pages/`, navigation dans `config/nav.tsx`, shell dans `components/layout/`, auth dans `routes/auth/`, appels via `lib/api.ts`.
- **Auth** : routes publiques avec `@Public()` ; utilisateur courant avec `@CurrentUser('sub')`.

## Commandes utiles

- Dev tout : `npm run dev` (Turbo).
- Processus en arrière-plan : `npm run app:start` / `app:stop` / `app:restart` (voir `scripts/devctl.sh`).
- Build : `npm run build`.

## Déploiement

- `npm run deploy` — variables VPS dans `.env` (voir `docs/runbooks/deploy.md`).

## Ne pas faire

- Ne pas élargir le scope au-delà de la demande.
- Ne pas committer `.env` ni `.run/`.
