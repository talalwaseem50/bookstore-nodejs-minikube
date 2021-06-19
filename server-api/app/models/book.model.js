module.exports = (sequelize, Sequelize) => {
    const Book = sequelize.define("Books", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      title: {
        type: Sequelize.STRING(30),
        notNull: true
      },
      synopsis: {
        type: Sequelize.STRING(500)
      },
      publisher: {
        type: Sequelize.STRING(20),
        notNull: true
      },
      category: {
        type: Sequelize.STRING(10),
        notNull: true
      },
      date_added: {
        type: Sequelize.DATE,
        notNull: true
      },
      price: {
        type: Sequelize.STRING,
        notNull: true
      },
      stock: {
        type: Sequelize.INTEGER,
        notNull: true
      },
      discount: {
        type: Sequelize.FLOAT,
        notNull: true
      },
      sub_status: {
        type: Sequelize.INTEGER,
        notNull: true
      }
    });
  
    return Book;
  };    