from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import json, uuid, os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

DB_FILE = "tasks.json"

def load_tasks():
    if not os.path.exists(DB_FILE):
        return []
    with open(DB_FILE, "r") as f:
        return json.load(f)

def save_tasks(tasks):
    with open(DB_FILE, "w") as f:
        json.dump(tasks, f, indent=2)


class Task(BaseModel):
    title: str


@app.get("/tasks")
def get_tasks():
    return load_tasks()


@app.post("/tasks", status_code=201)
def create_task(task: Task):
    tasks = load_tasks()
    new_task = {"id": str(uuid.uuid4()), "title": task.title}
    tasks.append(new_task)
    save_tasks(tasks)
    return new_task


@app.delete("/tasks/{task_id}", status_code=204)
def delete_task(task_id: str):
    tasks = load_tasks()
    new_tasks = [t for t in tasks if t["id"] != task_id]
    if len(new_tasks) == len(tasks):
        raise HTTPException(status_code=404, detail="Task not found")
    save_tasks(new_tasks)
