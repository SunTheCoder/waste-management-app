const express = require('express');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation and verification
const { requireAuth } = require('../../utils/auth'); // Assuming you save your auth middleware here
const { Contractor } = require('../../db/models');
const router = express.Router();


router.get('/', async (req, res, next) => {
    try {
      const contractors = await Contractor.findAll({
              attributes: ['id', 'firstName', 'lastName', 'email', 'companyName', 'password', 'createdAt', 'updatedAt']

      });
  
      // Format the response to include date and time
      const formattedContractors = contractors.map(contractor => {
        const createdAt = new Date(contractor.createdAt);
        const updatedAt = new Date(contractor.updatedAt);
        
        return {
          id: contractor.id,
          firstName: contractor.firstName,
          lastName: contractor.lastName,
          email: contractor.email,
          companyName: contractor.companyName,
          password: contractor.password,   
          createdAt: `${createdAt.toLocaleDateString('en-US')} ${createdAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
          updatedAt: `${updatedAt.toLocaleDateString('en-US')} ${updatedAt.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}`,
        };
      });
  
      res.status(200).json({ contractors: formattedContractors });
    } catch (error) {
      next(error);
    }
  });
  

// Example POST route for adding a contractor
router.post('/', requireAuth, async (req, res, next) => {
    try {
      const { firstName, lastName, email, companyName, password } = req.body;
  
      const errors = {};
      if (!firstName) errors.firstName = 'First name is required';
      if (!lastName) errors.lastName = 'Last name is required';
      if (!email) errors.email = 'Email is required';
      if (!companyName) errors.companyName = 'Company name is required';
      if (!password || password.length < 6) errors.password = 'Password must be at least 6 characters long';
  
      if (Object.keys(errors).length > 0) {
        return res.status(400).json({ message: 'Bad Request', errors });
      }
  
      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create contractor
      const newContractor = await Contractor.create({
        firstName,
        lastName,
        email,
        companyName,
        password: hashedPassword
      });
  
      // Success response
      res.status(201).json({
        message: 'Contractor created successfully',
        contractor: {
          id: newContractor.id,
          firstName: newContractor.firstName,
          lastName: newContractor.lastName,
          email: newContractor.email,
          companyName: newContractor.companyName,
          createdAt: new Date().toLocaleString(),
          updatedAt: new Date().toLocaleString()
        }
      });
    } catch (error) {
      next(error);
    }
  });
  
  module.exports = router;

// Example PUT route for updating contractor data
router.put('/:id', async (req, res) => {
    // logic for updating a contractor
    res.json({ message: 'Contractor updated' });
});

// Example DELETE route for removing a contractor
router.delete('/:id', async (req, res) => {
    // logic for deleting a contractor
    res.json({ message: 'Contractor deleted' });
});

module.exports = router;
