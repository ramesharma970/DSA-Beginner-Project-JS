const students = [
    { name: 'John Doe', collegeId: 'C001', attendance: '90%', grade: 'A', viva: '80%', remarks: 'Good' },
    { name: 'Jane Smith', collegeId: 'C002', attendance: '85%', grade: 'B', viva: '75%', remarks: 'Average' },
    { name: 'Sam Brown', collegeId: 'C003', attendance: '95%', grade: 'A+', viva: '90%', remarks: 'Excellent' },
    { name: 'Lisa White', collegeId: 'C004', attendance: '88%', grade: 'B+', viva: '85%', remarks: 'Good' },
    { name: 'Tom Green', collegeId: 'C005', attendance: '70%', grade: 'C', viva: '65%', remarks: 'Needs Improvement' }
];

// Function to display students in the table
function displayStudents() {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    students.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.collegeId}</td>
            <td>${student.attendance}</td>
            <td>${student.grade}</td>
            <td>${student.viva}</td>
            <td>${student.remarks}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
document.getElementById('search-bar').addEventListener('input', (e) => {
    const query = e.target.value.toLowerCase();
    const filteredStudents = students.filter(student => {
        return (
            student.name.toLowerCase().includes(query) ||
            student.collegeId.toLowerCase().includes(query) ||
            student.grade.toLowerCase().includes(query) ||
            student.attendance.toLowerCase().includes(query) ||
            student.viva.toLowerCase().includes(query) ||
            student.remarks.toLowerCase().includes(query)
        );
    });
    
    displayFilteredStudents(filteredStudents);
});

function displayFilteredStudents(filteredStudents) {
    const tableBody = document.getElementById('table-body');
    tableBody.innerHTML = '';

    filteredStudents.forEach(student => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.collegeId}</td>
            <td>${student.attendance}</td>
            <td>${student.grade}</td>
            <td>${student.viva}</td>
            <td>${student.remarks}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Sort Table Functionality
function sortTable(columnIndex) {
    const rows = Array.from(document.querySelectorAll('#student-table tbody tr'));
    const isAscending = rows[0].cells[columnIndex].classList.toggle('asc');

    rows.sort((a, b) => {
        const aText = a.cells[columnIndex].textContent.trim();
        const bText = b.cells[columnIndex].textContent.trim();

        if (isNaN(aText) || isNaN(bText)) {
            return isAscending 
                ? aText.localeCompare(bText) 
                : bText.localeCompare(aText);
        }
        return isAscending 
            ? parseFloat(aText) - parseFloat(bText) 
            : parseFloat(bText) - parseFloat(aText);
    });

    rows.forEach(row => document.querySelector('#student-table tbody').appendChild(row));
}

// Add new student functionality
document.getElementById('student-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const collegeId = document.getElementById('college-id').value;
    const attendance = document.getElementById('attendance').value;
    const grade = document.getElementById('grade').value;
    const viva = document.getElementById('viva').value;
    const remarks = document.getElementById('remarks').value;

    const newStudent = { name, collegeId, attendance, grade, viva, remarks };
    students.push(newStudent);

    // Clear form fields
    document.getElementById('student-form').reset();

    displayStudents();  // Re-display the table with the new student
});

// Initialize table display
window.onload = function() {
    displayStudents();
};
