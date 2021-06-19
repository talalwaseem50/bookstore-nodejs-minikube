module.exports = (sequelize, Sequelize) => {
    const Book_Genre = sequelize.define("Book_Genres", {
    bookId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'Books', 
           key: 'id',
        },
        primaryKey: true
    },
    genre: {
        type: Sequelize.STRING(20),
        notNull: true,
        primaryKey: true
    },
    });
  
    return Book_Genre;
  };    