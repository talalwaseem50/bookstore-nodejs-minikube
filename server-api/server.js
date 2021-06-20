const express = require("express");
const cors = require("cors");


const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require("./app/models");
db.sequelize.sync();


app.get("/api", (req, res) => {
  res.json({ message: "Bookstore API" });
  console.log('Server up...!');
});


require("./app/routes/book.routes.js")(app);


const PORT = process.env.PORT || 9001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});