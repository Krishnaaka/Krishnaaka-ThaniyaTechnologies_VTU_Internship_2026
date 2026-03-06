# Day5 - Student Dashboard

A simple student dashboard using REST API.

## Backend

- Flask REST API for managing students.
- Endpoints:
  - GET /students: Get all students
  - POST /students: Add a new student

## Frontend

- Simple HTML dashboard to view and add students.

## Setup

1. Install backend dependencies: `pip install -r backend/requirements.txt`
2. Run backend: `python backend/app.py`
3. Open frontend/index.html in browser (ensure CORS is allowed or serve frontend).

Note: For production, serve frontend properly to avoid CORS issues.