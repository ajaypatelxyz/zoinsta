const userModel = require('../model/user.model');
const foodPartnerModel = require('../model/foodPartner.model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async(req, res) => {

    const {fullName, email, password} = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    });

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "User already exists!"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashPassword
    })

    const token = jwt.sign({
        id: user._id,
    }, process.env.JWT_SECRET);

    res.cookie("token", token);

    res.status(201).json({
        message: "User resgister successfully",
        user: {
            id: user._id,
            fullName: user.fullName,
            email: user.email
        }
    })

}

const loginUser = async(req, res) => {

    const {email, password} = req.body;

    const user = await userModel.findOne({
        email
    })

    if(!user){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if(!isValidPassword){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(200).json({
        message: "User login successfully",
        user: {
            id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })

}

const logoutUser = async(req, res) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(200).json({
            message: "User already logout"
        })
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "User logout successfully"
    })

}

const registerFoodPartner = async(req, res) => {

    const {name, contactName, email, phone, address, password} = req.body;

    const isUserAlreadyExists = await foodPartnerModel.findOne({
        email
    })

    if(isUserAlreadyExists){
        return res.status(400).json({
            message: "Food Partner account already exists!"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        contactName,
        email,
        phone,
        address,
        password: hashPassword
    })

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token)

    res.status(201).json({
        message: "Food Partner account create successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            contactName: foodPartner.contactName,
            email: foodPartner.email,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    })

}

const loginFoodPartner = async(req, res) => {

    const {email, password} = req.body;

    const foodPartner = await foodPartnerModel.findOne({
        email
    })

    if(!foodPartner){
        return res.status(400).json({
            message: "Invalid email or password!"
        })
    }

    const isValidPassword = await bcrypt.compare(password, foodPartner.password)

    if(!isValidPassword){
        return res.status(400).json({
            message: "Invalid email or password"
        })
    }

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.JWT_SECRET)

    res.cookie("token", token);

    res.status(200).json({
        message: "Food Partner login successfully",
        foodPartner: {
            id: foodPartner._id,
            name: foodPartner.name,
            contactName: foodPartner.contactName,
            email: foodPartner.email,
            phone: foodPartner.phone,
            address: foodPartner.address
        }
    })

}

const logoutFoodPartner = async(req, res) => {

    const token = req.cookies.token;

    if(!token){
        return res.status(200).json({
            message: "Food Partner already logout"
        })
    }

    res.clearCookie("token");

    res.status(200).json({
        message: "Food Partner logout successfully"
    })

}

const getUserById = async(req, res) => {

    const userId = req.params.id;

    const user = await userModel.findById(userId).select('-password');

    if(!user){
        return res.status(404).json({
            message: "User not found"
        })
    }

    res.status(200).json({
        message: "User retrive successfully",
        user
    })

}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getUserById
}