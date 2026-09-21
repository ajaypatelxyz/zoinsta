const express = require("express")
const authMiddleware = require('../middleware/auth.middleware')
const foodPartnerController = require('../controllers/foodPartner.controller');

const router = express.Router();


router.get('/:id', authMiddleware.authUserMiddleware, foodPartnerController.getFoodPartnerById)

module.exports = router;