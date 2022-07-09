const {
  calculateTokenAmountFromTransactions,
  calculatePortfolioValueFromTokenDict,
} = require("./token");

const {
  getAllTransactions,
  getTransactionsByToken,
  getTransactionsBetweenTimestamp,
  getTransactionsByTokenAndDate,
} = require("./db");

const portfolioValueAll = async () => {
  const totalTokenNameAmountDict = await getAllTransactions();

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );

  return portfolioValue;
};

const portfolioValuebyToken = async (token) => {
  const totalTokenNameAmountDict = await getTransactionsByToken(token);

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );
  return portfolioValue;
};

const portfolioValuebyDate = async (date) => {
  const totalTokenNameAmountDict = await getTransactionsBetweenTimestamp(date);

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );

  return portfolioValue;
};

const portfolioValuebyTokenAndDate = async (token, date) => {
  const totalTokenNameAmountDict = await getTransactionsByTokenAndDate(
    token,
    date
  );

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
