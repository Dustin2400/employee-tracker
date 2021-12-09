const { application } = require('express');
const inquirer = require('inquirer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cTable = require('console.table');
const db = require('../../config/connection');

function viewAllRoles() {
    async function getInfo() {
        let queryUrl = 'http://localhost:3001/api/role';
        const response = await fetch(queryUrl, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
        }
        getInfo()
        .then(data => {
            console.table(data);
        });
}

function findID(answers) {
    const sqlString = `SELECT department.id FROM department WHERE name = ${answers.department}`;
    console.log(answers, 'before query');
            db.query(sqlString, (err, result)=> {
                if (err) {
                    console.log(err);
                    return;
                }
                department = result;
                console.log(result, 'response')
                return result;
            });
}

function addRole() {
    let department;
    let departments = [];
    async function getDepartments() {
        let queryUrl = 'http://localhost:3001/api/department';
        const response = await fetch(queryUrl, {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'Content-Type': 'application/json'
            }
        });
        return response.json();
        }
        getDepartments()
        .then(data => {
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
            const id = findID(answers)
            console.log(id, "id");
            return answers;
        })
            .then(answers => {
                console.log(answers, 'pre-fetch');
            async function setInfo() {
                console.log(department);
                let queryUrl = 'http://localhost:3001/api/role';
                const roleObj = {
                    title: answers.title,
                    salary: answers.salary,
                    department_id: department.id
                };
                const response = await fetch(queryUrl, {
                    method: 'POST',
                    headers: {
                        accept: 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(roleObj)
                });
                return response.json();
                }
                setInfo()
            })
                .then(data => {
                    const message = 'Added ' + answers.input + ' to the database';
                    console.log(message);
                })
}

function removeRole() {}

module.exports = {
    viewAllRoles,
    addRole,
    removeRole
};