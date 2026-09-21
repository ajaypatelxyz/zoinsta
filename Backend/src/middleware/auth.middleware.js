const foodPartnerModel = require('../model/foodPartner.model');
const jwt = require('jsonwebtoken');
const userModel = require('../model/user.model');

const authFoodPartnerMiddleware = async(req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please, Login first"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;

        next();

    }catch(error){

        return res.status(401).json({
            message: "Invalid User"
        })

    }

}

const authUserMiddleware = async(req, res, next) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(401).json({
            message: "Please, login first"
        })
    }

    try{

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        req.user = user;

        next();

    }catch(error){

        return res.status(401).json({
            message: "Invalid User"
        })

    }

}

module.exports = {
    authFoodPartnerMiddleware,
    authUserMiddleware
}