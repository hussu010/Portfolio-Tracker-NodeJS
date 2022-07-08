const {
  fetchTokenCurrentValue,
  calculateTokenAmountFromTransactions,
  calculatePortfolioValueFromTokenDict,
} = require("./utils");

const {
  getAllTransactions,
  getTransactionsByToken,
  getTransactionsBetweenTimestamp,
} = require("./utils/db");

const portfolioValueAll = async () => {
  const allTransactions = await getAllTransactions();
  console.log(allTransactions.length);

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
  const startOfTheDayInEpoch = new Date(date).getTime() / 1000;
  const endOfTheDayInEpoch = startOfTheDayInEpoch + 86400;

  const filteredTransaction = await getTransactionsBetweenTimestamp(
    startOfTheDayInEpoch,
    endOfTheDayInEpoch
  );

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
