from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

students = [
    {"id": 1, "name": "John Doe", "grade": "A"},
    {"id": 2, "name": "Jane Smith", "grade": "B"}
]

@app.route('/students', methods=['GET'])
def get_students():
    return jsonify(students)

@app.route('/students', methods=['POST'])
def add_student():
    data = request.json
    new_id = max(s['id'] for s in students) + 1 if students else 1
    student = {"id": new_id, "name": data['name'], "grade": data['grade']}
    students.append(student)
    return jsonify(student), 201

if __name__ == '__main__':
    app.run(debug=True)