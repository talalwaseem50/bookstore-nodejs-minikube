module.exports = (sequelize, Sequelize) => {
    const Subscription = sequelize.define("Subscriptions", {
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
    });
  
    return Subscription;
};    