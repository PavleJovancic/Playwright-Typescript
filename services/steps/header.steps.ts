import { Page, expect } from "@playwright/test";
import Header from "../pages/header.page";
import Login from "../pages/login.page";
import LoginSteps from "../steps/login.steps";
import * as loginData from "../../test-data/loginInformation.json";
import * as urls from "../../test-data/urls.json";

export default class HeaderSteps{
    private page: Page;
    private header: Header;
    private login: Login;
    private loginSteps: LoginSteps;

    constructor(page: Page, header: Header, login: Login, loginSteps: LoginSteps){
        this.page = page;
        this.header = header;
        this.login = login;
        this.loginSteps = loginSteps;
    };

    async openUIPlayground(){
        await this.header.getUIPlaygroundLink().click();
        await this.verifyCorrectPage(urls.uiPlayground);
    };

    async openShopExample(){
        await this.header.getShopExampleLink().click();
        await this.verifyCorrectPage(urls.shopExample);
    };

    async openAPITraining(){
        await this.header.getAPITrainingLink().click();
        await this.loginSteps.login(loginData.superadminEmail, loginData.superadminPassword);
        await this.verifyCorrectPage(urls.apiTraining);
    };

    async openTestingPage(){
        await this.header.getTestingPageLink().click();
        await this.verifyCorrectPage(urls.login);
    };

    async openWhiteboard(){
        await this.header.getWhiteboardLink().click();
        await this.verifyCorrectPage(urls.whiteboard);
    };

    async openHome(){
        await this.header.getHomeLink().click();
        await this.verifyCorrectPage(urls.home);
    };

    async clickLogo(){
        await this.header.getLogo().click();
        await this.verifyCorrectPage(urls.home);
    };

    async verifyCorrectPage(url: string){
        await expect(this.page).toHaveURL(url);
    };

    async logout(){
        await this.header.getLogoutButton().click();
        await this.verifyCorrectPage(urls.login);
    };

};