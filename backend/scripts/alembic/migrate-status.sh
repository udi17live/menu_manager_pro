#!/bin/bash
# File: backend/migrate-status.sh
# Description: Show current migration status and history

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Navigate to backend directory
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$BACKEND_DIR"

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    source .venv/bin/activate
fi

echo -e "${BLUE}=== Current Migration Status ===${NC}"
alembic current

echo ""
echo -e "${BLUE}=== Migration History ===${NC}"
alembic history --verbose

echo ""
echo -e "${BLUE}=== Pending Migrations ===${NC}"
# Check if we're at head
CURRENT=$(alembic current 2>/dev/null | grep -oP '(?<=\(head\)|\s)[a-f0-9]+' || echo "")
if alembic current 2>/dev/null | grep -q "(head)"; then
    echo -e "${GREEN}✓ Database is up to date!${NC}"
else
    echo -e "${YELLOW}⚠ There are pending migrations to apply${NC}"
fi