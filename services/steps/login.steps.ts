import { Page, expect } from "@playwright/test";
import Login from "../pages/login.page";

export default class LoginSteps{
    private page: Page;
    private loginPage: Login;

    constructor(page: Page, login: Login){
        this.page = page;
        this.loginPage = login;
    }

    async login(email: string, password: string){
        await this.loginPage.getEmailInputField().fill(email);
        await this.loginPage.getPasswordInputField().fill(password)
        await this.loginPage.getLoginButton().click()
    }
    
}