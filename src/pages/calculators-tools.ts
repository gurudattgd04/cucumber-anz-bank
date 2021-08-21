import {ElementHandle, Page} from "puppeteer";


export class CalculatorsTools {
    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async fillDetails(applicationType: string, noOfDependents: string, typeOfProperty: string) {
        await this.page.waitForXPath("//*[@id='q1heading']/../div");
        const sectionList = await this.page.$x("//*[@id='q1heading']/../div");
        const detailsSection = await sectionList[0];
        const appType = await detailsSection.$x(`//ul/li/label[contains(text(),'${applicationType}')]`);
        await appType[0].click();
        const dependents = await detailsSection.$x("//*[@id='q1q2']/..//select");
        await dependents[0].select(`${noOfDependents}`);
        const propertyType = await detailsSection.$x(`//*[@id='q1q3']/../ul//label[contains(text(),'${typeOfProperty}')]`);
        await propertyType[0].click();
    }

    async fillEarnings(mainIncome: string, otherIncome: string) {
        await this.page.waitForXPath("//*[@id='q2heading']/../div");
        const sectionList = await this.page.$x("//*[@id='q2heading']/../div");
        const incomeSection = await sectionList[0];
        const yourIncome = await incomeSection.$x("//*[contains(text(),'Your income (before tax)')]//..//input");
        await yourIncome[0].type(`${mainIncome}`);
        const yourOtherIncome = await incomeSection.$x("//*[contains(text(),'Your other income')]//..//input");
        await yourOtherIncome[0].type(`${otherIncome}`);
    }

    async fillExpenses(livingExpense: string, homeRepayment: string, otherLoanRepayment: string, otherCommitments: string,
                       totalCreditLimits: string) {
        await this.page.waitForXPath("//*[@id='q3heading']/../div");
        const sectionList = await this.page.$x("//*[@id='q3heading']/../div");
        const expenseSection = await sectionList[0];
        const yourIncome = await expenseSection.$x("//*[contains(text(),'Living expenses')]//..//input");
        await yourIncome[0].type(`${livingExpense}`);
        const repayment = await expenseSection.$x("//*[contains(text(),'Current home loan repayments')]//..//input");
        await repayment[0].type(`${homeRepayment}`);
        const loanRepayment = await expenseSection.$x("//*[contains(text(),'Other loan repayments')]//..//input");
        await loanRepayment[0].type(`${otherLoanRepayment}`);
        const otherCommitment = await expenseSection.$x("//*[contains(text(),'Other commitments')]//..//input");
        await otherCommitment[0].type(`${otherCommitments}`);
        const creditLimit = await expenseSection.$x("//*[contains(text(),'Total credit card limits')]//..//input");
        await creditLimit[0].type(`${totalCreditLimits}`);
    }

    async clickBorrowCalculate() {
        await (await this.page.$('#btnBorrowCalculater')).click();
    }

    async getBorrowResult(expectedText: string): Promise<string> {
        const ele = await this.page.waitForSelector("#borrowResultTextAmount");
        let textContent = "";
        textContent = await this.waitForText(10, ele, expectedText);
        return textContent;
    }

    get borrowAmount() {
        return this.page.$("#borrowResultTextAmount");
    }

    async waitForText(seconds: number, element: ElementHandle, expectedText: string): Promise<string> {
        let text;
        await new Promise((resolve, reject) => {
            let interval = setInterval(async () => {
                seconds--;
                text = await element.getProperty("textContent");
                if (seconds <= 0 || await text.jsonValue() === expectedText) {
                    clearInterval(interval);
                    interval = null;
                    resolve();
                }
            }, seconds * 10);
        });
        return await text.jsonValue();
    };

    async startOver(): Promise<ElementHandle> {
        return await this.page.$(".start-over");
    }

    async isFieldsEmpty(): Promise<boolean> {
        await this.page.waitForXPath("//*[@id='q2heading']/../div");
        const sectionList = await this.page.$x("//*[@id='q2heading']/../div");
        const incomeSection = await sectionList[0];
        const yourIncome = await incomeSection.$x("//*[contains(text(),'Your income (before tax)')]//..//input");
        const yourIncomeValue = await (await yourIncome[0].getProperty("textContent")).jsonValue();
        const yourOtherIncome = await incomeSection.$x("//*[contains(text(),'Your other income')]//..//input");
        const yourOtherIncomeValue = await (await yourOtherIncome[0].getProperty("textContent")).jsonValue();
        return (await yourOtherIncomeValue === "" && await yourIncomeValue === "");
    }

    async getErrorMessage():Promise<string> {
        const errorEle = await this.page.waitForSelector(".borrow__error__text");
        const errorMessage = await errorEle.getProperty("textContent");
        return await errorMessage.jsonValue() as string;
    }
}