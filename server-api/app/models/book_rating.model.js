module.exports = (sequelize, Sequelize) => {
    const Book_Rating = sequelize.define("Book_Ratings", {
    bookId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'Books', 
           key: 'id',
        },
        primaryKey: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'Users', 
           key: 'id',
        },
        primaryKey: true
    },
    review: {
        type: Sequelize.STRING(500),
        notNull: true
    },
    rating: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    review_date: {
        type: Sequelize.DATE,
        notNull: true
      },
    });
  
    return Book_Rating;
};    