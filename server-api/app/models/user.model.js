module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define("Users", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      fullname: {
        type: Sequelize.STRING(30),
        notNull: true
      },
      gender: {
        type: Sequelize.STRING(1),
        notNull: true
      },
      contactno: {
        type: Sequelize.STRING(13),
        notNull: true
      },
      email_address: {
        type: Sequelize.STRING(30),
        notNull: true
      },
      pass: {
        type: Sequelize.STRING(16),
        notNull: true
      },
      date_joined: {
        type: Sequelize.DATE,
        notNull: true
      },
      shipping_address: {
        type: Sequelize.STRING(50),
        notNull: true
      },
      access_privileges: {
        type: Sequelize.STRING(5),
        notNull: true
      }
    });
  
    return User;
  };    