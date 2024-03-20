import { test } from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Header from '../services/pages/header.page';
import HeaderSteps from '../services/steps/header.steps';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';



test.describe("Header tests @header", () => {
    let login: Login,
        loginSteps: LoginSteps,
        header: Header,
        headerSteps: HeaderSteps;
        
    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
        header = new Header(page);
        headerSteps = new HeaderSteps(page, header, login, loginSteps);
       
        await page.goto(urls.login);
        await loginSteps.login(loginData.email, loginData.password);
    });

    test("UI Playground link check @headerUIPlayground", async () => {
        await headerSteps.openUIPlayground();
    });

    test("Shop Example link check @headerShop", async () => {
        await headerSteps.openShopExample();
    });

    test("API Training link check @headerAPITraining", async () => {
        await headerSteps.openAPITraining();
    });

    test("White Board link check @headerWhiteboard", async () => {
        await headerSteps.openWhiteboard();
    });

    test("Testing Page link check @headerTestingPage", async () => {
        await headerSteps.openTestingPage();
    });

    test("Logout user @logout", async () => {
        await headerSteps.logout();
    });

});