window.onload = init;

function init() {
    if (localStorage.getItem('token')) {
        loadEmployees();
        document.getElementById("logoutButton").addEventListener("click", logout);
    } else {
        window.location.href = 'login.html';
    }
}

function loadEmployees() {
    axios.get('http://localhost:3000/employees', {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function(res) {
        displayEmployees(res.data.message);
    }).catch(function(err) {
        console.log(err);
    });
}

function displayEmployees(employees) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = ''; // Limpiar lista antes de mostrar resultados
    employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.innerHTML = `
            <h3>${employee.first_name} ${employee.last_name}</h3>
            <p>Email: ${employee.email}</p>
            <p>Teléfono: ${employee.phone}</p>
            <p>Dirección: ${employee.address}</p>
        `;
        employeeList.appendChild(employeeDiv);
    });
}

function searchEmployee() {
    const name = document.getElementById('search-name').value;
    if (!name) return;

    axios.get(`http://localhost:3000/employees/search?name=${name}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function(res) {
        displayEmployees(res.data.message);
    }).catch(function(err) {
        console.log(err);
    });
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

