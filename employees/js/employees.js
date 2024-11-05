const token = localStorage.getItem('token');
if (!token) window.location.href = 'login.html';

async function loadEmployees() {
    try {
        const response = await axios.get('/api/employees', { headers: { Authorization: `Bearer ${token}` } });
        let employeesHTML = '<table class="table"><thead><tr><th>Nombre</th><th>Apellido</th><th>Teléfono</th><th>Email</th><th>Dirección</th><th>Acciones</th></tr></thead><tbody>';
        response.data.forEach(employee => {
            employeesHTML += `<tr>
                <td>${employee.first_name}</td>
                <td>${employee.last_name}</td>
                <td>${employee.phone}</td>
                <td>${employee.email}</td>
                <td>${employee.address}</td>
                <td>
                    <button onclick="editEmployee(${employee.id})" class="btn btn-sm btn-warning">Editar</button>
                    <button onclick="deleteEmployee(${employee.id})" class="btn btn-sm btn-danger">Eliminar</button>
                </td>
            </tr>`;
        });
        employeesHTML += '</tbody></table>';
        document.getElementById('employeeList').innerHTML = employeesHTML;
    } catch (error) {
        console.error(error);
        alert("Error al cargar empleados");
    }
}

document.getElementById("addEmployeeForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const employee = {
        first_name: document.getElementById("first_name").value,
        last_name: document.getElementById("last_name").value,
        phone: document.getElementById("phone").value,
        email: document.getElementById("email").value,
        address: document.getElementById("address").value
    };
    const employeeId = document.getElementById("employeeId").value;

    try {
        if (employeeId) {
            await axios.put(`/api/employees/${employeeId}`, employee, { headers: { Authorization: `Bearer ${token}` } });
        } else {
            await axios.post('/api/employees', employee, { headers: { Authorization: `Bearer ${token}` } });
        }
        loadEmployees();
        document.getElementById("addEmployeeForm").reset();
        showEmployeeForm(false);
    } catch (error) {
        alert("Error al guardar empleado");
    }
});

function showEmployeeForm(show = true) {
    document.getElementById("employeeForm").style.display = show ? "block" : "none";
}

document.getElementById("logoutButton").addEventListener("click", () => {
    localStorage.removeItem('token');
    window.location.href = 'login.html';
});

loadEmployees();
