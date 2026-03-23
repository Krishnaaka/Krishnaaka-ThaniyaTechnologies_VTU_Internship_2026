from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
import os

app = Flask(__name__)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///grocery.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False

# Initialize database
db = SQLAlchemy(app)
CORS(app)

# Models
class GroceryItem(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False, unique=True)
    description = db.Column(db.String(500))
    price = db.Column(db.Float, nullable=False)
    quantity = db.Column(db.Integer, default=0)
    category = db.Column(db.String(50), nullable=False)
    image_url = db.Column(db.String(500))
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'price': self.price,
            'quantity': self.quantity,
            'category': self.category,
            'image_url': self.image_url,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }

# Routes

# Health check
@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Grocery API is running'}), 200

# Get all grocery items
@app.route('/api/groceries', methods=['GET'])
def get_groceries():
    try:
        category = request.args.get('category', None)
        if category:
            items = GroceryItem.query.filter_by(category=category).all()
        else:
            items = GroceryItem.query.all()
        return jsonify([item.to_dict() for item in items]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Get single grocery item
@app.route('/api/groceries/<int:id>', methods=['GET'])
def get_grocery(id):
    try:
        item = GroceryItem.query.get(id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404
        return jsonify(item.to_dict()), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Create new grocery item
@app.route('/api/groceries', methods=['POST'])
def create_grocery():
    try:
        data = request.get_json()
        
        # Validate required fields
        if not data or not all(k in data for k in ['name', 'price', 'category']):
            return jsonify({'error': 'Missing required fields: name, price, category'}), 400
        
        # Check if item already exists
        existing_item = GroceryItem.query.filter_by(name=data['name']).first()
        if existing_item:
            return jsonify({'error': 'Item already exists'}), 409
        
        new_item = GroceryItem(
            name=data['name'],
            description=data.get('description', ''),
            price=float(data['price']),
            quantity=int(data.get('quantity', 0)),
            category=data['category'],
            image_url=data.get('image_url', '')
        )
        
        db.session.add(new_item)
        db.session.commit()
        
        return jsonify(new_item.to_dict()), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Update grocery item
@app.route('/api/groceries/<int:id>', methods=['PUT'])
def update_grocery(id):
    try:
        item = GroceryItem.query.get(id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404
        
        data = request.get_json()
        
        # Update fields if provided
        if 'name' in data:
            # Check if new name already exists
            existing = GroceryItem.query.filter_by(name=data['name']).first()
            if existing and existing.id != id:
                return jsonify({'error': 'Item with this name already exists'}), 409
            item.name = data['name']
        
        if 'description' in data:
            item.description = data['description']
        if 'price' in data:
            item.price = float(data['price'])
        if 'quantity' in data:
            item.quantity = int(data['quantity'])
        if 'category' in data:
            item.category = data['category']
        if 'image_url' in data:
            item.image_url = data['image_url']
        
        db.session.commit()
        return jsonify(item.to_dict()), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Delete grocery item
@app.route('/api/groceries/<int:id>', methods=['DELETE'])
def delete_grocery(id):
    try:
        item = GroceryItem.query.get(id)
        if not item:
            return jsonify({'error': 'Item not found'}), 404
        
        db.session.delete(item)
        db.session.commit()
        
        return jsonify({'message': 'Item deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Bulk operations
@app.route('/api/groceries/bulk/delete', methods=['POST'])
def bulk_delete():
    try:
        data = request.get_json()
        ids = data.get('ids', [])
        
        if not ids:
            return jsonify({'error': 'No items to delete'}), 400
        
        GroceryItem.query.filter(GroceryItem.id.in_(ids)).delete()
        db.session.commit()
        
        return jsonify({'message': f'{len(ids)} items deleted successfully'}), 200
    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

# Get categories
@app.route('/api/categories', methods=['GET'])
def get_categories():
    try:
        categories = db.session.query(GroceryItem.category).distinct().all()
        return jsonify([cat[0] for cat in categories if cat[0]]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

# Error handlers
@app.errorhandler(404)
def not_found(error):
    return jsonify({'error': 'Not found'}), 404

@app.errorhandler(500)
def server_error(error):
    return jsonify({'error': 'Server error'}), 500

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5000)
