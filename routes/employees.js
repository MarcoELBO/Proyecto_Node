const express = require('express');
const employees = express.Router();
const db = require('../config/database');

// Agregar empleado
employees.post("/", async (req, res, next) => {
    const { first_name, last_name, phone, email, address } = req.body;

    if (first_name && last_name && phone && email && address) {
        const query = `INSERT INTO employees (first_name, last_name, phone, email, address) VALUES ('${first_name}', '${last_name}', '${phone}', '${email}', '${address}')`;

        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Empleado insertado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// Eliminar empleado
employees.delete("/:id([0-9]+)", async (req, res, next) => {
    const query = `DELETE FROM employees WHERE id = ${req.params.id}`;
    const rows = await db.query(query);

    if (rows.affectedRows == 1) {
        return res.status(200).json({ code: 200, message: "Empleado borrado correctamente" });
    }
    return res.status(404).json({ code: 404, message: "Empleado no encontrado" });
});

// Actualizar empleado
employees.put("/:id([0-9]+)", async (req, res, next) => {
    const { first_name, last_name, phone, email, address } = req.body;

    if (first_name && last_name && phone && email && address) {
        const query = `UPDATE employees SET first_name = '${first_name}', last_name = '${last_name}', phone = '${phone}', email = '${email}', address = '${address}' WHERE id = ${req.params.id}`;

        const rows = await db.query(query);
        if (rows.affectedRows == 1) {
            return res.status(200).json({ code: 200, message: "Empleado actualizado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

// Listar empleados
employees.get("/", async (req, res, next) => {
    const employeesList = await db.query("SELECT * FROM employees");
    return res.status(200).json({ code: 200, message: employeesList });
});

// Búsqueda de empleados por nombre
employees.get("/search", async (req, res, next) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ code: 400, message: "El parámetro 'name' es requerido" });
    }
    try {
        const query = `SELECT * FROM employees WHERE first_name LIKE ? OR last_name LIKE ?`;
        const employeesList = await db.query(query, [`%${name}%`, `%${name}%`]);
        return res.status(200).json({ code: 200, message: employeesList });
    } catch (error) {
        return res.status(500).json({ code: 500, message: "Error al buscar empleados" });
    }
});

module.exports = employees;



