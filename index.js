//Dependency
const connection = require("./db/connection.js");
const db = require("./db/index.js"); //contains Department, Role and Emp classes

//Connect to mysql server and starting application with query database
connection.connect((err) => {
    if (err) {
        throw err;
    }
    db.start();
});