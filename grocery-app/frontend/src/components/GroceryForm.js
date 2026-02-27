import React, { useState, useEffect } from 'react';
import { FiX } from 'react-icons/fi';
import './GroceryForm.css';

function GroceryForm({ onSubmit, onCancel, initialData, categories }) {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    quantity: '',
    category: 'Vegetables',
    image_url: ''
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Item name is required';
    }
    if (!formData.price || isNaN(formData.price) || parseFloat(formData.price) <= 0) {
      newErrors.price = 'Valid price is required';
    }
    if (!formData.category.trim()) {
      newErrors.category = 'Category is required';
    }
    if (formData.quantity && (isNaN(formData.quantity) || parseInt(formData.quantity) < 0)) {
      newErrors.quantity = 'Quantity must be a positive number';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validateForm()) {
      onSubmit({
        ...formData,
        price: parseFloat(formData.price),
        quantity: parseInt(formData.quantity) || 0
      });
    }
  };

  return (
    <div className="form-container">
      <div className="form-header">
        <h3 className="form-title">
          {initialData ? '✏️ Edit Grocery Item' : '➕ Add New Grocery Item'}
        </h3>
        <button className="form-close" onClick={onCancel}>
          <FiX size={24} />
        </button>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label>Item Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Tomato"
              className={errors.name ? 'error' : ''}
            />
            {errors.name && <span className="error-message">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Price ($) *</label>
            <input
              type="number"
              name="price"
              value={formData.price}
              onChange={handleChange}
              placeholder="0.00"
              step="0.01"
              className={errors.price ? 'error' : ''}
            />
            {errors.price && <span className="error-message">{errors.price}</span>}
          </div>

          <div className="form-group">
            <label>Quantity</label>
            <input
              type="number"
              name="quantity"
              value={formData.quantity}
              onChange={handleChange}
              placeholder="0"
              min="0"
              className={errors.quantity ? 'error' : ''}
            />
            {errors.quantity && <span className="error-message">{errors.quantity}</span>}
          </div>

          <div className="form-group">
            <label>Category *</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={errors.category ? 'error' : ''}
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
              <option value="Vegetables">Vegetables</option>
              <option value="Fruits">Fruits</option>
              <option value="Dairy">Dairy</option>
              <option value="Grains">Grains</option>
              <option value="Meat">Meat</option>
              <option value="Spices">Spices</option>
            </select>
            {errors.category && <span className="error-message">{errors.category}</span>}
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Add item description..."
              rows="3"
            />
          </div>

          <div className="form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Image URL</label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
            />
          </div>
        </div>

        <div className="form-actions">
          <button type="button" className="btn btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            {initialData ? '💾 Update Item' : '➕ Add Item'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default GroceryForm;
