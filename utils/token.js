const axios = require("axios");

const cryptoCompareBaseUrl =
  "https://min-api.cryptocompare.com/data/price?tsyms=USD&fsym=";

const fetchTokenCurrentValue = async (token) => {
  try {
    const response = await axios.get(`${cryptoCompareBaseUrl}${token}`);
    if (response.status === 200) {
      return response.data.USD;
    }
  } catch (error) {
    console.error(error);
  }
};

const calculateTokenAmountFromTransactions = (transactionData) => {
  var totalTokenNameAmount = {};

  transactionData.forEach((transaction) => {
    const { timestamp, transaction_type, token, amount } = transaction;
    const floatAmount = parseFloat(amount);

    if (transaction_type == "DEPOSIT") {
      totalTokenNameAmount[token] =
        (totalTokenNameAmount[token] || floatAmount) + floatAmount;
    } else {
      totalTokenNameAmount[token] =
        (totalTokenNameAmount[token] || floatAmount) - floatAmount;
    }
  });

  return totalTokenNameAmount;
};

const calculatePortfolioValueFromTokenDict = async (
  totalTokenNameAmountDict
) => {
  var portfolioValueInUSD = 0;

  for (let tokenName in totalTokenNameAmountDict) {
    const totalAmountOfToken = totalTokenNameAmountDict[tokenName];
    const currentValueOfToken = await fetchTokenCurrentValue(tokenName);
    const valueOfTokenInPortfolio = currentValueOfToken * totalAmountOfToken;
    console.log(`Current value of ${tokenName} is ${valueOfTokenInPortfolio}`);
    portfolioValueInUSD += valueOfTokenInPortfolio;
  }

  return portfolioValueInUSD;
};

module.exports = {
  fetchTokenCurrentValue,
  calculateTokenAmountFromTransactions,
  calculatePortfolioValueFromTokenDict,
};
