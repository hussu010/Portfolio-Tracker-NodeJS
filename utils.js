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

module.exports = { fetchTokenCurrentValue };
