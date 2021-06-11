const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.get("/", async (req, res) => {
  let orders = await orderController.listAllOrders();
  res.send(orders);
});

router.get("/:id", async (req, res) => {
  let order = await orderController.findOrder(req.params.id);
  res.send(order);
});

router.post("/", async (req, res) => {
  let order = req.body;
  let response = await orderController.addNewOrder(order);
  res.send(response);
});

module.exports = router;
