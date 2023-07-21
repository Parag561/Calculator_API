const mongoose = require("mongoose");
const CalculationSchema = new mongoose.Schema({
    num1: String,
    num2 : String,
    operation: String,
    result: Number
},
    {
        timestamps: true,
        versionKey: false
    }
);

module.exports = mongoose.model('calculation', CalculationSchema);