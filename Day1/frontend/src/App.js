import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  FiSearch,
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiShoppingCart,
  FiAlertCircle,
  FiCheckCircle
} from 'react-icons/fi';
import GroceryForm from './components/GroceryForm';
import GroceryCard from './components/GroceryCard';
import Header from './components/Header';
import './App.css';

const API_URL = 'http://localhost:5000/api';

function App() {
  const [groceries, setGroceries] = useState([]);
  const [filteredGroceries, setFilteredGroceries] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [alert, setAlert] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [totalItems, setTotalItems] = useState(0);
  const [totalValue, setTotalValue] = useState(0);

  // Fetch groceries
  useEffect(() => {
    fetchGroceries();
  }, []);

  const fetchGroceries = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_URL}/groceries`);
      setGroceries(response.data);
      fetchCategories();
      calculateStats(response.data);
    } catch (error) {
      showAlert('Failed to fetch groceries', 'error');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${API_URL}/categories`);
      const uniqueCategories = [...new Set(response.data)];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const calculateStats = (items) => {
    const total = items.reduce((sum, item) => sum + item.quantity, 0);
    const value = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    setTotalItems(total);
    setTotalValue(value.toFixed(2));
  };

  // Filter groceries
  useEffect(() => {
    let filtered = groceries;

    // Category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(item => item.category === selectedCategory);
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    setFilteredGroceries(filtered);
  }, [groceries, searchTerm, selectedCategory]);

  const showAlert = (message, type = 'success') => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleAddGrocery = async (formData) => {
    try {
      const response = await axios.post(`${API_URL}/groceries`, formData);
      setGroceries([...groceries, response.data]);
      calculateStats([...groceries, response.data]);
      showAlert('Item added successfully!', 'success');
      setShowForm(false);
      fetchCategories();
    } catch (error) {
      showAlert(error.response?.data?.error || 'Error adding item', 'error');
    }
  };

  const handleUpdateGrocery = async (id, formData) => {
    try {
      const response = await axios.put(`${API_URL}/groceries/${id}`, formData);
      const updatedList = groceries.map(item => item.id === id ? response.data : item);
      setGroceries(updatedList);
      calculateStats(updatedList);
      showAlert('Item updated successfully!', 'success');
      setEditingItem(null);
      setShowForm(false);
    } catch (error) {
      showAlert(error.response?.data?.error || 'Error updating item', 'error');
    }
  };

  const handleDeleteGrocery = async (id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      try {
        await axios.delete(`${API_URL}/groceries/${id}`);
        const updatedList = groceries.filter(item => item.id !== id);
        setGroceries(updatedList);
        calculateStats(updatedList);
        showAlert('Item deleted successfully!', 'success');
      } catch (error) {
        showAlert('Error deleting item', 'error');
      }
    }
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setShowForm(true);
  };

  return (
    <div className="app">
      <Header totalItems={totalItems} totalValue={totalValue} />

      <div className="container">
        {/* Alert */}
        {alert && (
          <div className={`alert alert-${alert.type}`}>
            {alert.type === 'success' ? <FiCheckCircle size={20} /> : <FiAlertCircle size={20} />}
            {alert.message}
          </div>
        )}

        {/* Form Section */}
        {showForm && (
          <GroceryForm
            onSubmit={editingItem ? (data) => handleUpdateGrocery(editingItem.id, data) : handleAddGrocery}
            onCancel={() => {
              setShowForm(false);
              setEditingItem(null);
            }}
            initialData={editingItem}
            categories={categories}
          />
        )}

        {/* Controls */}
        <div className="controls">
          <div className="search-box">
            <FiSearch className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search groceries..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="filter-group">
            <button
              className={`filter-btn ${selectedCategory === 'all' ? 'active' : ''}`}
              onClick={() => setSelectedCategory('all')}
            >
              All
            </button>
            {categories.map(category => (
              <button
                key={category}
                className={`filter-btn ${selectedCategory === category ? 'active' : ''}`}
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <button
            className="btn btn-primary"
            onClick={() => {
              setEditingItem(null);
              setShowForm(!showForm);
            }}
          >
            <FiPlus size={18} />
            Add Item
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : filteredGroceries.length === 0 ? (
          <div className="empty-state">
            <FiShoppingCart size={80} style={{ margin: '0 auto 20px' }} />
            <h3>No groceries found</h3>
            <p>Start by adding your first grocery item</p>
          </div>
        ) : (
          <div className="grid">
            {filteredGroceries.map(item => (
              <GroceryCard
                key={item.id}
                item={item}
                onEdit={handleEdit}
                onDelete={handleDeleteGrocery}
              />
            ))}
          </div>
        )}
      </div>

      <div className="footer">
        <p>🛒 Grocery Management System | Built with React & Python</p>
      </div>
    </div>
  );
}

export default App;
