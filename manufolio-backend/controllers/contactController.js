const db = require("../config/db");

exports.submitContact = (req, res) => {
    const { name, email, message } = req.body;

    const sql = `
    INSERT INTO contacts (name, email, message)
    VALUES (?, ?, ?)
    `;

    db.query(sql, [name, email, message], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Contact message saved successfully" });
    });
};
