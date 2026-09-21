const express = require('express');
const authMiddleware = require('../middleware/auth.middleware')
const foodController = require('../controllers/food.controller');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

const router = express.Router();


router.post('/', authMiddleware.authFoodPartnerMiddleware, upload.single("video"), foodController.createFood)

router.get('/', authMiddleware.authUserMiddleware, foodController.getFoodItems);

module.exports = router;9148513441