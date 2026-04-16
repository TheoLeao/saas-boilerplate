# Architecture — vue d’ensemble

## Monorepo

- **`apps/api`** — API NestJS (Prisma, auth JWT, modules métier).
- **`apps/web`** — SPA React + Vite (proxy `/api` vers l’API en dev).
- **`packages/shared-types`** — Types et enums partagés front/back.

## Flux de données

1. Le navigateur appelle `/api/*` (proxy Vite en local, Nginx en prod).
2. L’API valide les entrées, applique les guards JWT, persiste via Prisma.

## Documentation et skills IA

- **`docs/`** — documentation humaine (architecture, runbooks, ADR).
- **`skills/`** — skills agents (fichiers `SKILL.md` + registre `registry.yml`).

Voir [ai-skills.md](./ai-skills.md) et [documentation.md](./documentation.md).
