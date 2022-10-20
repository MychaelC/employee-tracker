// Establish connections/dependencies
const connection = require("connection");
const inquirer = require("inquirer");
const empTable = require("console.table");
const { table } = require("console");

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
                name: "name",
                type: "input",
                message: "What is your new department name?"
            }
        ]).then((data) => {
            const query = "INSERT INTO department SET?";
            const values = { name: data.name }

            connection.query(query, values, (err, res) => {
                if (err) throw err;
                //if Successful
                console.log("New Department added to database");
            });
        });
    };
    // View 
    viewDepartments() {
        const query = "SELECT * FROM department";

        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = empTable.getTable(res);
            console.log(table);
        });
    };

    // Update department
    updateDepartment() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the department you would like to update?"
            },
            {
                name: "id",
                type: "input",
                message: "Updated department name: "
            }
        ]).then((data) => {
            const query = "UPDATE department SET ? WHERE ?";
            const values = [
                {
                    name: data.name
                },
                {
                    id: data.id
                }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;
                //if successful
                console.log("Department name has been updated!");
            });
        });
    };
    // Delete department
    deleteDepartment() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the department you would want to delete?"
            }
        ]).then(data => {
            const query = "DELETE FROM department WHERE ?";
            const values = { id: data.id };

            connection.query(query, values, (err, res) => {
                if (err) throw err;
                //if successful
                console.log("Department name has been deleted!");
            });
        });
    };
}
// Class Roles
class Role {
    constructor(title, salary, department_id) {
        this.title = title;
        this.salary = salary;
        this.department_id = department_id;
    }

    // Add roles
    addRole() {
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What is the title of your new role?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary of your new role?"
            },
            {
                name: "department_id",
                type: "input",
                message: "What is the Department ID your new role?"
            }
        ]).then((data) => {
            const query = "INSERT INTO role SET ?";
            const values = {
                title: data.title,
                salary: data.salary,
                department_id: data.department_id
            };

            connection.query(query, values, (err, res) => {
                if (err) throw err;
                //if Successful
                console.log("A new table was added to the database!");
            });
        });
    };

    // View 
    viewRoles() {
        const query = "SELECT * FROM role";

        connection.query(query, (err, res) => {
            if (err) throw err;

            const table = empTable.getTable(res);
            console.log(table);
        })
    };

    // Update role
    updateRole() {
        inquirer.prompt(
            {
                name: "roleChoices",
                type: "roleList",
                message: "What would you like to do?",
                choices: [
                    "Update role title",
                    "Update role salary",
                    "Update role department designation",
                    "Back"
                ]
            }).then(onUpdateRole);
    };

    onUpdateRole({ roleChoices }) {
        switch (roleChoices) {
            case "Update role title":
                this.updateRoleTitle();
                break;
            case "Update role salary":
                this.updateRoleSalary();
                break;
            case "back":
            default:
                mainPrompt();
                console.log("Return to main page!");
        }
    }

    updateRoleTitle() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is ID of the role you would like to update?"
            },
            {
                name: "title",
                type: "input",
                message: "Update role title to: "
            }
        ]).then(date => {
            const query = "UPDATE role SET ? WHERE ?";
            const values = [
                { title: data.title },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;

                //If Successful 
                console.log("Role title has been updated!");
            });
        });
    };

    updateRoleSalary() {
        inquirer.prompt([
            {
                name: "id",
                type: "input",
                message: "What is the id of the role you would like to update?"
            },
            {
                name: "salary",
                type: "input",
                message: "Update role salary to: "
            }
        ]).then(data => {
            const query = "UPDATE role SET ? WHERE ?";
            const values = [
                { salary: data.salary },
                { id: data.id }
            ];

            connection.query(query, values, (err, res) => {
                if (err) throw err;
                //if successful
                console.log("Role salary has been updated!");
            });
        });
    };


updateRoleDepartment() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the id of the role you would like to update?"
        },
        {
            name: "department_id",
            type: "input",
            message: "What is the ID of the department you would like to designate the role to?"
        }
    ]).then(data => {
        const query = "UPDATE role SET ? WHERE ?";
        const values = [
            { department_id: data.department_id },
            { id: data.id }
        ];

        connection.query(query, values, (err, res) => {
            if (err) throw err;
            //if successful
            console.log("You have updated a role's department!");
        });
    });
};

//Delete Role
deleteRole() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the id of the role you would like to delete?"
        },
    ]).then(data => {
        const query = "UPDATE FROM role WHERE ?";
        const values = 
            { id: data.id };

        connection.query(query, values, (err, res) => {
            if (err) throw err;
            //if successful
            console.log("You have deleted a role from the database!");
        });
    });
};
};

class Employee {
    constructor(first_name, last_name, role_id, manager_id) {
        this.first_name = first_name;
        this.last_name = last_name;
        this.role_id = role_id;
        this.manager_id = manager_id;
    }

    //Create Employee
    addEmployee() {
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "First name:"
            },
            {
                name: "last_name",
                type: "input",
                message: "Last name: "
            },
            {
                name: "role_id",
                type: "input",
                message: "What role does the employee have? "
            },
            {
                name: "manager_id",
                type: "input",
                message: "Who is the employee's manager?"
            }
        ]).then((data) => {
            const query = "INSERT INTO employee SET ?";
            const values = {
                first_name: data.first_name,
                last_name: data.last_name,
                role_id: data.role_id,
                manager_id: data.manager_id
                };
    
            connection.query(query, values, (err, res) => {
                if (err) throw err;
                //if successful
                console.log("We added a new employee to the database!");
            });
        });
    };
    //View the employees
    viewEmployees() {
        inquirer.prompt({
            name: "byType",
            type: "rawlist",
            message: "What would you like to do?",
            choices: [
                "View all employees",
                "View employees by department",
                "View employees by role",
                "View employees by manager",
                "Back"
            ]
        }).then(onViewEmployees);
    };

    onViewEmployees({ byType }) {
        switch (byType) {
            case "View all employees":
                this.viewAllEmployees;
                break;
            case "View employees by department":
                this.viewbyDept;
                break;
            case "View employees by role":
            this.viewbyRole;
                break;
            case "View employees by manager":
                this.viewbyManager;
                break;
            case "Back":
                default:
                    mainPrompt()
                    console.log("Trying to return to main page");
        }
    };

    viewAllEmployees() {
        const query = "SELECT * FROM employee";
        connection.query(query,(err, res) => {
            if (err) throw err;

            const table =empTable.getTable(res);
            console.log(table);
        });
    };

    viewbyDept() {
        const query = "View employees by department";
        const baseQuery = `SELECT e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary, CONCAT(e2.first_name, " ", e2.last_name) AS Manager
        FROM employee AS e1
        LEFT JOIN role on e1.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee AS e2 ON e2.id=e1.manager_id
        ORDER BY department ASC;`;
        const queryOpt2 = `SELECT e.first_name, e.last_name, r.title, r.salary,
        CONCAT(e1.first_name, " ", e1.last_name) as manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        LEFT JOIN employee e1 ON e.manager_id = e1.id
        WHERE r.department_id = ?`;

        console.log(query);
    };
    viewbyManager() {
        const query = "View employees by manager";
        const queryOpt1 = `SELECT CONCAT(e2.first_name, " ", e2.last_name) AS Manager, e1.id AS EMPID, e1.first_name AS FName, e1.last_name AS LName, role.title AS Title, department.name AS Department, role.salary AS Salary
        
        FROM employee AS e1
        LEFT JOIN role on e1.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        INNER JOIN employee AS e2 ON e2.id=e1.manager_id
        ORDER BY department ASC;`;
        const queryOpt2 = `SELECT e.first_name, e.last_name, r.title, r.salary,
        CONCAT(e1.first_name, " ", e1.last_name) as manager
        FROM employee e
        INNER JOIN role r ON e.role_id = r.id
        LEFT JOIN employee e1 ON e.manager_id = e1.id
        WHERE r.department_id = ?`;

        console.log(query);
    };
    }
