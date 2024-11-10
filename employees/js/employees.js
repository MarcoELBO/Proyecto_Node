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
    }).catch(handleAuthorizationError);
}

function displayEmployees(employees) {
    const employeeList = document.getElementById('employeeList');
    employeeList.innerHTML = ''; // Limpiar lista antes de mostrar resultados
    employees.forEach(employee => {
        const employeeDiv = document.createElement('div');
        employeeDiv.style.fontWeight = 'normal'; // Asegurarse de que el texto no esté en negrita

        employeeDiv.innerHTML = `
            <h3 style="font-weight: normal;">${employee.first_name} ${employee.last_name}</h3>
            <p>Email: ${employee.email}</p>
            <p>Teléfono: ${employee.phone}</p>
            <p>Dirección: ${employee.address}</p>
            <button onclick="deleteEmployee(${employee.id})">Eliminar</button>
            <button onclick="editEmployee(${employee.id})">Editar</button>
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
    }).catch(handleAuthorizationError);
}

function showAddEmployeeForm() {
    document.getElementById("addEmployeeForm").style.display = "block";
}

function hideAddEmployeeForm() {
    document.getElementById("addEmployeeForm").style.display = "none";
    clearAddEmployeeForm(); // Limpiar los campos del formulario al cerrarlo
}

function addEmployee() {
    const first_name = document.getElementById('first_name').value;
    const last_name = document.getElementById('last_name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;

    if (!first_name || !last_name || !email) { // Validación de campos obligatorios
        alert("Por favor completa todos los campos obligatorios.");
        return;
    }

    axios.post('http://localhost:3000/employees', {
        first_name, last_name, phone, email, address
    }, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function(res) {
        loadEmployees();
        hideAddEmployeeForm(); // Ocultar el formulario de agregar después de guardar
    }).catch(handleAuthorizationError);
}

function clearAddEmployeeForm() {
    document.getElementById('first_name').value = '';
    document.getElementById('last_name').value = '';
    document.getElementById('phone').value = '';
    document.getElementById('email').value = '';
    document.getElementById('address').value = '';
}

function editEmployee(id) {
    axios.get(`http://localhost:3000/employees`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function(res) {
        const employee = res.data.message.find(emp => emp.id === id);
        if (employee) {
            document.getElementById("edit_id").value = employee.id;
            document.getElementById("edit_first_name").value = employee.first_name;
            document.getElementById("edit_last_name").value = employee.last_name;
            document.getElementById("edit_phone").value = employee.phone;
            document.getElementById("edit_email").value = employee.email;
            document.getElementById("edit_address").value = employee.address;

            document.getElementById("editEmployeeForm").style.display = "block";
        }
    }).catch(handleAuthorizationError);
}

function updateEmployee() {
    const id = document.getElementById('edit_id').value;
    const first_name = document.getElementById('edit_first_name').value;
    const last_name = document.getElementById('edit_last_name').value;
    const phone = document.getElementById('edit_phone').value;
    const email = document.getElementById('edit_email').value;
    const address = document.getElementById('edit_address').value;

    axios.put(`http://localhost:3000/employees/${id}`, {
        first_name, last_name, phone, email, address
    }, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
    }).then(function(res) {
        loadEmployees();
        hideEditEmployeeForm(); // Ocultar el formulario de edición después de actualizar
    }).catch(handleAuthorizationError);
}

function hideEditEmployeeForm() {
    document.getElementById("editEmployeeForm").style.display = "none";
}

function deleteEmployee(id) {
    axios.delete(`http://localhost:3000/employees/${id}`, {
        headers: {
            'Authorization': 'Bearer ' + localStorage.getItem('token')
    }}).then(function(res) {
        loadEmployees();
    }).catch(handleAuthorizationError);
}

function logout() {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
}

function handleAuthorizationError(error) {
    if (error.response && error.response.status === 401) {
        alert("Tu sesión ha expirado o no tienes permiso. Por favor, inicia sesión nuevamente.");
        localStorage.removeItem('token');
        window.location.href = 'login.html';
    } else {
        console.error(error);
    }
}








