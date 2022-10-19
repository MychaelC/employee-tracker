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
    ]).then((data) => {
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
                name:"title",
                type: "input",
                message: "What is the title of your new role?"
            },
            {
                name:"salary",
                type: "input",
                message: "What is the salary of your new role?"
            },
            {
                name:"department_id",
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

// Update department
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

onUpdateRole({roleChoices}) {
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
    
}
//     ]).then((data) => {
//         const query = "UPDATE department SET ? WHERE ?";
//         const values = [
//             {
//                 name: data.name
//             },
//             {
//                 id: data.id
//             }
//         ];

//         connection.query(query, values, (err, res) => {
//             if (err) throw err;
//             //if successful
//             console.log("Department name has been updated!");
//         });
//     });
// };
// Delete department
deleteDepartment() {
    inquirer.prompt([
        {
            name: "id",
            type: "input",
            message: "What is the id of the department you would want to delete?"
        }
    ]).then((data) => {
        const query = "DELETE FROM department WHERE ?";
        const values = { id: data.id }; 

        connection.query(query, values, (err, res) => {
            if (err) throw err;
            //if successful
            console.log("Department name has been deleted!");
        });
    });
};

