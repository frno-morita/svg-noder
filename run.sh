#!/usr/bin/env bash
set -e

PWD="$(cd "$(dirname "$0")" && pwd)"

docker-compose build
docker-compose up -d
docker-compose ps