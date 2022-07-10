const db = require("../config/db");

const getAllTransactions = async () => {
  var totalTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    db.each(
      `select * from transactions`,
      [],
      (err, transaction) => {
        if (err) reject(err); // I assume this is how an error is thrown with your db callback

        const { transaction_type, token, amount } = transaction;

        if (transaction_type == "DEPOSIT") {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) + parseFloat(amount);
        } else {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) - parseFloat(amount);
        }
      },
      (error, numberOfRows) => {
        resolve(totalTokenNameAmount);
      }
    );
  });
};

const getTransactionsByToken = async (token) => {
  var totalTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    db.each(
      `select * from transactions where token=?`,
      [token],
      (err, transaction) => {
        if (err) reject(err); // I assume this is how an error is thrown with your db callback

        const { transaction_type, token, amount } = transaction;

        if (transaction_type == "DEPOSIT") {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) + parseFloat(amount);
        } else {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) - parseFloat(amount);
        }
      },
      (err, numberOfRows) => {
        if (err) reject(err);
        resolve(totalTokenNameAmount);
      }
    );
  });
};

const getTransactionsBetweenTimestamp = async (date) => {
  const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
  const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;
  var totalTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    db.each(
      `select * from transactions where timestamp between ? and ?`,
      [startOfTheDayInEpoch, endOfTheDayInEpoch],
      (err, transaction) => {
        if (err) reject(err); // I assume this is how an error is thrown with your db callback

        const { transaction_type, token, amount } = transaction;

        if (transaction_type == "DEPOSIT") {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) + parseFloat(amount);
        } else {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) - parseFloat(amount);
        }
      },
      (err, numberOfRows) => {
        if (err) reject(err);
        resolve(totalTokenNameAmount);
      }
    );
  });
};

const getTransactionsByTokenAndDate = async (token, date) => {
  const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
  const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;
  var totalTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    db.each(
      `select * from transactions where timestamp between ? and ? and token=?`,
      [startOfTheDayInEpoch, endOfTheDayInEpoch, token],
      (err, transaction) => {
        if (err) reject(err); // I assume this is how an error is thrown with your db callback

        const { transaction_type, token, amount } = transaction;

        if (transaction_type == "DEPOSIT") {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) + parseFloat(amount);
        } else {
          totalTokenNameAmount[token] =
            (totalTokenNameAmount[token] || 0) - parseFloat(amount);
        }
      },
      (err, numberOfRows) => {
        if (err) reject(err);
        resolve(totalTokenNameAmount);
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
