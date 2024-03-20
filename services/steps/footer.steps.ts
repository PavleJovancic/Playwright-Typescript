import {Page, expect } from "@playwright/test";
import Footer from "../pages/footer.page";
import Login from "../pages/login.page";
import LoginSteps from "../steps/login.steps";
import * as loginData from "../../test-data/loginInformation.json";
import * as urls from "../../test-data/urls.json";

export default class FooterSteps{
    private page: Page;
    private footer: Footer;
    private login: Login;
    private loginSteps: LoginSteps;

    constructor(page: Page, footer: Footer, login: Login, loginSteps: LoginSteps){
        this.page = page;
        this.footer = footer;
        this.login = login;
        this.loginSteps = loginSteps;
    };


    async openLinkedinLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getLinkedIn().click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(urls.linkedin);
        await this.closeTab();
    };

    async openYoutubeLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getYoutube().click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(urls.youtube);
        await this.closeTab();
    };

    async openSpotifyLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getSpotify().click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(urls.spotify);
        await this.closeTab();
    };

    async openInstagramLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getInstagram().click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(urls.instagram);
        await this.closeTab();
    };

    async openFacebookLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getFacebook().click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(urls.facebook);
        await this.closeTab();
    };

    async closeTab(){
        let allpages = this.page.context().pages();
        await allpages[1].close();
    };

    async openHomeLink(){
        await this.footer.getHomeLink().click();
        await this.verifyCorrectPage(urls.home);
    };

    async openUIPlaygroundLink(){
        await this.footer.getUIPlaygroundLink().click();
        await this.verifyCorrectPage(urls.uiPlayground);
    };

    async openShopExampleLink(){
        await this.footer.getShopExampleLink().click();
        await this.verifyCorrectPage(urls.shopExample);
    };

    async openAPITrainingLink(){
        await this.footer.getAPITrainingLink().click();
        await this.loginSteps.login(loginData.superadminEmail, loginData.superadminPassword);
        await this.verifyCorrectPage(urls.apiTraining);
    };

    async openTestingPageLink(){
        await this.footer.getTestingPageLink().click();
        await this.verifyCorrectPage(urls.login);
    };

    async openWhiteboardLink(){
        await this.footer.getWhiteboardLink().click();
        await this.verifyCorrectPage(urls.whiteboard);
    };

    async verifyCorrectPage(url){
        await expect(this.page).toHaveURL(url);
    };

}; 