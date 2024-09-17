const express = require('express');
const { Op } = require('sequelize');
const bcrypt = require('bcryptjs');
const { setTokenCookie, restoreContractor } = require('../../utils/auth');
const { Contractor } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

const router = express.Router();

router.get('/', (req, res) => {
    const { contractor } = req;
    if (contractor) {
        const safeContractor = {
            id: contractor.id,
            firstName: contractor.firstName,
            lastName: contractor.lastName,
            email: contractor.email,
            companyName: contractor.companyName,
        };
        return res.json({ contractor: safeContractor });
    } else {
        return res.json({ contractor: null });
    }
});

router.post('/', validateLogin, async (req, res, next) => {
    const { credential, password } = req.body;

    const contractor = await Contractor.unscoped().findOne({
        where: {
            [Op.or]: {
                companyName: credential,
                email: credential
            }
        }
    });

    if (!contractor || !bcrypt.compareSync(password, contractor.hashedPassword.toString())) {
        const err = new Error('Login failed');
        err.status = 401;
        err.title = 'Login failed';
        err.errors = { credential: 'The provided credentials were invalid.' };
        return next(err);
    }

    const safeContractor = {
        id: contractor.id,
        firstName: contractor.firstName,
        lastName: contractor.lastName,
        email: contractor.email,
        companyName: contractor.companyName,
    };

    await setTokenCookie(res, safeContractor);

    return res.json({ contractor: safeContractor });
});

router.delete('/', (_req, res) => {
    res.clearCookie('token');
    return res.json({ message: 'success' });
});

module.exports = router;
