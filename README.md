# Portfolio Tracker

CLI tool to keep track of your crypto portfolio. Allows users to show the overview of portfolio and filter by specific date or token or both.

## Project Setup

Clone the project.

```shell
git clone git@github.com:hussu010/Portfolio-Tracker-NodeJS.git
```

Navigate to the project directory.

Install the required packages.

```shell
npm install
```

Copy `transactions.csv` file to the root of the project.

Sync the db with contents from `transactions.csv` file.

```shell
sqlite3 transactions.db ".read syncDB.sql"
```

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

`/config` directory has all the files related to core features of the project. Eg: connecting to database

`/src` directory lists all the commands available and related functionalities.

`/utils` directory holds all the repeated logics supporting the commands.

`index.js` handles the app startup.

`syncDB.sql` contains SQL script to sync transactions.csv file to sqlite DB.

## Resources used

https://codeburst.io/build-a-command-line-interface-cli-application-with-node-js-59becec90e28 for building command line tools with nodejs.

https://www.digitalocean.com/community/tutorials/how-to-read-and-write-csv-files-in-node-js-using-node-csv for handling sqlite database with nodejs.

Stackoverflow and other resources found on Google.
