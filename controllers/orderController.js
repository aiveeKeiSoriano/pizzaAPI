const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
const Order = require("../models/order")
const Pizza = require("../models/pizza")

const listAllOrders = async () => {
    let orders = await Order.find({})
    return orders
}

const findOrder = async (input) => {
    if (!ObjectId.isValid(input)) return {message: "Order not found"}
    let id = mongoose.mongo.ObjectID(input)
    let order = await Order.findOne({ _id: id })
    if (!order) {
        return {message: "Order not found"}
    }
    return order
}

const addNewOrder = async ({pizza, quantity}) => {
    let findPizza = Pizza.findOne({ name: pizza })
    if (!findPizza) return { message: "There's no such Pizza" }
    let newOrder = new Order({ pizza: findPizza, quantity: quantity })
    try {
        newOrder.save()
        return {message: "Added Successfully"}
    }
    catch (e) {
        return {Error: e.message}
    }
}

module.exports = {
    listAllOrders,
    findOrder,
    addNewOrder
}