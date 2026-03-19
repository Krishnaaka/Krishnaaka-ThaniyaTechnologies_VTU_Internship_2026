import React from 'react';
import { FiShoppingBag, FiDollarSign } from 'react-icons/fi';
import './Header.css';

function Header({ totalItems, totalValue }) {
  return (
    <header className="header">
      <div className="header-container">
        <div className="header-title">
          <FiShoppingBag size={32} />
          <span>Grocery Store</span>
        </div>
        <div className="header-stats">
          <div className="stat">
            <div className="stat-value">{totalItems}</div>
            <div className="stat-label">Total Items</div>
          </div>
          <div className="stat">
            <div className="stat-value">${totalValue}</div>
            <div className="stat-label">Total Value</div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
