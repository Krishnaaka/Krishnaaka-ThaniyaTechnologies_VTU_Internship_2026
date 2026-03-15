# 📝 Task Manager Web Application

A simple full-stack web application to manage daily tasks — built with **React**, **FastAPI**, and **JSON file storage**.

---

## 🗂️ Project Structure

```
Day11/
├── Backend/
│   ├── main.py          # FastAPI app — all routes + file-based storage
│   └── requirements.txt # Python dependencies
└── Frontend/
    ├── src/
    │   ├── App.jsx      # Main React component (UI + fetch logic)
    │   ├── App.css      # Styling
    │   └── main.jsx     # React entry point
    ├── index.html
    ├── package.json
    └── vite.config.js
```

---

## 🛠️ Tech Stack

| Layer    | Technology          |
|----------|---------------------|
| Frontend | React 18 + Vite     |
| Backend  | Python + FastAPI    |
| Storage  | JSON file (`tasks.json`) |
| Styling  | Plain CSS           |

---

## ⚙️ What We Built — Step by Step

### Step 1 — FastAPI Backend
- Created `main.py` with three REST API endpoints:
  - `GET /tasks` — fetch all tasks
  - `POST /tasks` — add a new task
  - `DELETE /tasks/{id}` — remove a task by ID
- Added **CORS middleware** so the React frontend can communicate with the backend
- Used **Pydantic** for request body validation (`Task` model with a `title` field)
- Tasks are stored in a **`tasks.json`** file using Python's built-in `json` and `uuid` modules (no MongoDB install required)

### Step 2 — React Frontend
- Bootstrapped with **Vite** for fast development
- Built a single `App.jsx` component that:
  - Loads tasks on page mount via `fetch()`
  - Lets users type and submit new tasks (POST to backend)
  - Shows all tasks in a list
  - Lets users delete tasks with a ✕ button (DELETE to backend)
- Clean minimal CSS with a white card layout

### Step 3 — Integration & Testing
- Verified all three API operations (add, list, delete) work end-to-end
- Confirmed data persists to `tasks.json` across server restarts

---

## 🚀 How to Run

### Prerequisites
- Python 3.8+
- Node.js 18+

### Backend
```bash
cd Day11/Backend
pip install -r requirements.txt
python -m uvicorn main:app --reload
```
Backend runs at → **http://localhost:8000**  
API docs at → **http://localhost:8000/docs**

### Frontend
Open a **second terminal**:
```bash
cd Day11/Frontend
npm install
npm run dev
```
Frontend runs at → **http://localhost:5173**

---

## 📡 API Endpoints

| Method | Endpoint         | Description        | Body                  |
|--------|------------------|--------------------|-----------------------|
| GET    | `/tasks`         | Get all tasks      | —                     |
| POST   | `/tasks`         | Create a new task  | `{ "title": "..." }` |
| DELETE | `/tasks/{id}`    | Delete a task      | —                     |

---

## 📁 Data Storage

Tasks are saved to `Backend/tasks.json`:
```json
[
  { "id": "uuid-here", "title": "Buy groceries" },
  { "id": "uuid-here", "title": "Complete project report" }
]
```

> **Note:** This project was initially designed with MongoDB + Motor (async driver). Since MongoDB was not installed locally, storage was simplified to a JSON file. To switch to MongoDB, replace the `load_tasks`/`save_tasks` functions in `main.py` with Motor async calls and set your `MONGO_URL`.

---

## 📸 Screenshots

### App — Empty State
![Empty state](https://i.imgur.com/placeholder.png)

---

## 🙌 Author

Built as part of the **VTU Internship 2026** program.
