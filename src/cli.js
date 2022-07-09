const minimist = require("minimist");
const chalk = require("chalk");
const { help } = require("./help");
const { filter } = require("./filter");
const { portfolioValueAll } = require("../utils/calculatePortfolio");

const cliCommand = async () => {
  const argsArray = process.argv;
  const args = minimist(argsArray.slice(2));
  let cmd = args._[0] || "help";

  if (args.help || args.h) {
    cmd = "help";
  }

  switch (cmd) {
    case "help":
      help(args);
      break;

    case "overview":
      console.log(`${chalk.greenBright("Portfolio Details")}`);

      const valueOfAllPortfolio = await portfolioValueAll();

      console.log(`Total Balance: $${valueOfAllPortfolio.toFixed(2)}`);
      break;

    case "filter":
      filter();
      break;

    default:
      console.error(
        `"${cmd}" is not a valid command!\nUse node index.js for help`
      );
      break;
  }
};

exports.default = cliCommand();
