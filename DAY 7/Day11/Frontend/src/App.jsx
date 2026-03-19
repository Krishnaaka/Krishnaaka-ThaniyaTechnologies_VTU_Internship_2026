import { useState, useEffect } from 'react'
import './App.css'

const API = 'http://localhost:8000'

function App() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    fetch(`${API}/tasks`)
      .then(r => r.json())
      .then(setTasks)
      .catch(() => alert('Cannot connect to backend'))
  }, [])

  const addTask = async (e) => {
    e.preventDefault()
    if (!title.trim()) return
    const res = await fetch(`${API}/tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title }),
    })
    const task = await res.json()
    setTasks([...tasks, task])
    setTitle('')
  }

  const deleteTask = async (id) => {
    await fetch(`${API}/tasks/${id}`, { method: 'DELETE' })
    setTasks(tasks.filter(t => t.id !== id))
  }

  return (
    <div className="container">
      <h1>📝 Task Manager</h1>

      <form onSubmit={addTask} className="form">
        <input
          type="text"
          placeholder="Enter a task..."
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <ul className="task-list">
        {tasks.length === 0 && <p className="empty">No tasks yet. Add one above!</p>}
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span>{task.title}</span>
            <button onClick={() => deleteTask(task.id)} className="delete-btn">✕</button>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
