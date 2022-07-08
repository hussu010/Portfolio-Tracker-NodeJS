DROP TABLE IF EXISTS transactions;

CREATE TABLE IF NOT EXISTS transactions
  (
    timestamp        INT,
    transaction_type VARCHAR(10),
    token            VARCHAR(50),
    amount           REAL
);

.import --csv --skip 1 ./transactions_copy.csv transactions
