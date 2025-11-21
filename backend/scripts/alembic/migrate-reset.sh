#!/bin/bash
# File: backend/migrate-reset.sh
# Description: Reset database by downgrading to base and upgrading to head

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Navigate to backend directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$BACKEND_DIR"

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    echo -e "${YELLOW}Activating virtual environment...${NC}"
    source .venv/bin/activate
fi

echo -e "${RED}⚠️  WARNING: This will RESET your entire database!${NC}"
echo -e "${RED}All data will be lost!${NC}"
echo ""

# Ask for confirmation
read -p "Are you sure you want to continue? Type 'RESET' to confirm: " -r
echo
if [[ ! $REPLY == "RESET" ]]; then
    echo -e "${YELLOW}Reset cancelled.${NC}"
    exit 0
fi

echo -e "${YELLOW}Downgrading to base...${NC}"
alembic downgrade base

echo ""
echo -e "${YELLOW}Upgrading to head...${NC}"
alembic upgrade head

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Database reset successfully!${NC}"
    alembic current
else
    echo -e "${RED}✗ Failed to reset database${NC}"
    exit 1
fi