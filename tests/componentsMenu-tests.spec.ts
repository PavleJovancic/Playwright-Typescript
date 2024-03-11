import {test, expect} from '@playwright/test';
import ComponentsMenuSteps from '../services/steps/playground.steps/componentsMenu.steps';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Playground from '../services/pages/playground.page';
import ButtonsSteps from '../services/steps/playground.steps/buttons.steps';
import InputsSteps from '../services/steps/playground.steps/inputs.steps';
import ModalsSteps from '../services/steps/playground.steps/modals.steps';
import MenusSteps from '../services/steps/playground.steps/menus.steps';
import OtherSteps from '../services/steps/playground.steps/other.steps';
import * as data from '../test-data/data.json';
import * as urls from '../test-data/urls.json';
import * as loginData from '../test-data/loginInformation.json';


test.describe("Components Menu tests", () => {
    let componentsMenuSteps: ComponentsMenuSteps,
        loginPage: Login,
        loginSteps: LoginSteps,
        playground: Playground,
        buttonsSteps: ButtonsSteps,
        inputsSteps: InputsSteps,
        modalsSteps: ModalsSteps,
        menusSteps: MenusSteps,
        otherSteps: OtherSteps;

    test.beforeEach(async ({page}) => {
    
        loginPage = new Login(page);
        loginSteps = new LoginSteps(page, loginPage);
        playground = new Playground(page);
        componentsMenuSteps = new ComponentsMenuSteps(page, playground);
        buttonsSteps = new ButtonsSteps(page, playground);
        inputsSteps = new InputsSteps(page, playground);
        modalsSteps = new ModalsSteps(page, playground);
        menusSteps = new MenusSteps(page, playground);
        otherSteps = new OtherSteps(page, playground);
        
        
       

        await page.goto(urls.uiPlayground, {waitUntil:'domcontentloaded'});
        await loginSteps.login(loginData.email, loginData.password);
        // page.waitForTimeout(10000)
    })

    test("Components Menu ", async () => {
        componentsMenuSteps.clickCloseMenuButton();
        await componentsMenuSteps.checkVisibilityOfComponentsMenu("hidden");
        componentsMenuSteps.clickCloseMenuButton();
        await componentsMenuSteps.checkVisibilityOfComponentsMenu("visible");
        
        componentsMenuSteps.clickDropdownButton();
        await componentsMenuSteps.checkVisibilityOfComponentsMenuItems("hidden");
        componentsMenuSteps.clickDropdownButton();
        await componentsMenuSteps.checkVisibilityOfComponentsMenuItems("visible");
    });


    test("Buttons ", async () =>{
        
        await componentsMenuSteps.openMenuItem("Buttons");
        await componentsMenuSteps.openCard(data.openNewTabButton);
        await componentsMenuSteps.openCard(data.downloadPDF);
        await componentsMenuSteps.openCard(data.mouseHoverButton);
        await componentsMenuSteps.openCard(data.openNewWindowButton);
        await componentsMenuSteps.openCard(data.showAndHideButtons);
        await componentsMenuSteps.openCard(data.uploadFileButton);

        await buttonsSteps.selectAllButtons();
        await componentsMenuSteps.cardsAreOpened(false, data.buttons);
        await buttonsSteps.selectAllButtons();
        await componentsMenuSteps.cardsAreOpened(true, data.buttons);
       
        
    });

    test("Inputs ", async () =>{
        
        await componentsMenuSteps.openMenuItem("Inputs");
        await componentsMenuSteps.openCard(data.calendarInput);
        await componentsMenuSteps.openCard(data.progressBar);
        await componentsMenuSteps.openCard(data.radioButtons);
        await componentsMenuSteps.openCard(data.checkboxInput);
        await componentsMenuSteps.openCard(data.countryInput);
        await componentsMenuSteps.openCard(data.rangeSliders);
        await componentsMenuSteps.openCard(data.enterVerificationCode);

        await inputsSteps.selectAllInputs();
        await componentsMenuSteps.cardsAreOpened(false, data.inputs);
        await inputsSteps.selectAllInputs();
        await componentsMenuSteps.cardsAreOpened(true, data.inputs);
       
        
    });

    test("Modals ", async () =>{
        
        await componentsMenuSteps.openMenuItem("Modals");
        await componentsMenuSteps.openCard(data.alertButton);
        await componentsMenuSteps.openCard(data.confirmButton);
        

        await modalsSteps.selectAllModals();
        await componentsMenuSteps.cardsAreOpened(false, data.modals);
        await modalsSteps.selectAllModals();
        await componentsMenuSteps.cardsAreOpened(true, data.modals);
       
        
    });

    test("Menus ", async () =>{
        
        await componentsMenuSteps.openMenuItem("Menus");
        await componentsMenuSteps.openCard(data.tabs);
        await componentsMenuSteps.openCard(data.tabsScroll);
        await componentsMenuSteps.openCard(data.menu);

        await menusSteps.selectAllMenus();
        await componentsMenuSteps.cardsAreOpened(false, data.menus);
        await menusSteps.selectAllMenus();
        await componentsMenuSteps.cardsAreOpened(true, data.menus);
       
        
    });

    test("Other ", async () =>{
        
        await componentsMenuSteps.openMenuItem("Other")
        await componentsMenuSteps.openCard(data.dropdown);
        await componentsMenuSteps.openCard(data.incrDecrElement);
        await componentsMenuSteps.openCard(data.dragAndDrop);
        await componentsMenuSteps.openCard(data.dropdownScroll);
        await componentsMenuSteps.openCard(data.previewFile);
        await componentsMenuSteps.openCard(data.scrollToElement);
        await componentsMenuSteps.openCard(data.sortableList);
        await componentsMenuSteps.openCard(data.mulitLevelDropdown);
        await componentsMenuSteps.openCard(data.uploadFileField);
        await componentsMenuSteps.openCard(data.table);
        await componentsMenuSteps.openCard(data.sendMessage);
        await componentsMenuSteps.openCard(data.toDoList);
        await componentsMenuSteps.openCard(data.timer);

        await otherSteps.selectAllOthers();
        await componentsMenuSteps.cardsAreOpened(false, data.other);
        await otherSteps.selectAllOthers();
        await componentsMenuSteps.cardsAreOpened(true, data.other);
       
        
    });

});