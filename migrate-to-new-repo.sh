#!/bin/bash

# Migration script to move this project to a new repository
# Usage: ./migrate-to-new-repo.sh <new-repo-url>

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if URL provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Please provide your new repository URL${NC}"
    echo "Usage: ./migrate-to-new-repo.sh <new-repo-url>"
    echo "Example: ./migrate-to-new-repo.sh https://github.com/yourusername/vib3-visualizer.git"
    exit 1
fi

NEW_REPO_URL=$1

echo -e "${YELLOW}=== Migration to New Repository ===${NC}\n"

# Confirm with user
echo -e "This will:"
echo -e "  1. Create a backup of current git history"
echo -e "  2. Remove old git history"
echo -e "  3. Create fresh git repository"
echo -e "  4. Push to: ${GREEN}$NEW_REPO_URL${NC}\n"
read -p "Continue? (y/n) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo -e "${RED}Migration cancelled${NC}"
    exit 1
fi

# Step 1: Backup current .git
echo -e "\n${YELLOW}Step 1: Backing up current git history...${NC}"
if [ -d ".git" ]; then
    mv .git .git.backup
    echo -e "${GREEN}✓ Backup created at .git.backup${NC}"
else
    echo -e "${YELLOW}No .git directory found, skipping backup${NC}"
fi

# Step 2: Initialize new git repo
echo -e "\n${YELLOW}Step 2: Initializing new repository...${NC}"
git init
echo -e "${GREEN}✓ New repository initialized${NC}"

# Step 3: Add all files
echo -e "\n${YELLOW}Step 3: Adding all files...${NC}"
git add .
echo -e "${GREEN}✓ Files staged${NC}"

# Step 4: Create initial commit
echo -e "\n${YELLOW}Step 4: Creating initial commit...${NC}"
git commit -m "Initial commit: Vib3 Audio Visualizer

Complete React application with:
- Audio-reactive visualizer (vib34d + vib3plus)
- GSAP animations and morphing effects
- Responsive design with Tailwind CSS
- Framer Motion interactions
- D3.js data visualizations"
echo -e "${GREEN}✓ Initial commit created${NC}"

# Step 5: Add remote
echo -e "\n${YELLOW}Step 5: Adding remote repository...${NC}"
git remote add origin "$NEW_REPO_URL"
echo -e "${GREEN}✓ Remote added${NC}"

# Step 6: Create main branch and push
echo -e "\n${YELLOW}Step 6: Pushing to new repository...${NC}"
git branch -M main
git push -u origin main
echo -e "${GREEN}✓ Pushed to remote${NC}"

# Success message
echo -e "\n${GREEN}==================================${NC}"
echo -e "${GREEN}Migration complete!${NC}"
echo -e "${GREEN}==================================${NC}"
echo -e "\nYour project is now at:"
echo -e "${GREEN}$NEW_REPO_URL${NC}"
echo -e "\nOld git history backed up at: ${YELLOW}.git.backup${NC}"
echo -e "(You can delete this backup once you verify everything works)\n"
echo -e "Next steps:"
echo -e "  1. Visit your new repository on GitHub"
echo -e "  2. Update repository settings (description, topics, etc.)"
echo -e "  3. Configure GitHub Pages if needed"
echo -e "  4. Delete .git.backup when ready: ${YELLOW}rm -rf .git.backup${NC}\n"
