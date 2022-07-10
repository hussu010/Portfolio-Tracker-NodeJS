const minimist = require("minimist");
const chalk = require("chalk");
const { validateDate, validateToken } = require("../utils/commands");
const { getPortfolioValue } = require("../utils/calculatePortfolio");

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
      console.log(
        `${chalk.blue(
          "Buckle up; because of the large datasize it might take a while to process...."
        )}`
      );
      console.log(`${chalk.greenBright("Portfolio Details")}`);

      const valueOfPortfolioOfToken = await getPortfolioValue({ token: token });

      console.log(`Total Balance: $${valueOfPortfolioOfToken.toFixed(2)}`);
    }
  } else if (typeof token == "undefined" && typeof date !== "undefined") {
    if (validateDate(date)) {
      console.log(
        `${chalk.blue(
          "Buckle up; because of the large datasize it might take a while to process...."
        )}`
      );
      console.log(`${chalk.greenBright("Portfolio Details")}`);

      const valueOfPortfolioOnDate = await getPortfolioValue({ date: date });

      console.log(
        `Date: ${date}\nTotal Balance: $${valueOfPortfolioOnDate.toFixed(2)}`
      );
    }
  } else {
    if (validateDate(date) && validateToken(token)) {
      console.log(
        `${chalk.blue(
          "Buckle up; because of the large datasize it might take a while to process...."
        )}`
      );
      console.log(`${chalk.greenBright("Portfolio Details")}`);

      const portfolioValue = await getPortfolioValue({
        token: token,
        date: date,
      });

      console.log(
        `Date: ${date}\nTotal Balance: $${portfolioValue.toFixed(2)}`
      );
    }
  }
};

module.exports = {
  filter,
};
