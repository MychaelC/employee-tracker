// Establish connections/dependencies
const connection = require("connection");
const inquirer = require("inquirer");
const table = require("console.table");

//Let db new department, role, employee
let department = new Department("name"); //
let role = new Role(title, salary, department_id);
let employee = new Employee(first_name, last_name, role_id, manager_id);

//class db file
class DB {
    constructor(department, role, employee) {
        this.department = department;
        this.role = role;
        this.employee = employee;
    }
};

class Department {
    constructor(name) {
        this.name = name;
    }

    //Departments
    addDepartment() {
        inquirer.prompt([
            {
                name:"name",
                type: "input",
                message: "What is your new department name?"
            }
        ]).then((data) => {
            const query = "INSERT INTO department SET?";
            const values = {name: data.name}

            connection.query(query, values, (err, res) => {
                if (err) throw err;
                //if Successful
                console.log("New Department added to database");
            });
        });
    };
}