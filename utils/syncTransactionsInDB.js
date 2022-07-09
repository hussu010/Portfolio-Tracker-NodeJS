// this file contains the script to manually import data into the database.
// Because of the size of the file, and the time required to sync everything,
// decided to use sqlite's .import command instead.

const fs = require("fs");
const { parse } = require("csv-parse");
const db = require("../config/db");

const wipeOutTransactionFromDB = () => {
  db.serialize(function () {
    db.run("DELETE FROM transactions", (error) => {
      if (error) {
        return console.log(error.message);
      }
      console.log(`Wiped out the table transactions..`);
    });
  });
};

const saveTransactionToDB = (transaction) => {
  db.serialize(function () {
    const [timestamp, transactionType, token, amount] = transaction;
    db.run(
      `INSERT INTO transactions VALUES (?, ?, ? , ?)`,
      [timestamp, transactionType, token, amount],
      function (error) {
        if (error) {
          return console.log(error.message);
        }
        console.log(`Inserted a row with the id: ${this.lastID}`);
      }
    );
  });
};

const readAndSyncTransactions = () => {
  var tempArray = [];
  fs.createReadStream("./transactions.csv")
    .pipe(parse({ delimiter: ",", from_line: 2 }))
    .on("data", function (row) {
      saveTransactionToDB(row);
    })
    .on("end", function () {
      console.log("finished");
    })
    .on("error", function (error) {
      console.log(error.message);
    });
};
