const express = require('express');
const cors = require('./middleware/cors');
const notFound = require('./middleware/notFound');
const employeesRoutes = require('./routes/employees');
const usersRoutes = require('./routes/users');

const app = express();

app.use(express.json());
app.use(cors);

// Rutas
app.use('/api/employees', employeesRoutes);
app.use('/api/users', usersRoutes);

// Middleware para manejar rutas no encontradas
app.use(notFound);

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor ejecutándose en el puerto 3000');
});
