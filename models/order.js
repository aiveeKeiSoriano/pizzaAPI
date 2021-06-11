const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema(
  {
    items: {
      type: [mongoose.SchemaTypes.ObjectId],
      ref: "OrderItem",
      required: true,
    },
  },
  { timestamp: true }
);

const OrderModel = new mongoose.model("Order", OrderSchema);

module.exports = OrderModel;
