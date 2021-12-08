const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

router.get('/', (req, res) => {
    const sql = `SELECT * FROM role;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const sql = `INSERT INTO role (title, salary, department_id) VALUES (?,?,?);`;
    const params = [req.body.title, req.body.salary, req.body.department_id];

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            result;
        }
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM role WHERE id = ?;`;
    const params = req.params.id;

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Role not found'
            });
        } else {
            res.json({
                message: 'Role deleted'
            });
        }
    });
});

module.exports = router;