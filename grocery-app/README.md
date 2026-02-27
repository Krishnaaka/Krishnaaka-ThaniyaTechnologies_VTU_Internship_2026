# 🛒 Grocery Store - CRUD Management System

A modern full-stack grocery management application with React frontend and Python Flask backend. Features a beautiful UI with complete CRUD operations, real-time inventory management, and REST API integration.

## ✨ Features

- **📱 Modern & Responsive UI** - Beautiful gradient design that works on all devices
- **🔄 Complete CRUD Operations** - Create, Read, Update, Delete grocery items
- **🏡 Real-time Inventory** - Track total items and inventory value
- **🔍 Search & Filter** - Find items by name, description, or category
- **📦 Category Management** - Organize items by categories (Vegetables, Fruits, Dairy, etc.)
- **💾 Persistent Storage** - SQLite database for reliable data persistence
- **🎨 Professional Design** - Modern gradient UI with smooth animations
- **🌐 REST API** - Full RESTful API for scalable architecture

## 🏗️ Architecture

```
grocery-app/
├── backend/              # Python Flask API
│   ├── app.py           # Main Flask application
│   ├── requirements.txt  # Python dependencies
│   └── setup.sh         # Setup script
└── frontend/            # React Application
    ├── src/
    │   ├── App.js       # Main component
    │   ├── index.js     # Entry point
    │   └── components/  # React components
    └── package.json     # Node dependencies
```

## 🚀 Quick Start

### Prerequisites
- Python 3.8+
- Node.js 14+ & npm
- Git

### Backend Setup

1. Navigate to backend directory:
```bash
cd grocery-app/backend
```

2. Create and activate virtual environment:
```bash
python3 -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Run the Flask server:
```bash
python app.py
```

Backend will start at `http://localhost:5000`

### Frontend Setup

1. Navigate to frontend directory:
```bash
cd grocery-app/frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start development server:
```bash
npm start
```

Frontend will open at `http://localhost:3000`

## 📚 API Endpoints

### Health Check
- `GET /api/health` - Check API status

### Groceries
- `GET /api/groceries` - Get all items (supports `category` query parameter)
- `GET /api/groceries/<id>` - Get single item
- `POST /api/groceries` - Create new item
- `PUT /api/groceries/<id>` - Update item
- `DELETE /api/groceries/<id>` - Delete item

### Categories
- `GET /api/categories` - Get all unique categories

### Bulk Operations
- `POST /api/groceries/bulk/delete` - Delete multiple items

## 📝 Request/Response Examples

### Create Item
```bash
POST /api/groceries
Content-Type: application/json

{
  "name": "Tomato",
  "description": "Fresh red tomatoes",
  "price": 2.50,
  "quantity": 50,
  "category": "Vegetables",
  "image_url": "https://example.com/tomato.jpg"
}
```

### Update Item
```bash
PUT /api/groceries/1
Content-Type: application/json

{
  "price": 2.99,
  "quantity": 45
}
```

## 🎨 UI Components

### Header
- Real-time stats display (Total items & total value)
- Responsive navigation

### GroceryForm
- Validation for all fields
- Support for creating and editing items
- Category selection with predefined options

### GroceryCard
- Beautiful card layout with item details
- Category badge
- Edit and Delete buttons
- Quantity display

### Search & Filter
- Real-time search across item names and descriptions
- Category-based filtering
- Combined search + filter functionality

## 🛠️ Technology Stack

### Backend
- Flask 2.3.0
- Flask-SQLAlchemy 3.0.3
- Flask-CORS 4.0.0
- SQLite Database

### Frontend
- React 18.2.0
- Axios for HTTP requests
- React Icons for beautiful icons
- CSS3 with gradients and animations

## 🎯 CSS Features

- **Gradient Design** - Modern purple gradient theme
- **Smooth Animations** - Slide-up and fade-in effects
- **Hover Effects** - Interactive card and button animations
- **Responsive Grid** - Auto-fit grid layout
- **Mobile First** - Optimized for all screen sizes
- **Professional Styling** - Consistent color scheme and typography

## 🔧 Key Features Explained

### Real-time Stats
The header displays:
- **Total Items**: Sum of all item quantities
- **Total Value**: Sum of (price × quantity) for all items

### Search & Filter
- Enter text to search by item name or description
- Click category filters to show items from specific categories
- Use "All" to show all items

### CRUD Operations
- **Create**: Click "Add Item" button and fill the form
- **Read**: View all items in the grid or individual details
- **Update**: Click "Edit" on any card to modify details
- **Delete**: Click "Delete" with confirmation dialog

### Error Handling
- Form validation with clear error messages
- API error handling with user-friendly alerts
- Network error recovery

## 📱 Responsive Design

- **Desktop**: Full grid layout with 4+ columns
- **Tablet**: 2-3 columns with adjusted spacing
- **Mobile**: Single column with optimized touch targets
- **All Devices**: Perfect typography and readability

## 🌟 Modern UI Highlights

1. **Gradient Backgrounds** - Purple to pink gradients
2. **Card Design** - Elevated cards with shadow effects
3. **Category Badges** - Quick visual identification
4. **Smooth Transitions** - All interactions have transitions
5. **Empty State** - Friendly message when no items exist
6. **Loading Spinner** - Visual feedback during API calls
7. **Toast Alerts** - Non-intrusive success/error messages

## 🚢 Production Deployment

### Backend (Flask)
```bash
# Set Flask environment
export FLASK_ENV=production

# Use production WSGI server
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

### Frontend (React)
```bash
# Build for production
npm run build

# Serve build folder with your web server (nginx, Apache, etc.)
```

## 📖 Development Tips

1. **Hot Reload**: React and Flask both support hot reload in development
2. **CORS**: Backend already configured with Flask-CORS
3. **Validation**: Server-side validation on all endpoints
4. **Database**: SQLite automatically created on first run
5. **Logs**: Check browser console for frontend errors, terminal for backend

## 🐛 Troubleshooting

### Backend won't start
- Ensure Python 3.8+ is installed
- Check port 5000 is available
- Install all dependencies: `pip install -r requirements.txt`

### Frontend won't load
- Ensure Node.js 14+ is installed
- Clear node_modules: `rm -rf node_modules && npm install`
- Check port 3000 is available

### API requests failing
- Ensure backend is running at `http://localhost:5000`
- Check CORS settings in `app.py`
- Verify frontend proxy in `package.json`

## 📄 License

This project is open source and available for educational purposes.

## 👨‍💻 Author

Created as a modern grocery management system with best practices in full-stack development.

---

**Built with ❤️ using React + Python Flask** | **Modern UI Design** | **Complete CRUD Operations**
