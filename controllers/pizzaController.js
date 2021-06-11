const mongoose = require("mongoose");
const Pizza = require("../models/pizza");

const listPizza = async (ingredients) => {
    if (ingredients.length === 0) {
        return await Pizza.find()
    }
  const pizzas = await Pizza.find({ ingredients: { $all: [...ingredients] } });
  return pizzas;
};

const addNewPizza = async (pizza) => {
  let newPizza = new Pizza(pizza);
  try {
    await newPizza.save();
    return { message: "Added Successfully" };
  } catch (e) {
    return { Error: e.message };
  }
};

module.exports = {
  listPizza,
  addNewPizza,
};
