#!/bin/bash

# Deployment script for Fly.io
echo "🚀 Deploying Tensil AI to Fly.io..."

# Check if flyctl is installed
if ! command -v flyctl &> /dev/null; then
    echo "❌ flyctl is not installed. Please install it first:"
    echo "   https://fly.io/docs/hands-on/install-flyctl/"
    exit 1
fi

# Check if user is logged in
if ! flyctl auth whoami &> /dev/null; then
    echo "🔐 Please log in to Fly.io first:"
    flyctl auth login
fi

# Build and deploy
echo "🔨 Building and deploying..."
flyctl deploy

echo "✅ Deployment complete!"
echo "🌐 Your app should be available at: https://tensil-ai.fly.dev"
