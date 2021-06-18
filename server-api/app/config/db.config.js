module.exports = {
    HOST: process.env.DB_URL,
    USER: "root",
    PASSWORD: "toor",
    DB: "bookstore",
    dialect: "mysql",
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };   