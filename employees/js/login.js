document.getElementById("loginForm").addEventListener("submit", async function(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
        const response = await axios.post('/api/users/login', { email, password });
        localStorage.setItem('token', response.data.token);
        window.location.href = "employees.html";
    } catch (error) {
        alert("Credenciales incorrectas");
    }
});
