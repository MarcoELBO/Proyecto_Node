document.getElementById("registerForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        await axios.post('/api/users/register', { username, email, password });
        alert("Registro exitoso");
        window.location.href = "login.html";
    } catch (error) {
        alert("Error en el registro");
    }
});
