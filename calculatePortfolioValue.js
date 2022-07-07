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

const portfolioValuebyToken = async (token) => {};

const portfolioValuebyDate = {};

const portfolioValuebyTokenAndDate = {};

module.exports = {
  portfolioValueAll,
  portfolioValuebyToken,
  portfolioValuebyDate,
  portfolioValuebyTokenAndDate,
};
