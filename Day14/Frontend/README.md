# Day14 — Student Dashboard (Improved)

Continuation of Day13. New features added to the Student Dashboard frontend.

## ✨ New Features in Day14

| Feature | Description |
|---|---|
| **Edit Student** | Click the ✏ pencil icon on any row to open an edit modal and update student data via `PUT /students/:id` |
| **Export CSV** | Downloads current student list as a `.csv` file with one click |
| **Dark/Light Theme** | Toggle button in the top-right header switches between dark and light mode (persists via localStorage) |
| **Nav Count Badge** | Students sidebar link shows live count of total students |

## How to Run

### 1. Start the API (Day12 backend)
```bash
cd Day12/student-api
npm start   # → http://localhost:3000
```

### 2. Open the frontend
Open `Day14/Frontend/index.html` in your browser.

## API Endpoints Used

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/students` | Fetch all students |
| GET | `/students/stats` | Dashboard stats |
| POST | `/students` | Add a student |
| PUT | `/students/:id` | **Edit a student (NEW)** |
| DELETE | `/students/:id` | Delete a student |

## Project Structure

```
Day14/
└── Frontend/
    ├── index.html   ← Main UI with new modals & buttons
    ├── app.js       ← Logic: edit, export, theme, badge
    ├── style.css    ← Styles with light/dark theme vars
    └── README.md
```
