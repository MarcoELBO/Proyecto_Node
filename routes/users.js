const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const user = express.Router();
const db = require('../config/database');

user.post("/signin", async (req, res, next) => {
    const { user_name, user_mail, user_password } = req.body;

    if (user_name && user_mail && user_password) {
        const hashedPassword = await bcrypt.hash(user_password, 10);
        const query = `INSERT INTO users (user_name, user_mail, user_password) VALUES ('${user_name}', '${user_mail}', '${hashedPassword}')`;

        const rows = await db.query(query);

        if (rows.affectedRows == 1) {
            return res.status(201).json({ code: 201, message: "Usuario registrado correctamente" });
        }
        return res.status(500).json({ code: 500, message: "Ocurrió un error" });
    }
    return res.status(500).json({ code: 500, message: "Campos incompletos" });
});

user.post("/login", async (req, res, next) => {
    const { user_mail, user_password } = req.body;
    const query = `SELECT * FROM users WHERE user_mail = '${user_mail}'`;
    const rows = await db.query(query);

    if (rows.length == 1 && await bcrypt.compare(user_password, rows[0].user_password)) {
        const token = jwt.sign({ user_id: rows[0].user_id, user_mail: rows[0].user_mail }, "debugkey");
        return res.status(200).json({ code: 200, message: token });
    }
    return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
});

module.exports = user;

