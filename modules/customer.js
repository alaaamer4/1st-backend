const mongoose = require("mongoose");
const Joi = require("joi");

const validateCustomers = (customer) => {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(customer, schema);
};

const Customer = mongoose.model(
    "Customer",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
        },
        photo: Number,
        isGold: Boolean
    })
);

exports.Customer = Customer;
exports.validateCustomers = validateCustomers;