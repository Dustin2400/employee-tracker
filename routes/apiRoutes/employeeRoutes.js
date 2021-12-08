const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

router.get('/', (req, res) => {
    const sql = `SELECT * FROM employee;`;

    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?);`;
    const params = [req.body.first_name, req.body.last_name, req.body.role_id, req.body.manager_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

router.put('/:id', (req, res) => {
    const sql = `UPDATE employee SET role_id = ? WHERE id = ?;`;
    const params = [req.body.role_id, req.params.id];
    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'success',
                data: req.body
            });
        }
    });
});

router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM employee WHERE id = ?`;
    const params = req.params.id;

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Employee not found'
            });
        } else {
            res.json({
                message: 'Employee terminated'
            });
        }
    });
});

module.exports = router;