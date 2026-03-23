#!/bin/bash

# Color codes
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}=== Grocery Store - Complete Setup ===${NC}\n"

# Setup Backend
echo -e "${BLUE}Setting up Backend...${NC}"
cd backend

if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo -e "${GREEN}✓ Backend setup complete!${NC}"
echo "To start backend: cd backend && source venv/bin/activate && python app.py"

# Setup Frontend
echo -e "\n${BLUE}Setting up Frontend...${NC}"
cd ../frontend

echo "Installing Node dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete!${NC}"
echo "To start frontend: cd frontend && npm start"

echo -e "\n${GREEN}=== Setup Complete ===${NC}"
echo -e "Backend runs on: ${BLUE}http://localhost:5000${NC}"
echo -e "Frontend runs on: ${BLUE}http://localhost:3000${NC}"
