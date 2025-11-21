#!/bin/bash
# File: backend/migrate-create.sh
# Description: Create a new migration with autogenerate

set -e  # Exit on error

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if message is provided
if [ -z "$1" ]; then
    echo -e "${RED}Error: Migration message is required${NC}"
    echo "Usage: ./migrate-create.sh \"migration message\""
    exit 1
fi

MESSAGE="$1"

echo -e "${YELLOW}Creating new migration: ${MESSAGE}${NC}"

# Navigate to backend directory (where alembic.ini is located)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BACKEND_DIR="$(cd "$SCRIPT_DIR/../.." && pwd)"
cd "$BACKEND_DIR"

# Activate virtual environment if it exists
if [ -d ".venv" ]; then
    echo -e "${YELLOW}Activating virtual environment...${NC}"
    source .venv/bin/activate
fi

# Create migration
alembic revision --autogenerate -m "$MESSAGE"

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✓ Migration created successfully!${NC}"
    echo -e "${YELLOW}Don't forget to review the migration file before applying it.${NC}"
else
    echo -e "${RED}✗ Failed to create migration${NC}"
    exit 1
fi