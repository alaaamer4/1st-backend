const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routers/genres");
const customers = require('./routers/customers')
const home = require("./routers/home");
const app = express();

mongoose
  .connect("mongodb://localhost/vidly", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to vidly db"));

app.use(express.json());
app.use("/", home);
app.use("/genres", genres);
app.use("/customers", customers)
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`conected to port ${PORT}`));