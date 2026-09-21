const foodModel = require('../model/food.model');
const {uploadFile} = require('../services/storage.service')


const createFood = async(req, res) => {

    const result = await uploadFile(req.file.buffer)
    // console.log(result)
    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: result.url,
        foodPartner: req.foodPartner._id
    })

    res.status(201).json({
        message: "Food create successfully",
        food: foodItem
    })

}

const getFoodItems = async(req, res) => {

    const food = await foodModel.find();

    res.status(200).json({
        message: "All food fetch successfully",
        food
    })

}

module.exports = {
    createFood,
    getFoodItems
}