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

module.exports = {
  getAllTransactions,
  getTransactionsByToken,
};
