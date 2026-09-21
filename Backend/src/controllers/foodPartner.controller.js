const foodPartnerModel = require('../model/foodPartner.model')
const foodModel = require('../model/food.model')

const getFoodPartnerById = async(req, res) => {

    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);

    const foodItemByFoodPartner = await foodModel.find({foodPartner: foodPartnerId});

    if(!foodPartner){
        return res.status(404).json({
            message: "Food partner not found"
        })
    }

    res.status(200).json({
        message: "Food Partner retrived successfully",
        foodPartner: {
            ...foodPartner.toObject(),
            foodItems: foodItemByFoodPartner
        }
    })

}

module.exports = {
    getFoodPartnerById
}