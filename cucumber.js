module.exports = {
    default: `--require-module ts-node/register --require src/step-definitions/**/*.ts --require src/hooks/**/*.ts --require src/world/*.ts --format @cucumber/pretty-formatter --format message:target/cucumber.ndjson --format html:target/cucumber.html --world-parameters '{\"appUrl\":\"https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/\"}`
};