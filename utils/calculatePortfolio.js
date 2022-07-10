const { calculatePortfolioValueFromTokenDict } = require("./token");

const { getTotalTokenNameAmountDict } = require("./fetchTokenAndAmount");

const getPortfolioValue = async ({ token, date } = {}) => {
  const totalTokenNameAmountDict = await getTotalTokenNameAmountDict({
    token: token,
    date: date,
  });

  const portfolioValue = await calculatePortfolioValueFromTokenDict(
    totalTokenNameAmountDict
  );

  return portfolioValue;
};

module.exports = {
  getPortfolioValue,
};
