# Portfolio Tracker

CLI tool to keep track of your crypto portfolio. Allows users to show the overview of portfolio and filter by specific date or token or both.

## Project Setup

You'll need to have nodejs installed on your system beforehand.

Node.js installation guide: https://www.digitalocean.com/community/tutorial_series/how-to-install-node-js-and-create-a-local-development-environment

Once installed,

Clone the project.

```shell
git clone git@github.com:hussu010/Portfolio-Tracker-NodeJS.git
```

Navigate to the project directory.

Install the required packages.

```shell
npm install
```

Download and extract `transactions.csv file from https://s3-ap-southeast-1.amazonaws.com/static.propine.com/transactions.csv.zip

Copy the file to the root of the project.

Run the project.

```shell
node index.js
```

## Available Commands

`node index.js help`

Lists all the commands available on the script.

`node index.js overview`

Shows the overview of the entire portfolio.

`node index.js filter --token=BTC --date=2019-10-25`

Filter the portfolio by token, date or both.

## Project Structure

`/src` directory lists all the commands available and related functionalities.

`/utils` directory holds all the repeated logics supporting the commands.

`index.js` handles the app startup.

## Resources used

https://codeburst.io/build-a-command-line-interface-cli-application-with-node-js-59becec90e28 for building command line tools with nodejs.

Stackoverflow and other resources found on Google.
