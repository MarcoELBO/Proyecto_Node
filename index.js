const morgan = require('morgan');
const express = require('express');
const app = express();

const employees = require('./routes/employees');
const users = require('./routes/users');

const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/user', users);

app.use(auth); // Protege las rutas de empleados con autenticación
app.use('/employees', employees);

app.use(notFound); // Middleware para rutas no encontradas

// Inicia el servidor
app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});



