"""
Database initialization and sample data loading script
Run this to populate the database with sample grocery items
"""

from app import app, db, GroceryItem
import os

# Sample grocery data
SAMPLE_GROCERIES = [
    {
        'name': 'Tomato',
        'description': 'Fresh red tomatoes, perfect for salads and cooking',
        'price': 2.50,
        'quantity': 50,
        'category': 'Vegetables',
        'image_url': 'https://images.unsplash.com/photo-1592841494296-8142bbb266e0?w=300'
    },
    {
        'name': 'Carrot',
        'description': 'Orange carrots packed with vitamin A',
        'price': 1.50,
        'quantity': 75,
        'category': 'Vegetables',
        'image_url': 'https://images.unsplash.com/photo-1584622666519-e21cc028cb29?w=300'
    },
    {
        'name': 'Apple',
        'description': 'Fresh red apples, crispy and sweet',
        'price': 3.00,
        'quantity': 100,
        'category': 'Fruits',
        'image_url': 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=300'
    },
    {
        'name': 'Banana',
        'description': 'Yellow bananas rich in potassium',
        'price': 0.99,
        'quantity': 120,
        'category': 'Fruits',
        'image_url': 'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=300'
    },
    {
        'name': 'Milk',
        'description': 'Fresh dairy milk, 1 liter',
        'price': 2.80,
        'quantity': 40,
        'category': 'Dairy',
        'image_url': 'https://images.unsplash.com/photo-1553530666-ba2a8e36b737?w=300'
    },
    {
        'name': 'Cheese',
        'description': 'Cheddar cheese block, 500g',
        'price': 5.50,
        'quantity': 20,
        'category': 'Dairy',
        'image_url': 'https://images.unsplash.com/photo-1618164436241-4473940571cd?w=300'
    },
    {
        'name': 'Bread',
        'description': 'Whole wheat bread loaf',
        'price': 2.99,
        'quantity': 35,
        'category': 'Grains',
        'image_url': 'https://images.unsplash.com/photo-1595521624256-a3e8c5e49b5c?w=300'
    },
    {
        'name': 'Rice',
        'description': 'Basmati rice, 1kg bag',
        'price': 4.50,
        'quantity': 60,
        'category': 'Grains',
        'image_url': 'https://images.unsplash.com/photo-1586985289973-abbe768e8ba4?w=300'
    },
    {
        'name': 'Chicken Breast',
        'description': 'Fresh boneless chicken breast, per pound',
        'price': 8.99,
        'quantity': 30,
        'category': 'Meat',
        'image_url': 'https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=300'
    },
    {
        'name': 'Red Chili Powder',
        'description': 'Ground red chili, 100g',
        'price': 3.50,
        'quantity': 25,
        'category': 'Spices',
        'image_url': 'https://images.unsplash.com/photo-1596040306723-11075d127b35?w=300'
    },
    {
        'name': 'Broccoli',
        'description': 'Fresh green broccoli, beautiful florets',
        'price': 3.25,
        'quantity': 45,
        'category': 'Vegetables',
        'image_url': 'https://images.unsplash.com/photo-1611593437281-cc33d34db919?w=300'
    },
    {
        'name': 'Blueberries',
        'description': 'Fresh blueberries, 250g container',
        'price': 4.99,
        'quantity': 15,
        'category': 'Fruits',
        'image_url': 'https://images.unsplash.com/photo-1599599810694-b5ac4dd87222?w=300'
    }
]

def init_database():
    """Initialize database and load sample data"""
    with app.app_context():
        # Drop all tables
        db.drop_all()
        print("✓ Dropped existing tables")
        
        # Create new tables
        db.create_all()
        print("✓ Created database tables")
        
        # Add sample data
        for item_data in SAMPLE_GROCERIES:
            item = GroceryItem(**item_data)
            db.session.add(item)
        
        db.session.commit()
        print(f"✓ Added {len(SAMPLE_GROCERIES)} sample grocery items")
        
        # Display summary
        total_items = GroceryItem.query.count()
        total_value = sum(item.price * item.quantity for item in GroceryItem.query.all())
        
        print(f"\n📊 Database Summary:")
        print(f"  Total Items: {total_items}")
        print(f"  Total Value: ${total_value:.2f}")
        print(f"\n✅ Database initialization complete!")

if __name__ == '__main__':
    init_database()
