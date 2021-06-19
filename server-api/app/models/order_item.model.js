module.exports = (sequelize, Sequelize) => {
    const Order_Item = sequelize.define("Order_Items", {
    orderId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'Orders', 
           key: 'id',
        },
        primaryKey: true
    },
    bookId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'Books', 
           key: 'id',
        },
        primaryKey: true
    },
    quantity: {
        type: Sequelize.INTEGER,
        notNull: true
    },
    pricesoldat: {
        type: Sequelize.STRING,
        notNull: true
    }
    });
  
    return Order_Item;
};    