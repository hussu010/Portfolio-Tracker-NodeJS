const db = require("../db");

const getAllTransactionsFromDB = async () => {
  return new Promise((resolve, reject) => {
    db.all(`select * from transactions`, [], (err, rows) => {
      if (err) reject(err); // I assume this is how an error is thrown with your db callback
      resolve(rows);
    });
  });
};

module.exports = {
  getAllTransactionsFromDB,
};
