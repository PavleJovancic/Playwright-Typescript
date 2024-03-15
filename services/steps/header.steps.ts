import { Expect, Page, expect } from "@playwright/test";
import Header from "../pages/header.page";
import Login from "../pages/login.page";
import LoginSteps from "./login.steps";

export default class HeaderSteps{
    private page: Page;
    private header: Header;

    constructor(page: Page, header: Header){
        this.page = page;
        this.header = header;
    };

    async openUIPlayground(){

        await this.header.getUIPlaygroundLink().click()

    }

    async openShopExample(){
        await this.header.getShopExampleLink().click()
    }

    async openAPITraining(){
        await this.header.getAPITrainingLink().click()
    }

    async openTestingPage(){
        await this.header.getTestingPageLink().click()
    }

    async openWhiteboard(){
        await this.header.getWhiteboardLink().click()
    }

    async openHome(){
        await this.header.getHomeLink().click()
    }

    async clickLogo(){
        await this.header.getLogo().click()
    }

    async verifyCorrectPage(url, page){
        await expect(page).toHaveURL(url)
    }

    

} 