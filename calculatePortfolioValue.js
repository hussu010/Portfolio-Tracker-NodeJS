const transactionData = require("./readCSV");
const {
  fetchTokenCurrentValue,
  calculateTokenAmountFromTransactions,
  calculatePortfolioValueFromTokenDict,
} = require("./utils");

const portfolioValueAll = async () => {
  const totalTokenNameAmountDict = calculateTokenAmountFromTransactions(
    transactionData.default
  );

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );
  return portfolioValue;
};

const portfolioValuebyToken = async (token) => {
  const filteredTransaction = transactionData.default.filter((transaction) => {
    const symbol = transaction[2];
    return symbol === token;
  });
  const totalTokenNameAmountDict =
    calculateTokenAmountFromTransactions(filteredTransaction);

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );
  return portfolioValue;
};

const portfolioValuebyDate = {};

const portfolioValuebyTokenAndDate = {};

module.exports = {
  portfolioValueAll,
  portfolioValuebyToken,
  portfolioValuebyDate,
  portfolioValuebyTokenAndDate,
};
