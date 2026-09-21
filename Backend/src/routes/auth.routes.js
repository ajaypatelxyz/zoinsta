const express = require('express');
const authController = require('../controllers/user.controller')

const router = express.Router();

//user router

router.post('/user/register', authController.registerUser)
router.post('/user/login', authController.loginUser)
router.get('/user/logout', authController.logoutUser)

//food-partner router

router.post('/food-partner/register', authController.registerFoodPartner);
router.post('/food-partner/login', authController.loginFoodPartner);
router.get('/food-partner/logout', authController.logoutFoodPartner)

module.exports = router;