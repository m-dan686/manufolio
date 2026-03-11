const db = require("../config/db");

exports.downloadResume = (req, res) => {
    const { resume_id } = req.body;
    const ip = req.ip;

    const sql = `
    INSERT INTO resume_downloads (resume_id, visitor_ip)
    VALUES (?, ?)
    `;

    db.query(sql, [resume_id, ip], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Download tracked" });
    });
};
