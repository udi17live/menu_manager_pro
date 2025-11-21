#!/bin/bash
# File: backend/migrate-down.sh
# Description: Rollback database migrations

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
BLUE='\033[0;34m'
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

# Default to rolling back one revision
STEPS="${1:--1}"

echo -e "${BLUE}Current migration status:${NC}"
alembic current

echo ""
echo -e "${RED}⚠️  WARNING: This will rollback the database!${NC}"
echo -e "${YELLOW}Rolling back to: ${STEPS}${NC}"
echo ""

# Ask for confirmation
read -p "Are you sure you want to continue? (yes/no): " -r
echo
if [[ ! $REPLY =~ ^[Yy][Ee][Ss]$ ]]; then
    echo -e "${YELLOW}Rollback cancelled.${NC}"
    exit 0
fi

# Rollback migrations
alembic downgrade "$STEPS"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Migrations rolled back successfully!${NC}"
    echo -e "${BLUE}New migration status:${NC}"
    alembic current
else
    echo -e "${RED}✗ Failed to rollback migrations${NC}"
    exit 1
fi