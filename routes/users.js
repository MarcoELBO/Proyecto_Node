const express = require('express');
const jwt = require('jsonwebtoken');
const user = express.Router();
const db = require('../config/database');

user.post("/login", async (req, res, next) => {
    const { user_mail, user_password } = req.body;
    const query = `SELECT * FROM users WHERE user_email = ?`;
    const rows = await db.query(query, [user_mail]);

    // Validación de usuario y contraseña en texto plano
    if (rows.length === 1 && rows[0].user_password === user_password) {
        const token = jwt.sign(
            { user_id: rows[0].user_id, user_mail: rows[0].user_mail },
            "debugkey",
            { expiresIn: '1h' } // Duración del token
        );
        return res.status(200).json({ code: 200, message: token });
    }

    return res.status(401).json({ code: 401, message: "Usuario y/o contraseña incorrectos" });
});

module.exports = user;






