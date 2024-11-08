const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const employeesController = require('../controllers/employeesController');

router.get('/', auth, employeesController.getAllEmployees);
router.post('/', auth, employeesController.addEmployee);
router.put('/:id', auth, employeesController.updateEmployee);
router.delete('/:id', auth, employeesController.deleteEmployee);

module.exports = router;

