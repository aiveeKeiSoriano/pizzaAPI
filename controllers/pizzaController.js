const mongoose = require("mongoose");
const Pizza = require("../models/pizza")

const listPizza = async (ingredients) => {
    let pizzas = await Pizza.find()
    let checkPizza = (pizza) => {
        for (let i = 0; i < ingredients.length; i++) {
            if (!pizza.ingredients.includes(ingredients[i])) {
                return false
            }
        }
        return true
    }
    return pizzas.filter(pizza => checkPizza(pizza))
}

const addNewPizza = async (pizza) => {
    let newPizza = new Pizza(pizza)
    try {
        newPizza.save()
        return {message: "Added Successfully"}
    }
    catch (e) {
        return {Error: e.message}
    }
}

module.exports = {
    listPizza,
    addNewPizza
}