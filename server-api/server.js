const express = require("express");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://192.168.49.2:31583/"
};

//app.use(cors(corsOptions));
app.use(cors());

// call sysc()
const db = require("./app/models");
db.sequelize.sync();

// simple route
app.get("/api", (req, res) => {
  res.json({ message: "Welcome to bogo node application." });
  console.log('Test');
});

require("./app/routes/book.routes.js")(app);

// set port, listen for requests
const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});