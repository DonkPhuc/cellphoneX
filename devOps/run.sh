#!/bin/bash
set -e

echo 'Run gps-web-tr production stack...'
docker compose --project-name gps-web-tr -f docker-compose.yaml up -d
