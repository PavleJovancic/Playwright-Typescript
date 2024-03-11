import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Playground from '../services/pages/playground.page';
import ComponentsMenuSteps from '../services/steps/playground.steps/componentsMenu.steps';
import ModalsSteps from '../services/steps/playground.steps/modals.steps';
import * as testData from '../test-data/data.json';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';



test.describe("Test Modals Functionality @modals", () => {
    let login: Login,
        loginSteps: LoginSteps,
        playground: Playground,
        componentsMenuSteps: ComponentsMenuSteps,
        modalsSteps: ModalsSteps;
        

    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
        playground = new Playground(page);
        componentsMenuSteps = new ComponentsMenuSteps(page, playground);
        modalsSteps = new ModalsSteps(page, playground);

        await page.goto(urls.uiPlayground);
        await loginSteps.login(loginData.email, loginData. password);
        componentsMenuSteps.openMenuItem(testData.modals);
    });

    test("Alert button", async () => {
        await componentsMenuSteps.openCard(testData.alertButton);
        await modalsSteps.alertDialog();
        

    });

    test("Confirm button", async ({}) => {
        await componentsMenuSteps.openCard(testData.confirmButton);
        await modalsSteps.confirmDialog(urls.badinSoft);
    });
});