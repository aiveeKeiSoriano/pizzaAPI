const express = require("express");
const morgan = require("morgan");
const mongoose = require("mongoose");

const app = express();
app.use(morgan("dev"));
app.use(express.urlencoded());
app.use(express.json());

const pizzaRouter = require("./routes/pizza");
const orderRouter = require("./routes/orders");

app.use("/api/pizzas", pizzaRouter);
app.use("/api/orders", orderRouter);

mongoose
  .connect("mongodb://127.0.0.1:27017/pizzaAPI", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"));

const PORT = 3001;
app.listen(PORT, () => {
  console.log("server is listening at http://localhost:" + PORT);
});
