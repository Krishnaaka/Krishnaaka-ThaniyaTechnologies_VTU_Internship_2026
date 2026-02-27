import React from 'react';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import './GroceryCard.css';

function GroceryCard({ item, onEdit, onDelete }) {
  const getCategoryEmoji = (category) => {
    const emojis = {
      'Vegetables': '🥬',
      'Fruits': '🍎',
      'Dairy': '🥛',
      'Grains': '🌾',
      'Meat': '🥩',
      'Spices': '🌶️',
      'Bakery': '🍞',
      'Beverages': '☕'
    };
    return emojis[category] || '🛒';
  };

  return (
    <div className="card">
      <div className="card-image">
        {item.image_url ? (
          <img src={item.image_url} alt={item.name} onError={(e) => {
            e.target.style.display = 'none';
            e.target.parentElement.innerHTML = getCategoryEmoji(item.category);
          }} />
        ) : (
          <span>{getCategoryEmoji(item.category)}</span>
        )}
      </div>

      <div className="card-content">
        <span className="card-category">{item.category}</span>
        <h3 className="card-title">{item.name}</h3>
        <p className="card-description">{item.description || 'No description available'}</p>

        <div className="card-meta">
          <div className="card-price">${item.price.toFixed(2)}</div>
          <div className="card-quantity">
            📦 {item.quantity} stk
          </div>
        </div>

        <div className="card-actions">
          <button
            className="btn btn-primary btn-small"
            onClick={() => onEdit(item)}
            title="Edit item"
          >
            <FiEdit2 size={16} />
            Edit
          </button>
          <button
            className="btn btn-danger btn-small"
            onClick={() => onDelete(item.id)}
            title="Delete item"
          >
            <FiTrash2 size={16} />
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default GroceryCard;
