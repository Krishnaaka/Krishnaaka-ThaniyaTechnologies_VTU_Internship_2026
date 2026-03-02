from flask import Flask, jsonify
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

app = Flask(__name__)

# Basic configuration (sqlite for local development)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///day3.db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JSON_SORT_KEYS'] = False

db = SQLAlchemy(app)
CORS(app)

@app.route('/', methods=['GET'])
def root():
    return jsonify({'message': 'Day3 backend — continuation of Day2', 'root': '/'})

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'ok', 'message': 'Day3 API is running'}), 200

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True, host='0.0.0.0', port=5001)
