select 'Dropping the transactions table if it exists already' AS '';
DROP TABLE IF EXISTS transactions;
CREATE TABLE IF NOT EXISTS transactions (timestamp INT, transaction_type varchar, token varchar, amount real);

select 'Syncing the contents from transactions.csv to db' AS '';
select 'Buckle up; it might take a while' AS ''; 
.separator ","
.import transactions.csv transactions
delete from transactions where rowid IN (select rowid from transactions limit 1);
select 'Yaay, the sync is complete' AS '';
