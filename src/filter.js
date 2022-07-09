const minimist = require("minimist");
const chalk = require("chalk");
const { validateDate, validateToken } = require("../utils/commands");
const {
  portfolioValuebyToken,
  portfolioValuebyDate,
  portfolioValuebyTokenAndDate,
} = require("../utils/calculatePortfolio");

const filter = async () => {
  const argsArray = process.argv;
  const args = minimist(argsArray.slice(2));
  const token = args.token || args.t;
  const date = args.date || args.d;

  if (typeof token == "undefined" && typeof date == "undefined") {
    console.log(
      `${chalk.red("Errrrrr you need to pass the options.")}
${chalk.greenBright("node index.js filter <options>")}
    --token, -t ....... filter by the token symbol; eg: BTC, XRP, ETH.
    --date, -d ........ filter by the date. ${chalk.red(
      "Required Format: 'YYYY-MM-DD'"
    )}. Eg: "2019-10-25".
    `
    );
  } else if (typeof token !== "undefined" && typeof date == "undefined") {
    if (validateToken(token)) {
      console.log(`${chalk.greenBright("Portfolio Details")}`);

      const valueOfPortfolioOfToken = await portfolioValuebyToken(token);

      console.log(`Current Balance: $${valueOfPortfolioOfToken.toFixed(2)}`);
    }
  } else if (typeof token == "undefined" && typeof date !== "undefined") {
    if (validateDate(date)) {
      console.log(`${chalk.greenBright("Portfolio Details")}`);

      const valueOfPortfolioOnDate = await portfolioValuebyDate(date);

      console.log(
        `Date: ${date}\nCurrent Balance: $${valueOfPortfolioOnDate.toFixed(2)}`
      );
    }
  } else {
    if (validateDate(date) && validateToken(token)) {
      console.log(`${chalk.greenBright("Portfolio Details")}`);

      const portfolioValue = await portfolioValuebyTokenAndDate(token, date);

      console.log(
        `Date: ${date}\nCurrent Balance: $${portfolioValue.toFixed(2)}`
      );
    }
  }
};

module.exports = {
  filter,
};
