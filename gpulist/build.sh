#!/bin/bash
set -e
echo "🚀 Building frontend and backend (monorepo single-service)"

# Build frontend (need dev deps)
cd client
npm ci            # install dev + prod for build
npm run build     # creates client/dist
if [ ! -d "dist" ]; then
  echo "❌ Frontend build failed"
  exit 1
fi
cd ..

# Copy artifacts to server
rm -rf server/dist
cp -r client/dist server/dist

# Install backend production deps
cd server
npm ci --only=production
echo "🎉 Build done: $(find dist -type f | wc -l) files"
