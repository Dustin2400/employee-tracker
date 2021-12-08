const express = require('express');
const router = express.Router();
const db = require('../../config/connection');

router.get('/', (req, res) => {
    const sql = `SELECT * FROM department;`;
    db.query(sql, (err, result) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

router.post('/', (req, res) => {
    const sql = `INSERT INTO department (name) VALUES (?);`;
    const params = req.body.name;

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: err.message });
            return;
        }
        res.json(result);
    });
});

router.delete('/:id', (req, res) => {
    const sql = `DELETE FROM department WHERE id = ?;`;
    const params = req.params.id;

    db.query(sql, params, (err, result) => {
        if (err) {
            res.status(400).json({ error: res.message });
        } else if (!result.affectedRows) {
            res.json({
                message: 'Department not found'
            });
        } else {
            res.json({
                message: 'Department deleted'
            });
        }
    });
});

module.exports = router;