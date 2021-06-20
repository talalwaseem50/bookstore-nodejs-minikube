module.exports = {
    HOST: process.env.BOOKSTORE_DB_URL,
    USER: process.env.BOOKSTORE_DB_USER,
    PASSWORD: "toor",
    DB: BOOKSTORE_DB,
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };   