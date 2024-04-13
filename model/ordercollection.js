const mongoose = require('mongoose')

const order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    orderlist: [{
        productId: [{
            id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'ProductData'
            },
            quantity: {
                type: String
            }

        }],
       
        subtotal: {
            type: String,
        },
        total: {
            type: String,
        },
        address: {
            type: String
        },
        paymentmethod: {
            type: String
        },
        discount: {
            type: String
        },
        coupondiscount: {
            type: String
        },
        status: {
            type: String,
            default: 'pending'
        },
        createdAt: {
            type: Date,
            default: Date.now
        }

    }]


})

const orders = mongoose.model('orders', order)

module.exports = orders