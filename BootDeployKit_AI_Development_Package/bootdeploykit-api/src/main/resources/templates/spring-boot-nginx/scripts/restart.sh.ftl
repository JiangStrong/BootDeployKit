#!/usr/bin/env bash
set -euo pipefail

docker compose restart ${project.projectName} nginx
docker compose ps
