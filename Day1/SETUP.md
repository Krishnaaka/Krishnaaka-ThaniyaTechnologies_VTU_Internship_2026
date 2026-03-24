# 🚀 Installation & Setup Guide

## Quick Start (Recommended)

### One-Command Setup (Linux/Mac)
```bash
cd grocery-app
chmod +x setup.sh
./setup.sh
```

Then run in two separate terminals:
```bash
# Terminal 1: Backend
cd backend
source venv/bin/activate
python app.py

# Terminal 2: Frontend
cd frontend
npm start
```

---

## Step-by-Step Manual Setup

### 1. Backend Setup (Python)

Navigate to backend folder:
```bash
cd grocery-app/backend
```

Create virtual environment:
```bash
# Linux/Mac
python3 -m venv venv
source venv/bin/activate

# Windows
python -m venv venv
venv\Scripts\activate
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Initialize database with sample data:
```bash
python init_db.py
```

Run the Flask server:
```bash
python app.py
```

✅ Backend running at: http://localhost:5000

### 2. Frontend Setup (React)

In a new terminal, navigate to frontend:
```bash
cd grocery-app/frontend
```

Install dependencies:
```bash
npm install
```

Start development server:
```bash
npm start
```

✅ Frontend running at: http://localhost:3000

---

## 🐳 Docker Setup (Alternative)

### Prerequisites
- Docker installed and running
- Docker Compose installed

### Run with Docker:
```bash
cd grocery-app
docker-compose up
```

This will:
- Build backend and frontend images
- Start both services
- Connect them automatically

Access the application:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000/api

---

## 📊 Database

### Initialize with Sample Data
```bash
cd backend
source venv/bin/activate  # or venv\Scripts\activate on Windows
python init_db.py
```

This populates the database with 12 sample grocery items across different categories.

### Reset Database
```bash
# In Python shell
from app import app, db
with app.app_context():
    db.drop_all()
    db.create_all()
```

---

## 🔧 Configuration

### Backend (.env)
Create `.env` in `backend/` folder based on `.env.example`:
```
FLASK_ENV=development
FLASK_DEBUG=True
API_HOST=0.0.0.0
API_PORT=5000
```

### Frontend (.env)
Create `.env` in `frontend/` folder based on `.env.example`:
```
REACT_APP_API_URL=http://localhost:5000/api
REACT_APP_ENV=development
```

---

## 🧪 Testing the API

### Using cURL
```bash
# Get all groceries
curl http://localhost:5000/api/groceries

# Create new item
curl -X POST http://localhost:5000/api/groceries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lettuce",
    "description": "Fresh green lettuce",
    "price": 1.99,
    "quantity": 30,
    "category": "Vegetables"
  }'

# Update item
curl -X PUT http://localhost:5000/api/groceries/1 \
  -H "Content-Type: application/json" \
  -d '{"price": 2.49, "quantity": 25}'

# Delete item
curl -X DELETE http://localhost:5000/api/groceries/1

# Get categories
curl http://localhost:5000/api/categories
```

### Using REST Client (VS Code)
Install "REST Client" extension and create `test.http`:
```http
### Get all groceries
GET http://localhost:5000/api/groceries

### Get categories
GET http://localhost:5000/api/categories

### Create item
POST http://localhost:5000/api/groceries
Content-Type: application/json

{
  "name": "Spinach",
  "description": "Fresh spinach leaves",
  "price": 2.50,
  "quantity": 40,
  "category": "Vegetables"
}

### Update item
PUT http://localhost:5000/api/groceries/1
Content-Type: application/json

{
  "price": 2.99,
  "quantity": 35
}

### Delete item
DELETE http://localhost:5000/api/groceries/1
```

---

## 📱 Using the Application

### Main Features
1. **View All Items** - Displays all groceries in a beautiful grid
2. **Search** - Search by item name or description
3. **Filter by Category** - Click category buttons to filter
4. **Add Item** - Click "Add Item" button to create new items
5. **Edit Item** - Click "Edit" on any card to modify
6. **Delete Item** - Click "Delete" with confirmation
7. **Real-time Stats** - See total items and total inventory value

### Sample Data Categories
- Vegetables (Tomato, Carrot, Broccoli)
- Fruits (Apple, Banana, Blueberries)
- Dairy (Milk, Cheese)
- Grains (Bread, Rice)
- Meat (Chicken Breast)
- Spices (Red Chili Powder)

---

## ⚠️ Troubleshooting

### Backend Issues

**Port 5000 already in use:**
```bash
# Find process using port 5000
lsof -i :5000

# Kill process
kill -9 <PID>
```

**Database error:**
```bash
# Remove existing database
rm backend/grocery.db

# Recreate database
python init_db.py
```

**Virtual environment not activating:**
- Linux/Mac: Ensure you run `source venv/bin/activate`
- Windows: Use `venv\Scripts\activate`

### Frontend Issues

**Node modules error:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Port 3000 already in use:**
```bash
# Specify different port
PORT=3001 npm start
```

**API not connecting:**
- Check backend is running: http://localhost:5000/api/health
- Check proxy in package.json
- Check CORS settings in backend `app.py`

### Docker Issues

**Containers won't start:**
```bash
# See logs
docker-compose logs -f

# Recreate containers
docker-compose down
docker-compose up --build
```

---

## 📚 Additional Resources

- [Flask Documentation](https://flask.palletsprojects.com/)
- [React Documentation](https://react.dev/)
- [SQLAlchemy ORM](https://www.sqlalchemy.org/)
- [Axios HTTP Client](https://axios-http.com/)

---

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Backend running at http://localhost:5000
- [ ] Frontend running at http://localhost:3000
- [ ] Can see health check: http://localhost:5000/api/health
- [ ] Can see sample groceries in the app
- [ ] Can add a new item
- [ ] Can edit an item
- [ ] Can delete an item
- [ ] Search functionality works
- [ ] Category filters work
- [ ] Stats update in real-time

---

**Once all checks pass, you're ready to use the Grocery Management System!** 🎉
