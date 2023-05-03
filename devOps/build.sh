#!/bin/bash
set -e

echo 'Build gps-web-tr production stack...'
docker compose --project-name gps-web-tr -f docker-compose.yaml build
