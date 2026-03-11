const db = require("../config/db");

exports.trackProjectView = (req, res) => {
    const { project_id } = req.body;
    const ip = req.ip;

    const sql = `
    INSERT INTO project_views (project_id, visitor_ip)
    VALUES (?, ?)
    `;

    db.query(sql, [project_id, ip], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "View tracked" });
    });
};

exports.trackVisitor = (req, res) => {
    const ip = req.ip;
    const browser = req.headers['user-agent'];

    const sql = `
    INSERT INTO visitors (ip_address, browser)
    VALUES (?, ?)
    `;

    db.query(sql, [ip, browser], (err, result) => {
        if (err) return res.status(500).json(err);
        res.json({ message: "Visitor tracked" });
    });
};
