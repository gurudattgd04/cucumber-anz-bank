const importCwd = require("import-cwd");
import {MyWorld} from "../world/MyWorld";

// @ts-ignore
const {Before, After} = importCwd("@cucumber/cucumber");

Before({timeout: 60 * 1000}, async function(_: MyWorld){
    await this.initializeBrowser();
});

After(async function(_: MyWorld)
{
    await this.tearDownBrowser();
});