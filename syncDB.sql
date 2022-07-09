select 'Dropping the transactions table if it exists already' AS '';
DROP TABLE IF EXISTS transactions;

CREATE TABLE IF NOT EXISTS transactions
  (
    timestamp        INT,
    transaction_type VARCHAR(10),
    token            VARCHAR(10),
    amount           REAL
);
select 're-created the transactions table' AS '';

select 'Syncing the contents from transactions.csv to db' AS '';
select 'Buckle up; it might take a while' AS '';
.import --csv --skip 1 ./transactions.csv transactions
select 'Yaay, the sync is complete' AS '';
