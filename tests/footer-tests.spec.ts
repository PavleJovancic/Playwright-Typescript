import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Footer from '../services/pages/footer.page';
import FooterSteps from '../services/steps/footer.steps';
import * as testData from '../test-data/data.json';
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
        footerSteps = new FooterSteps(page, footer);
        header = new Header(page);
        headerSteps = new HeaderSteps(page, header);
       

        await page.goto(urls.home, {waitUntil: 'domcontentloaded'});
        await headerSteps.clickLogo()
        await page.keyboard.press('End')
        await page.keyboard.press('End')
        // await loginSteps.login(loginData.email, loginData.password)
        
        
    });

    test("Social links", async () => {
        await footerSteps.openLinkedinLink()
        await footerSteps.openYoutubeLink()
        await footerSteps.openSpotifyLink()
        await footerSteps.openInstagramLink()
        await footerSteps.openFacebookLink()
    });


    test("Footer UIPlayground link", async ({page}) => {
        await footerSteps.openUIPlaygroundLink()
        await loginSteps.login(loginData.email, loginData.password)
        await footerSteps.verifyCorrectPage(urls.uiPlayground, page)
        await footerSteps.openHomeLink()
        await footerSteps.verifyCorrectPage(urls.home, page)
        
    })

    test("Footer Shop Example link", async ({page}) => {
        await footerSteps.openShopExampleLink()
        await footerSteps.verifyCorrectPage(urls.shopExample, page)

    })

    test("Footer API Training link", async ({page}) => {

        await footerSteps.openAPITrainingLink()
        await loginSteps.login(loginData.superadminEmail, loginData.superadminPassword)
        await footerSteps.verifyCorrectPage(urls.apiTraining, page)

    })   

    test("Footer Testing Page link", async ({page}) => {
        await footerSteps.openWhiteboardLink()
        await footerSteps.verifyCorrectPage(urls.whiteboard, page)

    })

    test("Footer Whiteboard link", async ({page}) => {

        await footerSteps.openTestingPageLink()
        await footerSteps.verifyCorrectPage(urls.login, page)
    })
    
})