import {Locator, Page} from '@playwright/test'; 
import * as selectors from '../../selectors.json';

export default class Login{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    };

    getEmailInputField(): Locator{
        return this.page.locator(selectors.login.email);
    };

    getPasswordInputField(): Locator{
        return this.page.locator(selectors.login.password);
    };

    getLoginButton(): Locator{
        return this.page.locator(selectors.login.loginButton);
    };

    getForgotPasswordButton(): Locator{
        return this.page.locator(selectors.login.forgotPassword);
    };

    getRememberMe(): Locator{
        return this.page.locator(selectors.login.rememberMe);
    };

    getEyeIcon(): Locator{
        return this.page.locator(selectors.login.eyeIcon);
    };

    getLoginMessage(): Locator{
        return this.page.locator(selectors.login.loginMessage);
    };

};