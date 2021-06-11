const express = require("express");
const router = express.Router();
const pizzaController = require("../controllers/pizzaController");

router.get("/", async (req, res) => {
  let ingredients = req.query.ingredients?.split(",");
  let pizzas = await pizzaController.listPizza(ingredients || []);
  res.send(pizzas);
});

router.post("/", async (req, res) => {
  let pizza = req.body;
  let response = await pizzaController.addNewPizza(pizza);
  res.send(response);
});

module.exports = router;
