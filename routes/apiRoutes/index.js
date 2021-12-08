const express = require('express');
const router = express.Router();
const departmentRoutes = require('./departmentRoutes.js');
const roleRoutes = require('./roleRoutes.js');
const employeeRoutes = require('./employeeRoutes.js');

router.use('/department', departmentRoutes);
router.use('/role', roleRoutes);
router.use('/employee', employeeRoutes);

module.exports = router;
