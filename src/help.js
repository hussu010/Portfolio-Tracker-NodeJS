const chalk = require("chalk");

const menus = {
  main: `
${chalk.greenBright("node index.js [command] <options>")}

  ${chalk.blueBright(
    "overview"
  )} ......... show overview of your entire portfolio
  ${chalk.blueBright("filter")} ........... filter the portfolio by params
  ${chalk.blueBright("help")} ............. show help menu for a command
`,

  filter: `
${chalk.greenBright("node index.js filter <options>")}

  --token, -t ....... filter by the token symbol; eg: BTC, XRP, ETH.
  --date, -d ........ filter by the date. ${chalk.red(
    "Required Format: 'YYYY-MM-DD'"
  )}. Eg: "2019-10-25".
`,
};

const help = async (args) => {
  const subCmd = args._[0] === "help" ? args._[1] : args._[0];
  console.log(menus[subCmd] || menus.main);
};

module.exports = {
  help,
};
