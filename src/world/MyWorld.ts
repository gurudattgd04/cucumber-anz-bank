import {World} from "@cucumber/cucumber";

const importCwd = require("import-cwd");
import {Browser, Page} from "puppeteer";
import * as puppeteer from "puppeteer";
import {ElementHandle} from "puppeteer";

// @ts-ignore
const {setWorldConstructor} = importCwd("@cucumber/cucumber");

export class MyWorld implements World {
    page: Page;
    browser: Browser;
    element: ElementHandle;
    readonly options: any;
    //readonly attach: Function;
    parameters: any;

    constructor(options: any){
        this.options = options;
        this.parameters = options.parameters;
        console.log("Message from Myworld");
    }
    async initializeBrowser():Promise<Browser>{
        this.browser = await puppeteer.launch(
            {
                headless: true,
                defaultViewport: null,
                args:['--start-maximized'],
                timeout: 50000
            }
        )
        const pages = await this.browser.pages();
        this.page = await pages[0];
        await this.page.setDefaultTimeout(50000);
        await this.page.setDefaultNavigationTimeout(50000);
        await this.page.goto(this.parameters.appUrl);
        await this.page.waitForSelector("#secondary");
        console.log("done");
        return this.browser;
    }

    async tearDownBrowser(){
      await this.page.close();
      await this.browser.close();
    }

    [key: string]: any;

    attach(data: Buffer  | string, mediaType: string | undefined, callback: (() => void) | undefined): void | Promise<void> {
        return undefined;
    }

    log(text: string): void | Promise<void> {
        return undefined;
    }
}

setWorldConstructor(MyWorld);