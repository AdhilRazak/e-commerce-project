const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImage: {
        type: Array,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    write: {
        type: String,
        required: true
    },
    prices: {
        type: Number,
        required: true
    },
    discount: {
        type: Number,
        required: true
    },
    stock: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    subCategory: {
        type: String,
    },
    deliveryDate: {
        type: String,
        required: true
    },
    size: {
        type: String,
    },
    color: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: false,
        required: true
    },
    discounted: {
        type: Number
    }

});

const ProductData = mongoose.model('ProductData', productSchema);

module.exports = ProductData;
