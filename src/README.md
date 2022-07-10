## Overview of what each file does.

### cli.js

Retrieves all the args passed on cmd, analyses them and passes them to their respective functions. If no args specified, returns help command by default and if invalid args passed, responds with error message.

If the argument passed is overview, fetches the portfolio value by calling `portfolioValueAll` from `utils/calculatePortfolio.js`.

If the argument passed is filter, uses components inside `filter.js` for execution.

### filter.js

If the first argument passed is filter, `cli` forwards the execution here.

Checks if the passed sub-args are valid;

if not valid, returns invalid message.

if valid, checks the arguments passed and returns the portfolio value accordingly.

### help.js

Returns the help messages.
