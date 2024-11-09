const morgan = require('morgan');
const express = require('express');
const app = express();

const employees = require('./routes/employees');
const users = require('./routes/users');

const auth = require('./middleware/auth');
const notFound = require('./middleware/notFound');
const index = require('./middleware/index');
const cors = require('./middleware/cors');

app.use(cors);
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', index);

app.use('/user', users);

app.use(auth);
app.use('/employees', employees);

app.use(notFound);

app.listen(process.env.PORT || 3000, () => {
    console.log('Server is running on port 3000');
});
