const { application } = require('express');
const inquirer = require('inquirer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cTable = require('console.table');

function viewAllDepartments() {
    async function getInfo() {
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
    getInfo()
    .then(data => {
        console.table(data);
    });
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
        async function setInfo() {
            let queryUrl = 'http://localhost:3001/api/department';
            const departmentObj = {
                name: answer.input
            };
            const response = await fetch(queryUrl, {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(departmentObj)
            });
            return response.json();
            }
            setInfo()
            .then(data => {
                const message = 'Added ' + answer.input + ' to the database';
                console.log(message);
            })
    })  
}

function removeDepartment() {}

module.exports = {
    viewAllDepartments,
    addDepartment,
    removeDepartment
};