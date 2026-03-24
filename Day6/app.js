// ==================== Student Data ==================== 
const courseData = [
    {
        id: 1,
        code: 'CS101',
        name: 'Data Structures',
        credits: 4,
        grade: 'A+',
        gpa: 4.0,
        instructor: 'Dr. Smith'
    },
    {
        id: 2,
        code: 'CS102',
        name: 'Web Development',
        credits: 3,
        grade: 'A',
        gpa: 3.9,
        instructor: 'Prof. Johnson'
    },
    {
        id: 3,
        code: 'CS103',
        name: 'Database Management',
        credits: 4,
        grade: 'A',
        gpa: 3.8,
        instructor: 'Dr. Williams'
    },
    {
        id: 4,
        code: 'CS104',
        name: 'Algorithms',
        credits: 4,
        grade: 'A+',
        gpa: 4.0,
        instructor: 'Prof. Brown'
    },
    {
        id: 5,
        code: 'CS105',
        name: 'Operating Systems',
        credits: 3,
        grade: 'B+',
        gpa: 3.7,
        instructor: 'Dr. Davis'
    },
    {
        id: 6,
        code: 'CS106',
        name: 'Machine Learning',
        credits: 4,
        grade: 'A',
        gpa: 3.9,
        instructor: 'Prof. Wilson'
    },
    {
        id: 7,
        code: 'CS107',
        name: 'Computer Networks',
        credits: 3,
        grade: 'A',
        gpa: 3.8,
        instructor: 'Dr. Martinez'
    },
    {
        id: 8,
        code: 'CS108',
        name: 'Software Engineering',
        credits: 4,
        grade: 'B+',
        gpa: 3.7,
        instructor: 'Prof. Anderson'
    }
];

const assignmentData = [
    {
        id: 1,
        title: 'Implement Binary Search Tree',
        course: 'Data Structures',
        courseCode: 'CS101',
        dueDate: '2026-03-12',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 2,
        title: 'Build a Todo App (React)',
        course: 'Web Development',
        courseCode: 'CS102',
        dueDate: '2026-03-15',
        priority: 'high',
        status: 'pending'
    },
    {
        id: 3,
        title: 'SQL Query Optimization',
        course: 'Database Management',
        courseCode: 'CS103',
        dueDate: '2026-03-18',
        priority: 'medium',
        status: 'pending'
    },
    {
        id: 4,
        title: 'Graph Algorithms Assignment',
        course: 'Algorithms',
        courseCode: 'CS104',
        dueDate: '2026-03-20',
        priority: 'medium',
        status: 'submitted'
    },
    {
        id: 5,
        title: 'Process Scheduling Simulation',
        course: 'Operating Systems',
        courseCode: 'CS105',
        dueDate: '2026-03-25',
        priority: 'low',
        status: 'overdue'
    }
];

// ==================== DOM Elements ==================== 
const coursesList = document.getElementById('coursesList');
const assignmentsList = document.getElementById('assignmentsList');

// ==================== Initialize Dashboard ==================== 
document.addEventListener('DOMContentLoaded', function () {
    console.log('Dashboard loaded successfully!');
    renderCourses();
    renderAssignments();
    setupNavigation();
});

// ==================== Render Courses ==================== 
function renderCourses() {
    coursesList.innerHTML = '';

    courseData.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesList.appendChild(courseCard);
    });
}

// ==================== Create Course Card ==================== 
function createCourseCard(course) {
    const card = document.createElement('div');
    card.className = 'course-card';
    
    const gradeClass = course.grade.startsWith('A') ? 'grade-a' : 
                      course.grade.startsWith('B') ? 'grade-b' : 'grade-c';

    card.innerHTML = `
        <div class="course-header">
            <div class="course-code">${course.code}</div>
            <div class="course-name">${course.name}</div>
        </div>
        <div class="course-body">
            <div class="course-info">
                <label>Instructor:</label>
                <span class="course-info-value">${course.instructor}</span>
            </div>
            <div class="course-info">
                <label>Credits:</label>
                <span class="course-info-value">${course.credits}</span>
            </div>
            <div class="course-info">
                <label>GPA:</label>
                <span class="course-info-value">${course.gpa.toFixed(2)}</span>
            </div>
            <span class="grade-badge ${gradeClass}">${course.grade}</span>
        </div>
    `;

    card.addEventListener('click', () => {
        handleCourseClick(course);
    });

    return card;
}

// ==================== Course Click Handler ==================== 
function handleCourseClick(course) {
    console.log(`Clicked on course: ${course.name}`);
    alert(`Course: ${course.name}\nCode: ${course.code}\nGrade: ${course.grade}\nInstructor: ${course.instructor}`);
}

// ==================== Render Assignments ==================== 
function renderAssignments() {
    assignmentsList.innerHTML = '';

    assignmentData.forEach(assignment => {
        const assignmentItem = createAssignmentItem(assignment);
        assignmentsList.appendChild(assignmentItem);
    });
}

// ==================== Create Assignment Item ==================== 
function createAssignmentItem(assignment) {
    const item = document.createElement('div');
    item.className = 'assignment-item';

    const dueDate = new Date(assignment.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

    const statusClass = `status-${assignment.status}`;
    const statusText = assignment.status.charAt(0).toUpperCase() + assignment.status.slice(1);

    let dueDateText = '';
    if (daysUntilDue < 0) {
        dueDateText = `Overdue by ${Math.abs(daysUntilDue)} days`;
    } else if (daysUntilDue === 0) {
        dueDateText = 'Due Today';
    } else {
        dueDateText = `Due in ${daysUntilDue} days`;
    }

    item.innerHTML = `
        <div class="assignment-details">
            <div class="assignment-title">${assignment.title}</div>
            <div class="assignment-course">${assignment.course} (${assignment.courseCode})</div>
            <div class="assignment-due">${dueDateText}</div>
        </div>
        <span class="assignment-status ${statusClass}">${statusText}</span>
    `;

    item.addEventListener('click', () => {
        handleAssignmentClick(assignment);
    });

    return item;
}

// ==================== Assignment Click Handler ==================== 
function handleAssignmentClick(assignment) {
    console.log(`Clicked on assignment: ${assignment.title}`);
    const message = `
Assignment: ${assignment.title}
Course: ${assignment.course}
Due Date: ${assignment.dueDate}
Status: ${assignment.status}
Priority: ${assignment.priority}
    `;
    alert(message);
}

// ==================== Navigation Setup ==================== 
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-links a');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));

            // Add active class to clicked link
            this.classList.add('active');

            // Smooth scroll to section
            const href = this.getAttribute('href');
            const targetSection = document.querySelector(href);

            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ==================== Utility Functions ==================== 

// Format date to readable format
function formatDate(dateString) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
}

// Calculate average GPA
function calculateAverageGPA() {
    const totalGPA = courseData.reduce((sum, course) => sum + course.gpa, 0);
    return (totalGPA / courseData.length).toFixed(2);
}

// Get pending assignments count
function getPendingAssignmentsCount() {
    return assignmentData.filter(a => a.status === 'pending').length;
}

// Get total credits
function getTotalCredits() {
    return courseData.reduce((sum, course) => sum + course.credits, 0);
}

// ==================== Search Functionality ==================== 
function searchCourses(searchTerm) {
    const filteredCourses = courseData.filter(course =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase())
    );

    coursesList.innerHTML = '';
    filteredCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesList.appendChild(courseCard);
    });
}

// ==================== Filter Assignments ==================== 
function filterAssignmentsByStatus(status) {
    const filteredAssignments = assignmentData.filter(a => a.status === status);

    assignmentsList.innerHTML = '';
    filteredAssignments.forEach(assignment => {
        const assignmentItem = createAssignmentItem(assignment);
        assignmentsList.appendChild(assignmentItem);
    });
}

// ==================== Sort Courses ==================== 
function sortCoursesByGPA() {
    const sortedCourses = [...courseData].sort((a, b) => b.gpa - a.gpa);

    coursesList.innerHTML = '';
    sortedCourses.forEach(course => {
        const courseCard = createCourseCard(course);
        coursesList.appendChild(courseCard);
    });
}

// ==================== Console Logging ==================== 
console.log('Student Dashboard Application Loaded');
console.log('Total Courses:', courseData.length);
console.log('Total Assignments:', assignmentData.length);
console.log('Average GPA:', calculateAverageGPA());
console.log('Total Credits:', getTotalCredits());
