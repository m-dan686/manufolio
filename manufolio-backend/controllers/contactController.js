const db = require("../config/db");

exports.submitContact = (req, res) => {
    const { name, email, phone, message } = req.body;

    const sql = `
    INSERT INTO contacts (name, email, phone, message)
    VALUES (?, ?, ?, ?)
    `;

    db.query(sql, [name, email, phone, message], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Contact message saved successfully" });
    });
};
