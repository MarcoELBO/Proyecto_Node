window.onload = init;

function init() {
    if (!localStorage.getItem('token')) {
        document.querySelector('.btn-secondary').addEventListener('click', function() {
            window.location.href = 'login.html';
        });

        document.querySelector('.btn-primary').addEventListener('click', signin);
    } else {
        window.location.href = 'employees.html';
    }
}

function signin() {
    var name = document.getElementById('input-name').value;
    var mail = document.getElementById('input-mail').value;
    var pass = document.getElementById('input-password').value;

    axios.post('http://localhost:3000/user/signin', {
        user_name: name,
        user_mail: mail,
        user_password: pass
    }).then(function(res) {
        alert('Usuario registrado correctamente');
        window.location.href = 'login.html';
    }).catch(function(err) {
        console.log(err);
    });
}
