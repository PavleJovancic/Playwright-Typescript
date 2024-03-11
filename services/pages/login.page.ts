import {Locator, Page} from '@playwright/test'; 
import * as selectors from '../../selectors.json';

export default class Login{
    private page: Page;

    constructor(page: Page){
        this.page = page
    }

    public getEmailInputField(): Locator{
        return this.page.locator(selectors.login.email)
    }

    public getPasswordInputField(): Locator{
        return this.page.locator(selectors.login.password)
    }

    public getLoginButton(): Locator{
        return this.page.locator(selectors.login.loginButton)
    }
}