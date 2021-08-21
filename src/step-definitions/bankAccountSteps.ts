//import { assert } from 'chai';
import * as importCwd from "import-cwd";
import {MyWorld} from "../world/MyWorld";
import {DataTable} from "cucumber/lib";

// @ts-ignore
const {Given, When} = importCwd("@cucumber/cucumber");

Given("A bank account with starting balance of {string}", async function (this:MyWorld, amount: string) {
    console.log("Given amount is: " + amount);
} );

When("I have below data:", async function (this:MyWorld, tableData: DataTable)
{
console.log(tableData)
    const test = tableData.raw().map((row) => row[0])
    const rows = tableData.rows()
    const rowHash = tableData.hashes()
    const arr = ['test','test1','test2']
    console.log(arr)
    console.log(arr.join(' '))
    console.log(rows)
})

When("{string} is deposited", async function (this:MyWorld, amount: string) {
} );
