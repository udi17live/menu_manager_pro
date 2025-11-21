#!/bin/bash
# File: backend/migrate-up.sh
# Description: Apply pending migrations to the database

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

# Check for specific revision or default to 'head'
REVISION="${1:-head}"

echo -e "${BLUE}Current migration status:${NC}"
alembic current

echo ""
echo -e "${YELLOW}Applying migrations to: ${REVISION}${NC}"

# Apply migrations
alembic upgrade "$REVISION"

if [ $? -eq 0 ]; then
    echo ""
    echo -e "${GREEN}✓ Migrations applied successfully!${NC}"
    echo -e "${BLUE}New migration status:${NC}"
    alembic current
else
    echo -e "${RED}✗ Failed to apply migrations${NC}"
    exit 1
fi