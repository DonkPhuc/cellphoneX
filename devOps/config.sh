#!/bin/bash
set -e

echo 'Config gps-web-tr production stack...'
docker compose --project-name gps-web-tr -f docker-compose.yaml config
