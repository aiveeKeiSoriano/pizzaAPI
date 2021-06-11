const mongoose = require('mongoose')

const OrderSchema = new mongoose.Schema({
    pizza: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Pizza',
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
}, {timestamp: true});

const OrderModel = new mongoose.model('Order', OrderSchema)

module.exports = OrderModel