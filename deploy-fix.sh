#!/bin/bash

# Help Center Deployment Fix Script
echo "🚀 Starting Help Center deployment fix..."

# Check if we're in the right directory
if [ ! -f "astro.config.mjs" ]; then
    echo "❌ Error: Not in help center directory"
    exit 1
fi

# Clean previous builds
echo "🧹 Cleaning previous builds..."
rm -rf dist/
rm -rf .astro/

# Install dependencies
echo "📦 Installing dependencies..."
npm install

# Build with error handling
echo "🔨 Building application..."
if ! npm run build; then
    echo "❌ Build failed! Check the errors above."
    exit 1
fi

# Deploy to Cloudflare Pages
echo "☁️ Deploying to Cloudflare Pages..."
if ! wrangler pages deploy dist --project-name=gately-help-center; then
    echo "❌ Deployment failed! Check Cloudflare configuration."
    exit 1
fi

# Deploy worker router
echo "⚡ Deploying worker router..."
if ! wrangler deploy worker-router.js --name=gately-domain-router; then
    echo "❌ Worker deployment failed!"
    exit 1
fi

echo "✅ Deployment completed successfully!"
echo "📋 Next steps:"
echo "1. Check Cloudflare Pages dashboard for deployment status"
echo "2. Verify custom domains are pointing to the worker"
echo "3. Test the domains: genie-622v.cloud-cr.usegately.com"