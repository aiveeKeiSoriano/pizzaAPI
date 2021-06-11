const mongoose = require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
const OrderItem = require("../models/orderItem");
const Order = require("../models/order");
const Pizza = require("../models/pizza");

const listAllOrders = async () => {
  let orders = await Order.find({})
    .populate("items")
    .populate({ path: "items", populate: { path: "pizza" } });
  return orders;
};

const findOrder = async (input) => {
  if (!ObjectId.isValid(input)) return { message: "Order not found" };
  let id = mongoose.mongo.ObjectID(input);
  let order = await Order.findOne({ _id: id }).populate({
    path: "items",
    populate: { path: "pizza" },
  });
  if (!order) {
    return { message: "Order not found" };
  }
  return order;
};

const addNewOrder = async (list) => {
  let orders = [];
  for (let order of list) {
    let pizza = await Pizza.findOne({ name: order.pizza });
    if (!pizza) {
      return { message: "There's no " + order.pizza + " Pizza" };
    }
    orders.push({ pizza: pizza, quantity: order.quantity });
  }
  try {
    let response = await OrderItem.insertMany(orders);
    let order = new Order({ items: response });
    await order.save();
    return order;
  } catch (e) {
    console.log(e);
    return { message: e.message };
  }
};

module.exports = {
  listAllOrders,
  findOrder,
  addNewOrder,
};
