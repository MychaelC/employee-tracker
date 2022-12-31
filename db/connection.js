//Import dependencies
const mysql = require("mysql2");


//Create mysql connection
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "NEWPASSWORD",
    database: "employee_db" //change names to all in sql
});

module.exports = connection;