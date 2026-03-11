const mysql = require("mysql2");
const bcrypt = require("bcrypt");

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "portfolio_db"
});

async function createAdmin() {
    const username = "admin";
    const password = "admin123";
    const hash = await bcrypt.hash(password, 10);

    db.query(`CREATE TABLE IF NOT EXISTS admins (
        admin_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(100) UNIQUE NOT NULL,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) {
            console.error("Error ensuring admins table exists:", err);
            db.end();
            return;
        }
        db.query(`INSERT IGNORE INTO admins (username, password_hash) VALUES (?, ?)`, [username, hash], (err) => {
            if (err) {
                console.error("Error creating admin:", err);
            } else {
                console.log("Admin credentials injected safely.");
            }
            db.end();
        });
    });
}
createAdmin();
