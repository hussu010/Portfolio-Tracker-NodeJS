const {
  calculateTokenAmountFromTransactions,
  calculatePortfolioValueFromTokenDict,
} = require("../utils/token");

const {
  getAllTransactions,
  getTransactionsByToken,
  getTransactionsBetweenTimestamp,
  getTransactionsByTokenAndDate,
} = require("../utils/db");

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
  const filteredTransaction = await getTransactionsBetweenTimestamp(date);

  const totalTokenNameAmountDict =
    calculateTokenAmountFromTransactions(filteredTransaction);

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );

  return portfolioValue;
};

const portfolioValuebyTokenAndDate = async (token, date) => {
  const filteredTransaction = await getTransactionsByTokenAndDate(token, date);

  const totalTokenNameAmountDict =
    calculateTokenAmountFromTransactions(filteredTransaction);

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );

  return portfolioValue;
};

module.exports = {
  portfolioValueAll,
  portfolioValuebyToken,
  portfolioValuebyDate,
  portfolioValuebyTokenAndDate,
};
