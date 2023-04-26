const mongoose = require('mongoose');


//creating the prototye for the PRODUCT(product object)
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    category :{
        type: String,
        lowercase: true,
        enum : ['fruit','vegetable','dairy']
    }
})

const Product = mongoose.model('roduct' ,productSchema);

module.exports = Product;

