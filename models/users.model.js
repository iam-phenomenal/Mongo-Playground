const {Schema, model} = require("mongoose")

const Userschema = new Schema({
    username: {type: String, required: true, unique: true},
    address: {}
})