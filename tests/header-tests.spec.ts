import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Playground from '../services/pages/playground.page';
import ComponentsMenuSteps from '../services/steps/playground.steps/componentsMenu.steps';
import InputsSteps from '../services/steps/playground.steps/inputs.steps';
import * as testData from '../test-data/data.json';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';



test.describe("Test Inputs Functionality @inputs", () => {
    let login: Login,
        loginSteps: LoginSteps,
        playground: Playground,
        componentsMenuSteps: ComponentsMenuSteps,
        inputsSteps: InputsSteps;
        

    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
        playground = new Playground(page);
        componentsMenuSteps = new ComponentsMenuSteps(page, playground);
        inputsSteps = new InputsSteps(page, playground);

        await page.goto(urls.home);
        await loginSteps.login(loginData.email, loginData. password);
        componentsMenuSteps.openMenuItem(testData.inputs);
    });

    test("", async () => {
        
    });
})