#!/bin/bash

# Ancestral Wisdom Healing - GitHub Pages Deployment Script
# This script helps deploy the website to GitHub Pages

echo "🌟 Ancestral Wisdom Healing - Deployment Script"
echo "================================================"
echo ""

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "📦 Initializing Git repository..."
    git init
    echo "✅ Git initialized"
else
    echo "✅ Git repository exists"
fi

# Check for remote
if ! git remote get-url origin &> /dev/null; then
    echo ""
    echo "❌ No remote repository configured"
    echo "Please add your GitHub repository URL:"
    echo "  git remote add origin https://github.com/USERNAME/REPO.git"
    echo ""
    exit 1
else
    echo "✅ Remote repository configured"
fi

# Stage all files
echo ""
echo "📝 Staging files..."
git add .

# Check if there are changes to commit
if git diff-index --quiet HEAD --; then
    echo "✅ No changes to commit"
else
    # Commit changes
    echo ""
    read -p "Enter commit message (or press Enter for default): " commit_msg
    if [ -z "$commit_msg" ]; then
        commit_msg="Update website - $(date '+%Y-%m-%d %H:%M:%S')"
    fi
    
    git commit -m "$commit_msg"
    echo "✅ Changes committed"
fi

# Push to GitHub
echo ""
echo "🚀 Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo "✅ Successfully pushed to GitHub"
    echo ""
    echo "📋 Next steps:"
    echo "1. Go to your GitHub repository settings"
    echo "2. Navigate to 'Pages' section"
    echo "3. Set source to 'main' branch"
    echo "4. Your site will be available at: https://USERNAME.github.io/REPO/"
    echo ""
    echo "🎉 Deployment complete!"
else
    echo "❌ Push failed. Please check your repository configuration."
    exit 1
fi
