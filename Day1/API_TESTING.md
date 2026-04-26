# 🧪 API Testing Guide

## Getting Started with API Testing

### Prerequisites
1. Backend running at `http://localhost:5000`
2. One of these tools:
   - **cURL** (command line)
   - **Postman** (GUI application)
   - **Thunder Client** (VS Code extension)
   - **REST Client** (VS Code extension)

---

## Method 1: cURL (Command Line)

### 1. Health Check
```bash
curl http://localhost:5000/api/health
```

Expected Response:
```json
{
  "status": "ok",
  "message": "Grocery API is running"
}
```

### 2. Get All Groceries
```bash
curl http://localhost:5000/api/groceries
```

### 3. Get Groceries by Category
```bash
curl "http://localhost:5000/api/groceries?category=Vegetables"
```

### 4. Get Single Item
```bash
curl http://localhost:5000/api/groceries/1
```

### 5. Create New Item
```bash
curl -X POST http://localhost:5000/api/groceries \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Lettuce",
    "description": "Fresh green lettuce",
    "price": 1.99,
    "quantity": 50,
    "category": "Vegetables",
    "image_url": "https://example.com/lettuce.jpg"
  }'
```

### 6. Update Item
```bash
curl -X PUT http://localhost:5000/api/groceries/1 \
  -H "Content-Type: application/json" \
  -d '{
    "price": 2.49,
    "quantity": 45
  }'
```

### 7. Delete Item
```bash
curl -X DELETE http://localhost:5000/api/groceries/1
```

### 8. Get All Categories
```bash
curl http://localhost:5000/api/categories
```

### 9. Bulk Delete
```bash
curl -X POST http://localhost:5000/api/groceries/bulk/delete \
  -H "Content-Type: application/json" \
  -d '{
    "ids": [1, 2, 3, 4, 5]
  }'
```

---

## Method 2: VS Code REST Client

### Installation
1. Open VS Code
2. Go to Extensions (Ctrl+Shift+X)
3. Search "REST Client"
4. Install by Huachao Mao

### Create test.http file
```http
### Variables
@baseUrl = http://localhost:5000/api

### 1. Health Check
GET @baseUrl/health

### 2. Get all groceries
GET @baseUrl/groceries

### 3. Get groceries by category
GET @baseUrl/groceries?category=Vegetables

### 4. Get single item
GET @baseUrl/groceries/1

### 5. Create new item
POST @baseUrl/groceries
Content-Type: application/json

{
  "name": "Spinach",
  "description": "Fresh spinach leaves",
  "price": 2.50,
  "quantity": 40,
  "category": "Vegetables",
  "image_url": "https://example.com/spinach.jpg"
}

### 6. Update item
PUT @baseUrl/groceries/1
Content-Type: application/json

{
  "name": "Premium Tomato",
  "price": 3.50,
  "quantity": 45
}

### 7. Delete item
DELETE @baseUrl/groceries/1

### 8. Get categories
GET @baseUrl/categories

### 9. Bulk delete items
POST @baseUrl/groceries/bulk/delete
Content-Type: application/json

{
  "ids": [2, 3, 4]
}
```

**Usage:**
- Click "Send Request" link above each request
- View response in right panel

---

## Method 3: Postman

### Installation
1. Download from [postman.com](https://www.postman.com/downloads/)
2. Create free account
3. Import collection (see below)

### Create Collection

1. **New Collection** → "Grocery API"
2. **New Request** for each endpoint:

| Request | Method | URL |
|---------|--------|-----|
| Health Check | GET | `http://localhost:5000/api/health` |
| Get All | GET | `http://localhost:5000/api/groceries` |
| Get One | GET | `http://localhost:5000/api/groceries/1` |
| Create | POST | `http://localhost:5000/api/groceries` |
| Update | PUT | `http://localhost:5000/api/groceries/1` |
| Delete | DELETE | `http://localhost:5000/api/groceries/1` |
| Categories | GET | `http://localhost:5000/api/categories` |

### Sample Request Body (Create)
```json
{
  "name": "Bell Pepper",
  "description": "Colorful bell peppers",
  "price": 2.25,
  "quantity": 30,
  "category": "Vegetables",
  "image_url": "https://example.com/pepper.jpg"
}
```

---

## Method 4: Thunder Client (VS Code)

### Installation
1. Open VS Code Extensions (Ctrl+Shift+X)
2. Search "Thunder Client"
3. Install by Rangav

### Create Requests
1. Click Activity Bar → Thunder Client icon
2. Create new request
3. Select method (GET, POST, etc.)
4. Enter URL: `http://localhost:5000/api/groceries`
5. Add headers/body as needed
6. Click "Send"

---

## Testing Scenarios

### Scenario 1: Create and Retrieve
```bash
# 1. Create item
curl -X POST http://localhost:5000/api/groceries \
  -H "Content-Type: application/json" \
  -d '{"name":"Cucumber","price":1.50,"quantity":60,"category":"Vegetables"}'

# 2. Get all to find new item
curl http://localhost:5000/api/groceries

# 3. Get newly created item (if id=13)
curl http://localhost:5000/api/groceries/13
```

### Scenario 2: Update Item
```bash
# Update the item
curl -X PUT http://localhost:5000/api/groceries/13 \
  -H "Content-Type: application/json" \
  -d '{"price":1.99,"quantity":50}'

# Verify update
curl http://localhost:5000/api/groceries/13
```

### Scenario 3: Filter by Category
```bash
# Get all vegetables
curl "http://localhost:5000/api/groceries?category=Vegetables"

# Get all fruits
curl "http://localhost:5000/api/groceries?category=Fruits"

# Get all dairy
curl "http://localhost:5000/api/groceries?category=Dairy"
```

### Scenario 4: Error Handling
```bash
# Try to get non-existent item
curl http://localhost:5000/api/groceries/9999
# Should get: {"error": "Item not found"}

# Try to create with missing field
curl -X POST http://localhost:5000/api/groceries \
  -H "Content-Type: application/json" \
  -d '{"name":"Test"}'
# Should get error about missing fields

# Try to create duplicate item
curl -X POST http://localhost:5000/api/groceries \
  -H "Content-Type: application/json" \
  -d '{"name":"Tomato","price":2.50,"quantity":50,"category":"Vegetables"}'
# Should get: {"error": "Item already exists"}
```

---

## Response Status Codes

| Code | Meaning | Example |
|------|---------|---------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 400 | Bad Request | Missing required field |
| 404 | Not Found | Item doesn't exist |
| 409 | Conflict | Duplicate item name |
| 500 | Server Error | Database error |

---

## Common Test Cases

### ✅ Valid Requests
```bash
# Minimal required fields
{
  "name": "Garlic",
  "price": 0.50,
  "category": "Vegetables"
}

# All fields
{
  "name": "Onion",
  "description": "Fresh yellow onions",
  "price": 0.75,
  "quantity": 100,
  "category": "Vegetables",
  "image_url": "https://example.com/onion.jpg"
}
```

### ❌ Invalid Requests
```bash
# Missing name
{
  "price": 2.50,
  "category": "Vegetables"
}

# Invalid price
{
  "name": "Item",
  "price": -5,
  "category": "Vegetables"
}

# Empty name
{
  "name": "",
  "price": 2.50,
  "category": "Vegetables"
}

# Invalid price format
{
  "name": "Item",
  "price": "free",
  "category": "Vegetables"
}
```

---

## Performance Testing

### Test with Large Dataset
```bash
# Create 100 items in loop
for i in {1..100}; do
  curl -X POST http://localhost:5000/api/groceries \
    -H "Content-Type: application/json" \
    -d "{
      \"name\": \"Item-$i\",
      \"price\": $((RANDOM % 100 + 1)).99,
      \"quantity\": $((RANDOM % 1000 + 1)),
      \"category\": \"Category-$((RANDOM % 10))\"
    }"
done

# Get all items
curl http://localhost:5000/api/groceries | jq '. | length'
```

### Response Time Check
```bash
# Test response time
time curl http://localhost:5000/api/groceries > /dev/null

# Should be under 100ms for normal load
```

---

## Debugging Tips

### Check Backend Logs
```bash
# Terminal 1 - Watch backend logs
cd backend && source venv/bin/activate && python app.py

# You'll see:
# * Running on http://127.0.0.1:5000
# * POST /api/groceries
# * GET /api/groceries/1
```

### Pretty Print JSON
```bash
# Using jq (install: apt-get install jq)
curl http://localhost:5000/api/groceries | jq '.'

# Pretty print with colors
curl -s http://localhost:5000/api/groceries | jq '.'
```

### Save Response to File
```bash
curl http://localhost:5000/api/groceries > response.json
cat response.json | jq '.'
```

### Check Request Headers
```bash
# Show verbose output
curl -v http://localhost:5000/api/groceries

# Shows headers, body, response, etc.
```

---

## Sample Test Script

Create `test_api.sh`:
```bash
#!/bin/bash

BASE_URL="http://localhost:5000/api"

echo "🧪 Testing Grocery API"
echo "====================="

echo "✓ Health Check"
curl -s $BASE_URL/health | jq '.'

echo -e "\n✓ Get All Groceries"
curl -s $BASE_URL/groceries | jq '.[0:2]'

echo -e "\n✓ Create Item"
curl -s -X POST $BASE_URL/groceries \
  -H "Content-Type: application/json" \
  -d '{"name":"TestItem","price":5.99,"quantity":20,"category":"Testing"}' | jq '.'

echo -e "\n✓ Get Categories"
curl -s $BASE_URL/categories | jq '.'

echo -e "\n✓ Done!"
```

Run it:
```bash
chmod +x test_api.sh
./test_api.sh
```

---

## Conclusion

You now have multiple ways to test the API:
- 🔧 **cURL** - Command line, scriptable
- 📄 **REST Client** - VS Code, simple
- 📮 **Postman** - GUI, advanced features
- ⚡ **Thunder Client** - VS Code, lightweight

Start with REST Client in VS Code for easiest testing! 🚀
