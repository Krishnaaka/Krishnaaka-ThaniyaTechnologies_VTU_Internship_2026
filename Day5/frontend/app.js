document.addEventListener('DOMContentLoaded', () => {
    loadStudents();
    document.getElementById('add-student').addEventListener('submit', addStudent);
});

function loadStudents() {
    fetch('http://localhost:5000/students')
        .then(response => response.json())
        .then(data => {
            const container = document.getElementById('students');
            container.innerHTML = '';
            data.forEach(student => {
                const div = document.createElement('div');
                div.className = 'student';
                div.innerHTML = `<strong>${student.name}</strong> - Grade: ${student.grade}`;
                container.appendChild(div);
            });
        });
}

function addStudent(e) {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const grade = document.getElementById('grade').value;
    fetch('http://localhost:5000/students', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, grade })
    })
    .then(response => response.json())
    .then(() => {
        document.getElementById('name').value = '';
        document.getElementById('grade').value = '';
        loadStudents();
    });
}