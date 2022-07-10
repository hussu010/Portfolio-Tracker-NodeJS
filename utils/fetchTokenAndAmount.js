const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { calculateTokenAmountFromTransactions } = require("./token");

const getAllTransactions = () => {
  const readTransactionsStream = fs.createReadStream(
    path.resolve(__dirname, "../transactions_copy.csv")
  );

  var tokenNameAmount = {};
  var allTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    readTransactionsStream
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (data) => {
        allTokenNameAmount = calculateTokenAmountFromTransactions(
          tokenNameAmount,
          data
        );
      })
      .on("end", () => {
        resolve(allTokenNameAmount);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const getTransactionsByToken = (token) => {
  const readTransactionsStream = fs.createReadStream(
    path.resolve(__dirname, "../transactions_copy.csv")
  );

  var tokenNameAmount = {};
  var allTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    readTransactionsStream
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (data) => {
        const symbol = data[2];
        if (symbol === token)
          allTokenNameAmount = calculateTokenAmountFromTransactions(
            tokenNameAmount,
            data
          );
      })
      .on("end", () => {
        resolve(allTokenNameAmount);
      })
      .on("error", (error) => {
        reject(error);
      });
  });
};

const getTransactionsBetweenTimestamp = (date) => {
  const readTransactionsStream = fs.createReadStream(
    path.resolve(__dirname, "../transactions_copy.csv")
  );

  const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
  const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;

  var tokenNameAmount = {};
  var allTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    readTransactionsStream
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (data) => {
        const timestamp = data[0];
        if (timestamp <= endOfTheDayInEpoch) {
          allTokenNameAmount = calculateTokenAmountFromTransactions(
            tokenNameAmount,
            data
          );
        }
        if (timestamp <= startOfTheDayInEpoch) {
          resolve(allTokenNameAmount);
          readTransactionsStream.destroy();
        }
      })
      .on("end", () => {
        resolve(allTokenNameAmount);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

const getTransactionsByTokenAndDate = (token, date) => {
  const readTransactionsStream = fs.createReadStream(
    path.resolve(__dirname, "../transactions_copy.csv")
  );

  const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
  const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;

  var tokenNameAmount = {};
  var allTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    readTransactionsStream
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (data) => {
        const timestamp = data[0];
        const symbol = data[2];
        if (timestamp <= endOfTheDayInEpoch && token === symbol) {
          allTokenNameAmount = calculateTokenAmountFromTransactions(
            tokenNameAmount,
            data
          );
        }
        if (timestamp <= startOfTheDayInEpoch) {
          resolve(allTokenNameAmount);
          readTransactionsStream.destroy();
        }
      })
      .on("end", () => {
        resolve(allTokenNameAmount);
      })
      .on("error", (err) => {
        reject(err);
      });
  });
};

module.exports = {
  getAllTransactions,
  getTransactionsByToken,
  getTransactionsBetweenTimestamp,
  getTransactionsByTokenAndDate,
};
