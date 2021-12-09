const { application } = require('express');
const inquirer = require('inquirer');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const cTable = require('console.table');

function viewAllEmployees() {
    async function getInfo() {
        let queryUrl = 'http://localhost:3001/api/employee';
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

function addEmployee() {}

function removeEmployee () {}

function updateRole() {}

module.exports = {
    viewAllEmployees,
    addEmployee,
    removeEmployee,
    updateRole
};