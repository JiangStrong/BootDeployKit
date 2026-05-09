#!/usr/bin/env bash
set -euo pipefail

echo "Building and starting ${project.projectName} with MySQL and Redis..."
cp -n .env.example .env || true
docker compose down
docker compose up -d --build
docker compose ps
echo "Deployment completed."
