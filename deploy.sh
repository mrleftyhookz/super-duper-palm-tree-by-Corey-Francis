#!/bin/bash

# Corey Francis Portfolio Deployment Script
# This script helps deploy the portfolio to GitHub Pages

echo "🚀 Deploying Corey Francis Portfolio..."

# Check if git is available
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install git first."
    exit 1
fi

# Check if we're in a git repository
if [ ! -d ".git" ]; then
    echo "❌ Not in a git repository. Please run this from your repository root."
    exit 1
fi

# Check if gh-pages branch exists
if git show-ref --verify --quiet refs/heads/gh-pages; then
    echo "📋 gh-pages branch exists, updating..."
    git checkout gh-pages
else
    echo "📋 Creating gh-pages branch..."
    git checkout --orphan gh-pages
fi

# Add all files
git add .
git commit -m "Deploy portfolio - $(date)"

# Push to gh-pages
git push origin gh-pages

# Switch back to main
git checkout main

echo "✅ Deployment complete!"
echo "🌐 Your portfolio should be live at: https://mrleftyhookz.github.io/super-duper-palm-tree-by-Corey-Francis"