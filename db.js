const fs = require("fs");
const sqlite3 = require("sqlite3").verbose();
const filepath = "./transactions.db";

function connectToDatabase() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
      console.log("Connected to the database successfully");
    });
    return db;
  }
}

function createTable(db) {
  db.exec(`
  CREATE TABLE transactions
  (
    timestamp        INT,
    transaction_type VARCHAR(10),
    token            VARCHAR(50),
    amount           REAL
  )
`);
  console.log("Created transactions table to store transaction data..");
}

module.exports = connectToDatabase();
