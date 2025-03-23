#!/bin/bash

echo "Pulling latest code from Git..."
git pull origin main  # Change 'main' to your branch name if needed

git fetch origin
git reset --hard origin/main

echo "Installing PHP dependencies..."
composer install --optimize-autoloader --no-dev

echo "Installing Node dependencies..."
npm install

echo "Building frontend assets..."
npm run build

echo "Running migrations (if any)..."
php artisan migrate --force

echo "Clearing old caches..."
php artisan config:clear
php artisan route:clear
php artisan view:clear

echo "Caching config, routes, and views..."
php artisan config:cache
php artisan route:cache
php artisan view:cache

echo "All done! ✅ Project is ready to go!"
