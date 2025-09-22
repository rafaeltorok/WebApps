#!/bin/bash

set -e

echo "Building the frontend..."
cd client
npm install
npm run build

echo "Building the backend..."
cd ../server
npm install

echo "Copying frontend assets to backend..."
cp -r ../client/dist .

echo "Build complete."
