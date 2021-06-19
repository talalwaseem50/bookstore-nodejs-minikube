module.exports = (sequelize, Sequelize) => {
    const Book_Author = sequelize.define("Book_Authors", {
    bookId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'Books', 
           key: 'id',
        },
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING(30),
        notNull: true,
        primaryKey: true
    },
    });
  
    return Book_Author;
  };    