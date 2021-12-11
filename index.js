const inquirer = require('inquirer');
const db = require('./config/connection');
let departmentId;
let roleId;
let roleId2;
let managerId;

function viewAllDepartments() {
    const sql = `SELECT * FROM department;`;
    db.promise().query(sql)
    .then(([ data ]) => {
        console.table(data);
        employerPrompt();
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: 'text',
            name: 'input',
            message: 'What is the name of the department?'
        }
    ])
    .then(answer => {
        const sql = `INSERT INTO department (name) VALUES (?);`;
        const params = answer.input;

        db.promise().query(sql, params)
        .then(data => {
            const message = 'Added ' + answer.input + ' to the database';
            console.log(message);
            employerPrompt();
        });
    });  
}

function removeDepartment() {
    let departments = [];
    const sql = `SELECT * FROM department;`;
    db.promise().query(sql)
        .then(([ data ]) => {
            for (i=0; i<data.length; i++) {
                departments.push(data[i].name);
            }
            return departments
        })
        .then(departments => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'name',
                message: 'Which department would you like to remove?',
                choices: departments
            }
        ])
        .then(answers => {
            const sql = `DELETE FROM department WHERE name = ?;`;
            const params = answers.name;

            db.promise().query(sql, params)
            .then(() => {
                const message = answers.name + ' has been deleted.';
                console.log(message);
                employerPrompt();
            })
        });
    });
}

function viewAllRoles() {
        const sql = `SELECT role.id, role.title, role.salary, department.name AS department
        FROM role LEFT JOIN department
        ON role.department_id = department.id;`;
        db.promise().query(sql)
        .then(([ data ]) => {
            console.table(data);
            employerPrompt();
        });
}

function getId(answers) {
    const sql2 = `SELECT department.id FROM department WHERE name = '${answers.department}';`;
    db.promise().query(sql2)
    .then(([ response ])=> {
        departmentId = response[0].id;
        postRole(answers);
    })
}

function postRole(answers) {
                const sql3 = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
                const params = [answers.title, answers.salary, departmentId];

                db.promise().query(sql3, params)
                .then(([ data ]) => {
                    const message = 'Added '+ answers.title + ' to the database.'
                    console.log(message);
                    employerPrompt();
                })
}

function addRole() {
    let departments = [];
    const sql = `SELECT * FROM department;`;
    db.promise().query(sql)
        .then(([ data ]) => {
            for (i=0; i<data.length; i++) {
                departments.push(data[i].name);
            }
            return departments
        })
        .then(departments => {
        return inquirer.prompt([
            {
                type: 'text',
                name: 'title',
                message: 'What is the name of the role?'
            },
            {
                type: 'number',
                name: 'salary',
                message: 'What is the salary of the role?'
            },
            {
                type: 'list',
                name: 'department',
                message: 'Which department does this role belong to?',
                choices: departments
            }
        ])
        })
        .then(answers => {
            return getId(answers);
        })
}

function removeRole() {
    let roles = [];
    const sql = `SELECT * FROM role;`;
    db.promise().query(sql)
    .then(([ data ]) => {
        for (i=0; i<data.length; i++) {
            roles.push(data[i].title);
        }
        return roles;
    })
    .then(() => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'title',
                message: 'Which role do you want to remove?',
                choices: roles
            }
        ])
    })
    .then(answers => {
        const sql = `DELETE FROM role WHERE title = ?;`;
        const params = answers.title;
        db.promise().query(sql, params)
        .then(() => {
            const message = answers.title + ' has been removed.';
            console.log(message);
            employerPrompt();
        });
    });
}

function viewAllEmployees() {
    const sql = `SELECT employee1.id, employee1.first_name, employee1.last_name, role.title AS job_title, role.salary, manager.first_name AS manager_, manager.last_name AS manager
    FROM employee AS employee1
    LEFT JOIN employee AS manager
    ON employee1.manager_id = manager.id
    LEFT JOIN role ON employee1.role_id = role.id;`;
    db.promise().query(sql)
        .then(([ data ]) => {
            console.table(data);
            employerPrompt();
        });
}

function getRoleId(answers) {
    const sql = `SELECT role.id FROM role WHERE title = '${answers.role}';`;
    db.promise().query(sql)
    .then(([ response ]) => {
        roleId = response[0].id;
        getManagerId(answers);
    });
}

function getManagerId(answers) {
    const names = answers.manager.split(' ');
    const sql = `SELECT employee.id FROM employee WHERE first_name = '${names[0]}';`;
    db.promise().query(sql)
    .then(([ response ]) => {
        managerId = response[0].id;
        postEmployee(answers);
    });
}

function postEmployee(answers) {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
    const params = [answers.first_name, answers.last_name, roleId, managerId];

    db.promise().query(sql, params)
    .then(([ data ]) => {
        const message = 'Added '+ answers.first_name + ' ' + answers.last_name + ' to the database.'
        console.log(message);
        employerPrompt();
    })
}

function addEmployee() {
    let roles = [];
    let managers = [];
    const sql = `SELECT * FROM role;`;
    const sql2 = `SELECT * FROM employee WHERE manager_id IS NULL`
    db.promise().query(sql)
    .then(([ data ]) => {
        for (i=0; i<data.length; i++) {
            roles.push(data[i].title);
        }
        return roles;
    })
    db.promise().query(sql2)
    .then(([ data ]) => {
        for (i=0; i<data.length; i++) {
            let manager = data[i].first_name +' '+data[i].last_name;
            managers.push(manager);
        }
        return managers;
    })
    .then(() => {
        return inquirer.prompt([
        {
            type: 'text',
            name: 'first_name',
            message: "What is the employee's first name?"
        },
        {
            type: 'text',
            name: 'last_name',
            message: "What is the employee's last name?"
        },
        {
            type: 'list',
            name: 'role',
            message: "What is this employee's role?",
            choices: roles
        },
        {
            type: 'list',
            name: 'manager',
            mesaage: "Who is this employee's manager",
            choices: managers
        }
        ])
    })
    .then(answers => {
        getRoleId(answers);
    })
}

function removeEmployee () {
    let employees = [];
    const sql = `SELECT * FROM employee;`;
    db.promise().query(sql)
    .then(([ data ]) =>{
        for (i=0; i<data.length; i++) {
            let employee = data[i].first_name +' '+data[i].last_name;
            employees.push(employee);
        }
        return employees;
    })
    .then(() => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Whom would you like to terminate?',
                choices: employees
            }
        ])
    })
    .then(answers => {
        const names = answers.employee.split(' ');
        const sql = `DELETE FROM employee WHERE first_name = ?`;
        const params = names[0];

        db.promise().query(sql, params)
        .then(() => {
            const message = answers.employee + ' has been terminated.'
            console.log(message);
            employerPrompt();
        });
    });
}

function getRoleId2(answers) {
    console.log(answers);
    const sql = `SELECT role.id FROM role WHERE title = '${answers.role}';`;
    db.promise().query(sql)
    .then(([ response ]) => {
        roleId2 = response[0].id;
        changeRole(answers);
    });
}

function changeRole(answers) {
    const names = answers.employee.split(' ');
    const sql = `UPDATE employee SET role_id = ? WHERE first_name = ?;`;
    const params = [roleId2, names[0]];

    db.promise().query(sql, params)
    .then(() => {
        const message = answers.employee + "'s role updated.";
        console.log(message);
        employerPrompt();
    });
}

function updateRole() {
    let employees = [];
    let roles = [];
    const sql = `SELECT * FROM employee;`;
    const sql2 = `SELECT * FROM role`;
    db.promise().query(sql)
    .then(([ data ]) =>{
        for (i=0; i<data.length; i++) {
            let employee = data[i].first_name +' '+data[i].last_name;
            employees.push(employee);
        }
        return employees;
    })
    db.promise().query(sql2)
    .then(([ data ]) => {
        for (i=0; i<data.length; i++) {
            roles.push(data[i].title);
        }
        return roles;
    })
    .then(() => {
        return inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: 'Whose role would you like to change?',
                choices: employees
            },
            {
                type: 'list',
                name: 'role',
                message: "What is the employee's new role?",
                choices: roles
            }
        ])
    })
    .then(answers => {
        getRoleId2(answers);
    })
}

function employerPrompt() {
    return inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'What would you like to do?',
            choices: ['View all departments', 
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee role',
                'Remove a department',
                'Remove a role',
                'Remove an employee',
                'Quit'
            ]
        }
    ])
    .then(answers => {
        switch (answers.action) {
            case 'View all departments':
                viewAllDepartments();
                break;
            case 'View all roles':
                viewAllRoles();
                break;
            case 'View all employees':
                viewAllEmployees();
                break;
            case 'Add a department':
                addDepartment();
                break;
            case 'Add a role':
                addRole();
                break;
            case 'Add an employee':
                addEmployee();
                break;
            case 'Update an employee role':
                updateRole();
                break;
            case 'Remove a department':
                removeDepartment();
                break;
            case 'Remove a role':
                removeRole();
                break;
            case 'Remove an employee':
                removeEmployee();
                break;
            case 'Quit':
                break
        }
    })
}

employerPrompt();

module.exports = { employerPrompt }