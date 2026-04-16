# Runbook — déploiement

## Prérequis

- Variables `VPS_*`, `APP_NAME`, `GITHUB_TOKEN` (packages `@theoleao`) documentées dans `.env.example`.
- Nginx : copier `deploy/nginx.conf` sur le serveur et adapter `YOUR_DOMAIN` / chemins.

## Commande

```bash
npm run deploy
```

Équivalent : `bash deploy/deploy.sh`.

## Après déploiement

- Vérifier `GET https://<domaine>/api/health`.
- Vérifier la SPA sur `/`.
- Consulter `pm2 logs <APP_NAME>-api`.
