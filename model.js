import mongoose from "mongoose";
// const mongoose = require('mongoose')

const dataSchema = mongoose.Schema({
    id: Number,
    first_name: String,
    last_name: String,
    email: String,
    gender: String,
    income: String,
    city: String,
    car: String,
    quote: String,
    phone_price: String
});

const Data = mongoose.model("Data", dataSchema, "data");

export default Data;