module.exports = app => {
    const books = require("../controllers/book.controller.js");
  
    var router = require("express").Router();
  
    router.post("/", books.create);
  
    router.get("/", books.findAll);

    router.get("/:id", books.findOne);

    router.put("/:id", books.update);

    router.delete("/:id", books.delete);

    router.get("/published", books.findAllPublished);

    app.use('/api/books', router);
};    