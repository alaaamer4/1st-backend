const Joi = require("joi");
const mongoose = require("mongoose");


const Genre = mongoose.model(
    "Genre",
    new mongoose.Schema({
        name: {
            type: String,
            required: true,
            minlength: 5,
            maxlength: 300
        },
    })
);


const validateGenres = (genre) => {
    const schema = {
        name: Joi.string().min(3).required(),
    };
    return Joi.validate(genre, schema);
};

exports.Genre = Genre;
exports.validateGenres = validateGenres;