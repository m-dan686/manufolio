const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
    const { username, password } = req.body;

    const sql = `SELECT * FROM admins WHERE username = ?`;

    db.query(sql, [username], async (err, results) => {
        if (err) return res.status(500).json(err);

        if (results.length === 0) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const admin = results[0];
        const match = await bcrypt.compare(password, admin.password_hash);

        if (!match) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        const token = jwt.sign(
            { id: admin.admin_id, username: admin.username },
            process.env.JWT_SECRET || "default_secret",
            { expiresIn: "1d" }
        );

        res.json({ token, message: "Logged in successfully" });
    });
};
