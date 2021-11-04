module.exports = {
    default: `--require-module ts-node/register --require src/step-definitions/**/*.ts --require src/hooks/**/*.ts --require src/world/*.ts --world-parameters '{\"appUrl\":\"https://www.anz.com.au/personal/home-loans/calculators-tools/much-borrow/\"}`
};