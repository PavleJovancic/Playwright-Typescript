import { Page, expect } from "@playwright/test";
import Login from "../pages/login.page";
import * as urls from "../../test-data/urls.json";

export default class LoginSteps{
    private page: Page;
    private loginPage: Login;

    constructor(page: Page, login: Login){
        this.page = page;
        this.loginPage = login;
    };

    async enterEmail(email: string){
        await this.loginPage.getEmailInputField().fill(email);
    };

    async enterPassword(password: string){
        await this.loginPage.getPasswordInputField().fill(password);
    };

    async clickLoginButton(){
        await this.loginPage.getLoginButton().click();
    };

    async login(email: string, password: string){
        await this.enterEmail(email);
        await this.enterPassword(password);
        await this.clickLoginButton();
    };

    async checkRememberMe(){
        await this.loginPage.getRememberMe().check();
        expect(this.loginPage.getRememberMe()).toBeChecked();
    };

    async forgotPassword(){
        await this.loginPage.getForgotPasswordButton().click();
        expect(this.page).toHaveURL(urls.forgotPassword);
    };

    async showHidePassword(){
        expect(await this.loginPage.getPasswordInputField().getAttribute('type')).toBe('password');
        await this.loginPage.getEyeIcon().click();
        expect(await this.loginPage.getPasswordInputField().getAttribute('type')).toBe('text');
        await this.loginPage.getEyeIcon().click();
        expect(await this.loginPage.getPasswordInputField().getAttribute('type')).toBe('password');
    };

    async validateMessage(message: string){
        await expect(this.loginPage.getLoginMessage()).toContainText(message);
    };
    
};