import {expect, test} from '@playwright/test';
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

        await page.goto(urls.uiPlayground);
        await loginSteps.login(loginData.email, loginData. password);
        componentsMenuSteps.openMenuItem(testData.inputs);
    });

    test("Calendar input", async () => {
        await componentsMenuSteps.openCard(testData.calendarInput);
        await inputsSteps.setDate(testData.day,testData.month,testData.year);
    });

    test("Progress bar", async () => {
        await componentsMenuSteps.openCard(testData.progressBar);
        await inputsSteps.startProgress();
    });

    test("Radio buttons", async () => {
        await componentsMenuSteps.openCard(testData.radioButtons);
        await inputsSteps.checkRadioButton('first');
        await inputsSteps.checkRadioButton('second');
        await inputsSteps.checkRadioButton('third');
    });

    test("Checkbox input", async ({page}) => {
        await componentsMenuSteps.openCard(testData.checkboxInput);
        await inputsSteps.clickSelectAllCheckbox();
        await inputsSteps.clickFirstCheckbox();
        await inputsSteps.clickSecondCheckbox();
        await inputsSteps.clickThirdCheckbox();
        await inputsSteps.clickSelectAllCheckbox();
        await inputsSteps.clickSelectAllCheckbox();
   
    });

    test("Country input", async () => {
        await componentsMenuSteps.openCard(testData.countryInput);
        await inputsSteps.selectCountry(testData.country);
    });

    test("Range sliders ", async () => {
        await componentsMenuSteps.openCard(testData.rangeSliders);
        await playground.getRangeSlider().click()

        await inputsSteps.moveRangeSlider()
        await inputsSteps.moveRangeSlider()
        await inputsSteps.moveRangeSlider()
        await inputsSteps.moveRangeSlider()
        await inputsSteps.moveRangeSlider()

        await inputsSteps.moveMultiRangeSlider()
        await inputsSteps.moveMultiRangeSlider()
        await inputsSteps.moveMultiRangeSlider()
        await inputsSteps.moveMultiRangeSlider()
        await inputsSteps.moveMultiRangeSlider()

        
    });

    test("Enter verification code", async () => {
        await componentsMenuSteps.openCard(testData.enterVerificationCode);

        await inputsSteps.enterCode(1 , 7);
        await inputsSteps.enterCode(2 , 7);
        await inputsSteps.enterCode(3 , 7);
        await inputsSteps.enterCode(4 , 7);
        await inputsSteps.enterCode(5 , 7);
        await inputsSteps.enterCode(6 , 7);

        await inputsSteps.isCodeCorrect(true);

        await inputsSteps.enterCode(4 , 4);
        await inputsSteps.enterCode(5 , 2);

        await inputsSteps.isCodeCorrect(false);
    
    });



});