const mongoose = require('mongoose');


const foodPartnerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    contactName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: Number,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})


const foodPartnerModel = mongoose.model("foodpartner", foodPartnerSchema);

module.exports = foodPartnerModel;