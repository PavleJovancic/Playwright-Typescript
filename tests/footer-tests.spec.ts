import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Footer from '../services/pages/footer.page';
import FooterSteps from '../services/steps/footer.steps';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';
import Header from '../services/pages/header.page';
import HeaderSteps from '../services/steps/header.steps';



test.describe("Footer @footer", () => {
    let login: Login,
        loginSteps: LoginSteps,
        footer: Footer,
        footerSteps: FooterSteps,
        header: Header,
        headerSteps: HeaderSteps;
        
    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
        footer = new Footer(page);
        footerSteps = new FooterSteps(page, footer, login, loginSteps);
        header = new Header(page);
        headerSteps = new HeaderSteps(page, header, login, loginSteps);
       

        await page.goto(urls.login, {waitUntil: 'domcontentloaded'});
        await loginSteps.login(loginData.email, loginData.password);
        await headerSteps.clickLogo();
        await page.waitForTimeout(2000)
        //Flaky works 70%, if not just click END manually
        await page.keyboard.press('End');
        await page.keyboard.press('End');
    });

    test("Social links check @socials", async () => {
        await footerSteps.openLinkedinLink();
        await footerSteps.openYoutubeLink();
        await footerSteps.openSpotifyLink();
        await footerSteps.openInstagramLink();
        await footerSteps.openFacebookLink();
    });

    test("Footer UIPlayground link @footerUIPlayground", async () => {
        await footerSteps.openUIPlaygroundLink();
    });

    test("Footer Shop Example link @footerShop", async () => {
        await footerSteps.openShopExampleLink();
    });

    test("Footer API Training link @footerAPITraining", async () => {
        await footerSteps.openAPITrainingLink();
    });   

    test("Footer Testing Page link @footerTestingPage", async () => {
        await footerSteps.openWhiteboardLink();
    });

    test("Footer Whiteboard link @footerWhiteboard", async () => {
        await footerSteps.openTestingPageLink();
    });

    test("Email link check @email", async () => {
        await footerSteps.verifyEmail();
    });
    
});