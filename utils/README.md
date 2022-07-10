## Overview of what each file does.

### calculatePortfolio.js

Uses the functions from `fetchTokenAndAmount.js` to retrieve the dictionary containing token name as key and amount as value. Eg: `{"BTC": 1.2434, "ETH": 2.234}`

Calculates the total value of the all the tokens using `calculatePortfolioValueFromTokenDict` which in turn uses `fetchTokenCurrentValue` to get the current value of token in USD.

Returns functions that returns portfolio value based on required filters. Eg: `portfolioValueAll` returns the value of all portfolio and `getTransactionsByTokenAndDate` returns the portfolio value filtered by date and token.

### commands.js

Holds procedures to check the validity of commands used. Eg: `validateDate` makes sure the date is valid.

### fetchTokenAndAmount.js

Streams the rows of the transactions file one by one, parses it and calls `calculateTokenAmountFromTransactions` function to update the dictionary containing token name as key and amount as value. Returns the dict once every transactions are analyzed or exit condition is triggered.

### token.js

Contains helper functions to fetch token value, calculate token amount from dict and calculate portfolio value from the passed dictionary.
