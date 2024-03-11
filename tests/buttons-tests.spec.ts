import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Playground from '../services/pages/playground.page';
import ComponentsMenuSteps from '../services/steps/playground.steps/componentsMenu.steps';
import ButtonsSteps from '../services/steps/playground.steps/buttons.steps';
import * as testData from '../test-data/data.json';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';



test.describe("Test Buttons Functionality @buttons", () => {
    let login: Login,
        loginSteps: LoginSteps,
        playground: Playground,
        componentsMenuSteps: ComponentsMenuSteps,
        buttonsSteps: ButtonsSteps;
        

    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
        playground = new Playground(page);
        componentsMenuSteps = new ComponentsMenuSteps(page, playground);
        buttonsSteps = new ButtonsSteps(page, playground);

        await page.goto(urls.uiPlayground);
        await loginSteps.login(loginData.email, loginData. password);
        componentsMenuSteps.openMenuItem(testData.buttons);
    });

    test("Open new tab", async () => {
        await componentsMenuSteps.openCard(testData.openNewTabButton);
        await buttonsSteps.openNewTabAndCheckUrl(urls.badinSoft);
    });

    test("Download PDF", async ({}) => {
        await componentsMenuSteps.openCard(testData.downloadPDF);
        await buttonsSteps.downloadAndComparePDFs();
    });

    test("Mouse hover button", async () => {
        await componentsMenuSteps.openCard(testData.mouseHoverButton);
        await buttonsSteps.hoverOverHoverMeButton();
        await buttonsSteps.isHoverTextVisible();
    });

    test("Open new window button", async ({}) => {
        await componentsMenuSteps.openCard(testData.openNewWindowButton);
        await buttonsSteps.openNewWindowAndCheckUrl(urls.badinSoft);
    });

    test("Show and Hide buttons", async ({}) => {
        await componentsMenuSteps.openCard(testData.showAndHideButtons);
        await buttonsSteps.clickShowButton();
        await buttonsSteps.writeInInputField(testData.textTest);
        await buttonsSteps.clickHideButton();
    });

    test("Upload file button", async ({}) => {
        await componentsMenuSteps.openCard(testData.uploadFileButton);
        await buttonsSteps.uploadFileAndVerify(testData.fileTest);
    });
});