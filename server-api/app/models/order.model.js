module.exports = (sequelize, Sequelize) => {
    const Order = sequelize.define("Orders", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: Sequelize.INTEGER,
        references: {
           model: 'Users', 
           key: 'id',
        }
    },
    order_date: {
        type: Sequelize.DATE,
        notNull: true
    },
    order_status: {
        type: Sequelize.STRING(10),
        notNull: true
    }
    });
  
    return Order;
};    