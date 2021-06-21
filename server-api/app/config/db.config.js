module.exports = {
    HOST: process.env.BOOKSTORE_DB_URL,
    USER: process.env.BOOKSTORE_DB_USER || 'root',
    PASSWORD: "toor",
    DB: process.env.BOOKSTORE_DB || 'bookstore',
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };   