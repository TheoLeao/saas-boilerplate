#!/bin/bash
set -euo pipefail

# ─── Configuration ────────────────────────────────────────
# Set these in .env or export before running
: "${VPS_USER:?Set VPS_USER}"
: "${VPS_HOST:?Set VPS_HOST}"
: "${VPS_PATH:?Set VPS_PATH}"
: "${APP_NAME:?Set APP_NAME}"

VPS="${VPS_USER}@${VPS_HOST}"
REMOTE="${VPS_PATH}/${APP_NAME}"

echo "🚀 Deploying ${APP_NAME} to ${VPS}:${REMOTE}"

# ─── Sync files ───────────────────────────────────────────
echo "📦 Syncing files..."
rsync -avz --delete \
  --exclude 'node_modules' \
  --exclude '.git' \
  --exclude '.env' \
  --exclude '.turbo' \
  --exclude 'dist' \
  ./ "${VPS}:${REMOTE}/"

# ─── Remote build ────────────────────────────────────────
echo "🔨 Building on server..."
ssh "${VPS}" << DEPLOY
  cd ${REMOTE}

  # Install dependencies
  export NODE_AUTH_TOKEN=\${GITHUB_TOKEN:-}
  npm install --production=false

  # Database
  cd apps/api
  npx prisma generate
  npx prisma db push --accept-data-loss
  cd ../..

  # Build
  npm run build:api
  npm run build:web

  # Copy frontend to nginx root
  sudo mkdir -p /var/www/${APP_NAME}
  sudo cp -r apps/web/dist/* /var/www/${APP_NAME}/

  # Restart API with PM2
  pm2 restart ${APP_NAME}-api 2>/dev/null || \
    pm2 start apps/api/dist/main.js --name ${APP_NAME}-api

  pm2 save

  echo "✅ Deploy complete"
DEPLOY

echo "🎉 Done!"
