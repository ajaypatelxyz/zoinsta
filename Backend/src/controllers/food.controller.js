const foodModel = require('../model/food.model');
const likeModel = require('../model/like.model');
const saveModel = require('../model/save.model');
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

const likeFood = async(req, res) => {

    const {foodId} = req.body;
    const user = req.user;

    const isAlreadyLike = await likeModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isAlreadyLike){
        await likeModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: {likeCount: -1}
        })

        return res.status(200).json({
            message: "Food unlike successfully"
        })
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId,
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: {likeCount: 1}
    })

    res.status(201).json({
        message: "Food like successfully",
        like
    })

}

const saveFood = async(req, res) => {

    const {foodId} = req.body;
    const user = req.user

    const isAlreadySave = await saveModel.findOne({
        user: user._id,
        food: foodId
    })

    if(isAlreadySave){

        await saveModel.deleteOne({
            user: user._id,
            food: foodId
        })

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: {saveCount: -1}
        })

        return res.status(200).json({
            message: "Food unsave successfully"
        })

    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId
    })

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: {saveCount: 1}
    })

    return res.status(201).json({
        message: "Food save successfully",
        save
    })

}

module.exports = {
    createFood,
    getFoodItems,
    likeFood
}