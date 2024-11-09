window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        document.querySelector('.btn-primary').addEventListener('click', login);
    } else {
        window.location.href = 'employees.html';
    }
}

function login() {
    const mail = document.getElementById('input-mail').value;
    const pass = document.getElementById('input-password').value;
    const errorMessage = document.getElementById('error-message');

    axios.post('http://localhost:3000/user/login', {
        user_mail: mail,
        user_password: pass
    }).then(function(res) {
        if (res.data.code === 200) {
            localStorage.setItem('token', res.data.message);
            window.location.href = 'employees.html';
        }
    }).catch(function(err) {
        if (err.response && err.response.status === 401) {
            // Mostrar el mensaje de error si las credenciales son incorrectas
            errorMessage.style.display = 'block';
            errorMessage.textContent = 'Correo o contraseña incorrectos. Inténtalo de nuevo.';
        } else {
            console.log(err);
        }
    });
}







