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

const calculateTokenAmountFromTransactions = (tokenNameAmount, transaction) => {
  const [timestamp, transaction_type, token, amount] = transaction;

  if (transaction_type === "DEPOSIT") {
    tokenNameAmount[token] = (tokenNameAmount[token] || 0) + parseFloat(amount);
  } else {
    tokenNameAmount[token] = (tokenNameAmount[token] || 0) - parseFloat(amount);
  }
  return tokenNameAmount;
};

const calculatePortfolioValueFromTokenDict = async (
  totalTokenNameAmountDict
) => {
  var portfolioValueInUSD = 0;

  for (let tokenName in totalTokenNameAmountDict) {
    const totalAmountOfToken = totalTokenNameAmountDict[tokenName];
    const currentValueOfToken = await fetchTokenCurrentValue(tokenName);
    const valueOfTokenInPortfolio = currentValueOfToken * totalAmountOfToken;
    console.log(
      `-----------------
Token: ${tokenName}
Amount: ${totalAmountOfToken.toFixed(4)}
Price: $${currentValueOfToken.toFixed(4)}
Balance: $${valueOfTokenInPortfolio.toFixed(2)}\n-----------------`
    );
    portfolioValueInUSD += valueOfTokenInPortfolio;
  }

  return portfolioValueInUSD;
};

module.exports = {
  fetchTokenCurrentValue,
  calculateTokenAmountFromTransactions,
  calculatePortfolioValueFromTokenDict,
};
