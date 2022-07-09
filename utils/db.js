const db = require("../config/db");

const getAllTransactions = async () => {
  return new Promise((resolve, reject) => {
    db.all(`select * from transactions`, [], (err, rows) => {
      if (err) reject(err); // I assume this is how an error is thrown with your db callback
      resolve(rows);
    });
  });
};

const getTransactionsByToken = async (token) => {
  return new Promise((resolve, reject) => {
    db.all(`select * from transactions where token=?`, [token], (err, rows) => {
      if (err) reject(err); // I assume this is how an error is thrown with your db callback
      resolve(rows);
    });
  });
};

const getTransactionsBetweenTimestamp = async (date) => {
  const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
  const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;
  return new Promise((resolve, reject) => {
    db.all(
      `select * from transactions where timestamp between ? and ?`,
      [startOfTheDayInEpoch, endOfTheDayInEpoch],
      (err, rows) => {
        if (err) reject(err); // I assume this is how an error is thrown with your db callback
        resolve(rows);
      }
    );
  });
};

const getTransactionsByTokenAndDate = async (token, date) => {
  const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
  const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;
  return new Promise((resolve, reject) => {
    db.all(
      `select * from transactions where timestamp between ? and ? and token=?`,
      [startOfTheDayInEpoch, endOfTheDayInEpoch, token],
      (err, rows) => {
        if (err) reject(err); // I assume this is how an error is thrown with your db callback
        resolve(rows);
      }
    );
  });
};
module.exports = {
  getAllTransactions,
  getTransactionsByToken,
  getTransactionsBetweenTimestamp,
  getTransactionsByTokenAndDate,
};
