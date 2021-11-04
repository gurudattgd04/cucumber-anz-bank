import { assert } from 'chai';
import * as importCwd from "import-cwd";
import {MyWorld} from "../world/MyWorld";
import {CalculatorsTools} from "../pages/calculators-tools";
import {DataTable} from "@cucumber/cucumber";

// @ts-ignore
const {When, Then} = importCwd("@cucumber/cucumber");

When("I fill my details with below details:",{timeout: 60 * 1000}, async function (this:MyWorld, details: DataTable) {
    const calcPage = await new CalculatorsTools(this.page);
    await calcPage.fillDetails(await details.rowsHash().ApplicationType,await details.rowsHash().NoOfDependents,
        await details.rowsHash().PropertyType);
});


When("I fill my income with below details:",{timeout: 60 * 1000}, async function (this:MyWorld, income: DataTable){
    const calcPage = await new CalculatorsTools(this.page);
    await calcPage.fillEarnings(await income.rowsHash().Income, await income.rowsHash().OtherIncome);
});

When("I fill my expenses with below details:",{timeout: 60 * 1000}, async function (this:MyWorld, expense: DataTable){
    const calcPage = await new CalculatorsTools(this.page);
    await calcPage.fillExpenses(await expense.rowsHash().LivingExpense, await expense.rowsHash().HomeLoanRepayment,
        await expense.rowsHash().OtherLoanRepayment, await expense.rowsHash().OtherCommitments,
        await expense.rowsHash().CreditLimit);
});

When("I calculate how much borrow amount is", {timeout: 60 * 1000}, async function (this:MyWorld) {
    const calcPage = await new CalculatorsTools(this.page);
    await calcPage.clickBorrowCalculate();
})

Then("the borrow amount should be {string}", {timeout: 180 * 1000}, async function (this:MyWorld, amount: string){
    const calcPage = await new CalculatorsTools(this.page);
    const actualAmount = await calcPage.getBorrowResult(amount);
    assert.equal(actualAmount, amount);
});

When("I click on start over", {timeout: 60*1000}, async function (this:MyWorld)
{
    const calcPage = await new CalculatorsTools(this.page);
    await (await calcPage.startOver()).click();
});

Then("the form should be empty", {timeout: 60*1000}, async function (this:MyWorld){
    const calcPage = await new CalculatorsTools(this.page);
    assert.isTrue(await calcPage.isFieldsEmpty());
});

Then("I should see error message {string}", {timeout: 60*1000}, async function (this:MyWorld, expectedMessage: string){
    const calcPage = await new CalculatorsTools(this.page);
    const actualMessage = await calcPage.getErrorMessage();
    assert.equal(expectedMessage.trim(), actualMessage.trim());
});