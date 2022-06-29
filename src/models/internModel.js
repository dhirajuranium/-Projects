
const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const internSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    mobile: {
        type: String,
        match: /^(\()?\d{3}(\))?(-|\s)?\d{3}(-|\s)\d{4}$/,
        unique: true,
        required: true,
    },
    collegeId:{
           type:ObjectId,
           ref:"college"
    },
    isDeleted: {
        type: Boolean,
        default: false
    },


}, { timestamps: true });

module.exports = mongoose.model("intern", internSchema);