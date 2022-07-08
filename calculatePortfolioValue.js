const {
  fetchTokenCurrentValue,
  calculateTokenAmountFromTransactions,
  calculatePortfolioValueFromTokenDict,
} = require("./utils");

const { getAllTransactions, getTransactionsByToken } = require("./utils/db");

const portfolioValueAll = async () => {
  const allTransactions = await getAllTransactions();

  const totalTokenNameAmountDict =
    calculateTokenAmountFromTransactions(allTransactions);

  let portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );

  return portfolioValue;
};

const portfolioValuebyToken = async (token) => {
  const filteredTransaction = await getTransactionsByToken(token);

  const totalTokenNameAmountDict =
    calculateTokenAmountFromTransactions(filteredTransaction);

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );
  return portfolioValue;
};

const portfolioValuebyDate = async (date) => {
  var filteredTransaction = [];
  var foundTransactionHead = false;

  transactionData.default.every((transaction) => {
    const transactionDate = transaction[0];
    const transactionDateObject = new Date(transactionDate * 1000);
    const formattedDate = transactionDateObject.toLocaleDateString();

    if (formattedDate === date) {
      foundTransactionHead = true;
      filteredTransaction.push(transaction);
    }

    if (foundTransactionHead && formattedDate != date) {
      return false;
    }

    return true;
  });

  const totalTokenNameAmountDict =
    calculateTokenAmountFromTransactions(filteredTransaction);

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );
  return portfolioValue;
};

const portfolioValuebyTokenAndDate = {};

module.exports = {
  portfolioValueAll,
  portfolioValuebyToken,
  portfolioValuebyDate,
  portfolioValuebyTokenAndDate,
};
