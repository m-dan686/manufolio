const db = require("../config/db");

exports.addProject = (req, res) => {
    const { title, description, github_url, demo_url } = req.body;
    const image = req.file ? req.file.filename : null;

    const sql = `
    INSERT INTO projects
    (title,description,github_url,demo_url,cover_image)
    VALUES (?,?,?,?,?)
    `;

    db.query(sql,
        [title, description, github_url, demo_url, image],
        (err, result) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Project added" });
        });
};
