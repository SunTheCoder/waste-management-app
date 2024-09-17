// routes/index.js
const express = require('express');
const router = express.Router();

// Import all route modules
const employeeRoutes = require('./api/employees');
const contractorRoutes = require('./api/contractors');
const trashRoutes = require('./api/routes');
const contractorSessionRoutes = require('./api/contractorSession'); // Contractor sessions
const userSessionRoutes = require('./api/userSession'); // User sessions

// Use the routes
router.use('/employees', employeeRoutes);
router.use('/contractors', contractorRoutes);
router.use('/routes', trashRoutes);
router.use('/sessions/contractor', contractorSessionRoutes); // Contractor session routes
router.use('/sessions/user', userSessionRoutes); // User session routes

module.exports = router;
