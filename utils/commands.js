const chalk = require("chalk");

const validateDate = (date) => {
  var regEx = /^\d{4}-\d{2}-\d{2}$/;
  if (typeof date !== "string") {
    console.warn(
      `Please use the correct date format.\nRequired format: ${chalk.red(
        "YYYY-MM-DD"
      )}.
        `
    );
    return false;
  }

  if (!date || !date.match(regEx)) {
    console.warn(
      `Please use the correct date format.\nRequired format: ${chalk.red(
        "YYYY-MM-DD"
      )}.
        `
    );
    return false;
  }
  return true;
};

const validateToken = (token) => {
  if (typeof token !== "string") {
    console.warn(
      `You will need to pass token symbol..\neg: ${chalk.greenBright(
        "node index.js filter -t=BTC"
      )}`
    );
    return false;
  }

  if (!token) {
    console.warn(
      `You will need to pass token symbol..\neg: ${chalk.greenBright(
        "node index.js filter -t=BTC"
      )}`
    );
    return false;
  }
  return true;
};
module.exports = {
  validateDate,
  validateToken,
};
