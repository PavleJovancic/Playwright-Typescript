import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Header from '../services/pages/header.page';
import HeaderSteps from '../services/steps/header.steps';
import * as testData from '../test-data/data.json';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';
import { verify } from 'crypto';



test.describe("Header @header", () => {
    let login: Login,
        loginSteps: LoginSteps,
        header: Header,
        headerSteps: HeaderSteps;
        

    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
        header = new Header(page);
        headerSteps = new HeaderSteps(page, header);
       

        await page.goto(urls.login);
        await loginSteps.login(loginData.email, loginData.password)
        
    });

    test("Open Navigation bar links", async ({page}) => {
        await headerSteps.openUIPlayground()
        await headerSteps.verifyCorrectPage(urls.uiPlayground, page)

        await headerSteps.clickLogo()
        await headerSteps.verifyCorrectPage(urls.home, page)

        await headerSteps.openShopExample()
        await headerSteps.verifyCorrectPage(urls.shopExample, page)

        await headerSteps.openAPITraining()
        await loginSteps.login(loginData.superadminEmail, loginData.superadminPassword)
        await headerSteps.verifyCorrectPage(urls.apiTraining, page)

        await headerSteps.openHome()
        await headerSteps.verifyCorrectPage(urls.home, page)

        await headerSteps.openWhiteboard()
        await headerSteps.verifyCorrectPage(urls.whiteboard, page)

        await headerSteps.openTestingPage()
        await headerSteps.verifyCorrectPage(urls.login, page)
    });
})