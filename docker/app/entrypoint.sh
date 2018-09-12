#!/usr/bin/env bash
set -e

cd /var/www/html

yarn install

# Start nodejs application
nodejs /var/www/html/app
