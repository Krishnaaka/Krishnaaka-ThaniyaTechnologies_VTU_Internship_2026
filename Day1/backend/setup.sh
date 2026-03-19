#!/bin/bash

# Create virtual environment
python3 -m venv venv

# Activate virtual environment
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Initialize database
python3 -c "from app import app, db; app.app_context().push(); db.create_all()"

echo "Backend setup complete!"
