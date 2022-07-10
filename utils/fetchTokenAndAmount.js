const fs = require("fs");
const path = require("path");
const { parse } = require("csv-parse");
const { calculateTokenAmountFromTransactions } = require("./token");

const getTotalTokenNameAmountDict = ({ token, date } = {}) => {
  const readTransactionsStream = fs.createReadStream(
    path.resolve(__dirname, "../transactions.csv")
  );

  var tokenNameAmount = {};
  var allTokenNameAmount = {};

  return new Promise((resolve, reject) => {
    readTransactionsStream
      .pipe(parse({ delimiter: ",", from_line: 2 }))
      .on("data", (data) => {
        if (token && date) {
          const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
          const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;

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
        } else if (token) {
          const symbol = data[2];

          if (symbol === token)
            allTokenNameAmount = calculateTokenAmountFromTransactions(
              tokenNameAmount,
              data
            );
        } else if (date) {
          const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
          const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;

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
        } else {
          allTokenNameAmount = calculateTokenAmountFromTransactions(
            tokenNameAmount,
            data
          );
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
  getTotalTokenNameAmountDict,
};
