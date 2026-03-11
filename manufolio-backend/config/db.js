const mysql = require("mysql2");

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "root",
    database: "manufolio",
    connectionLimit: 10
});

module.exports = db;
