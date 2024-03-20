import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';

test.describe("Login tests @login", () => {
    let login: Login,
        loginSteps: LoginSteps;
        

    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
    
        await page.goto(urls.login, {waitUntil: 'networkidle'});
    });


    test("Login validation @validLogin", async () => {
        await loginSteps.enterEmail(loginData.email);
        await loginSteps.enterPassword(loginData.password);
        await loginSteps.showHidePassword();
        await loginSteps.checkRememberMe();
        await loginSteps.clickLoginButton();
    });

    test("Forgot password functionality @forgotPassword", async () => {
        await loginSteps.forgotPassword();
    });

    test("Login validation check when password input field is blank @blankPassword", async () => {
        await loginSteps.login(loginData.email, loginData.blankPassword);
        await loginSteps.validateMessage(loginData.loginFailedMessage);
    });

    test("Login validation check when Email input field is blank @blankEmail", async () => {
        await loginSteps.login(loginData.blankEmail, loginData.password);
        await loginSteps.validateMessage(loginData.loginFailedMessage);
    });

    test("Login validation check with invalid Email @invalidEmail", async () => {
        await loginSteps.login(loginData.invalidEmail, loginData.password);
        await loginSteps.validateMessage(loginData.loginFailedMessage);
    });

    test("Check login with invalid password @invalidPassword", async () => {
        await loginSteps.login(loginData.email, loginData.invalidPassword);
        await loginSteps.validateMessage(loginData.loginFailedMessage);
    });

});