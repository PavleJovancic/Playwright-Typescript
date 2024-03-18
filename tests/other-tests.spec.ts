import {test} from '@playwright/test';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import Playground from '../services/pages/playground.page';
import ComponentsMenuSteps from '../services/steps/playground.steps/componentsMenu.steps';
import OtherSteps from '../services/steps/playground.steps/other.steps';
import * as testData from '../test-data/data.json';
import * as loginData from '../test-data/loginInformation.json';
import * as urls from '../test-data/urls.json';


test.describe("Test Other Functionality @other", () => {
    let login: Login,
        loginSteps: LoginSteps,
        playground: Playground,
        componentsMenuSteps: ComponentsMenuSteps,
        otherSteps: OtherSteps;
        

    test.beforeEach(async ({page}) => {
        login = new Login(page);
        loginSteps = new LoginSteps(page, login);
        playground = new Playground(page);
        componentsMenuSteps = new ComponentsMenuSteps(page, playground);
        otherSteps = new OtherSteps(page, playground);

        await page.goto(urls.uiPlayground);
        await loginSteps.login(loginData.email, loginData. password);
        componentsMenuSteps.openMenuItem(testData.other);
    });

    test("Dropdown", async () => {
        let optionA = "OptionA";
        let optionB = "OptionB";
        let optionC = "OptionC";
        let optionD = "OptionD";
        let optionE = "OptionE";
        await componentsMenuSteps.openCard(testData.dropdown);
            
        await otherSteps.selectOptionAndCheckValue(optionA);
        await otherSteps.selectOptionAndCheckValue(optionB);
        await otherSteps.selectOptionAndCheckValue(optionC);
        await otherSteps.selectOptionAndCheckValue(optionD);
        await otherSteps.selectOptionAndCheckValue(optionE);
    });
            
        
    test("Incr./decr. element", async () => {
                
        await componentsMenuSteps.openCard(testData.incrDecrElement);
        
        await otherSteps.incrementOrDecrementNumber("+");
        await otherSteps.incrementOrDecrementNumber("+");
        await otherSteps.incrementOrDecrementNumber("+");
        await otherSteps.valueOfElementIs("3");

        await otherSteps.incrementOrDecrementNumber("-");
        await otherSteps.incrementOrDecrementNumber("-");
        await otherSteps.valueOfElementIs("1");

        await otherSteps.incrementOrDecrementNumber("+");
        await otherSteps.valueOfElementIs("2");

        await otherSteps.incrementOrDecrementNumber("-");
        await otherSteps.incrementOrDecrementNumber("-");
        await otherSteps.incrementOrDecrementNumber("-");
        await otherSteps.valueOfElementIs("-1");

        await otherSteps.resetInput();
    });
        
            
        
        
    test("Drag and drop @testing", async () => {
              
        await componentsMenuSteps.openCard(testData.dragAndDrop);
        
        await otherSteps.dragItemToArea(2);
        await otherSteps.dragItemToArea(4);
        await otherSteps.dragItemToArea(3);
        await otherSteps.dragItemToArea(1);
    });
        
    test("Dropdown scroll", async () => {
        let toyota = "Toyota";
        let volkswagen = "Volkswagen";
        let ford = "Ford";
        let honda = "Honda";
        let bmw = "BMW";
        let mercedesBenz = "Mercedes-Benz";
        let nissan = "Nissan";
        let chevrolet = "Chevrolet";

        await componentsMenuSteps.openCard(testData.dropdownScroll);
        
        await otherSteps.selectDropdownScrollMenuItem(honda);
        await otherSteps.selectDropdownScrollMenuItem(chevrolet);
        await otherSteps.selectDropdownScrollMenuItem(toyota);
        await otherSteps.selectDropdownScrollMenuItem(nissan);
        await otherSteps.selectDropdownScrollMenuItem(ford);
        await otherSteps.selectDropdownScrollMenuItem(mercedesBenz);
        await otherSteps.selectDropdownScrollMenuItem(bmw);
        
    });
        
    test("Preview file", async ({page}) => {
               
        await componentsMenuSteps.openCard(testData.previewFile);
        await otherSteps.previewFile(urls.loremIpsum);    
    });
        
    test("Scroll to element ", async () => {
           
        await componentsMenuSteps.openCard(testData.scrollToElement);

        await otherSteps.clickSrolltoElementButton();
        await otherSteps.clickGoBackToStartButton();
        await otherSteps.scrollDownToElement();
        await otherSteps.scrollUptoElement();
    });
        
            
        
    test("Sortable list ", async() =>{
        let theBeatles= "The Beatles";
        let lezZeppelin= "Lez Zeppelin";
        let theRollingStones= "The Rolling Stones";
        let queen= "Queen";
        let acDC= "AC/DC";
        let pinkFloyd= "Pink Floyd";
        

        await componentsMenuSteps.openCard(testData.sortableList);
                
        let whatListToLookLike = [theRollingStones, pinkFloyd, queen, theBeatles, acDC, lezZeppelin];

        await otherSteps.dragListItemNextTo(theBeatles , queen);
        await otherSteps.dragListItemNextTo(pinkFloyd , lezZeppelin);
        await otherSteps.dragListItemNextTo(theRollingStones , pinkFloyd);
        await otherSteps.dragListItemNextTo(lezZeppelin , acDC);

        await otherSteps.compareInitialListAndSortedList(whatListToLookLike);
        await otherSteps.resetList();
    });
        
            // test("Multi level dropdown @inprogress", async ({page}) => {
            //     let animals="Animals",
            //         canis ="Canis",
            //         wolf="Wolf",
            //         artic="Artic",
            //         felidae="Felidae",
            //         dog="Dog",
            //         iberian="Iberian",
            //         aves="Aves",
            //         coyote="Coyote",
            //         coastal="Coastal"
           
            //     await componentsMenuSteps.openCard(testData.mulitLevelDropdown)
                
            //     // await this.playground.getAnimal(animals).hover()
            //     // await this.playground.getAnimal(canis).hover()
            //     expect(this.playground.getAnimal(canis)).toHaveCSS('background-color','rgb(255, 87, 34)')
            //     // await page.mouse.move(0, 0)
            //     // await page.waitForTimeout(1000)
            //     // expect(this.playground.getAnimal(canis)).not.toBeVisible()
            //     // this.playground.getAnimal(felidae).isVisible()
            //     // this.playground.getAnimal(aves).isVisible()
                
            //     // await this.playground.getAnimal(canis).hover()
            //     // await page.mouse.move(0, 0)
            //     // await page.waitForTimeout(1000)
            //     // expect(this.playground.getAnimal(wolf).isVisible()).toBeTruthy()
            //     // expect(this.playground.getAnimal(dog)).toBeVisible()
            //     // this.playground.getAnimal(coyote)
        
            //     // // await this.playground.getAnimal(wolf).hover()
            //     // await page.mouse.move(0, 0)
            //     // await page.waitForTimeout(1000)
            //     // this.playground.getAnimal(artic)
            //     // this.playground.getAnimal(iberian).isVisible()
            //     // this.playground.getAnimal(coastal).isVisible()
        
                
            // });
        
        
            //     // await this.playground.getAnimal(animals).hover()
            //     // expect(this.playground.getAnimal(canis)).toBeVisible()
            //     // await page.mouse.move(0, 0)
            //     // await page.waitForTimeout(1000)
            //     // expect(this.playground.getAnimal(canis)).not.toBeVisible()
            //     // this.playground.getAnimal(felidae).isVisible()
            //     // this.playground.getAnimal(aves).isVisible()
                
            //     // // await this.playground.getAnimal(canis).hover()
            //     // await page.mouse.move(0, 0)
            //     // await page.waitForTimeout(1000)
            //     // expect(this.playground.getAnimal(wolf).isVisible()).toBeTruthy()
            //     // expect(this.playground.getAnimal(dog)).toBeVisible()
            //     // this.playground.getAnimal(coyote)
        
            //     // // await this.playground.getAnimal(wolf).hover()
            //     // await page.mouse.move(0, 0)
            //     // await page.waitForTimeout(1000)
            //     // this.playground.getAnimal(artic)
            //     // this.playground.getAnimal(iberian).isVisible()
            //     // this.playground.getAnimal(coastal).isVisible()
            
        
    test("Upload file field", async () => {
           
        await componentsMenuSteps.openCard(testData.uploadFileField);
        await otherSteps.uploadOversizedFile();
        await otherSteps.uploadAllowedSizeFile(); 
    });
        
    test("Table, sort Instructors - Ascending order @ascInstructors", async () => {
            
        await componentsMenuSteps.openCard(testData.table)

        await otherSteps.sortTableInstructors("asc")

    });

    test("Table, sort Instructors - Descending order @descInstructors", async () => {
            
        await componentsMenuSteps.openCard(testData.table)

        await otherSteps.sortTableInstructors("desc")

    });
   
        
    test("Table, sort Courses - Ascending order @ascCourses", async () => {
            
        await componentsMenuSteps.openCard(testData.table)
        await otherSteps.sortTableCourses("asc")     
            
    });

    test("Table, sort Courses - Descending order @descCourses", async () => {
            
        await componentsMenuSteps.openCard(testData.table)
        await otherSteps.sortTableCourses("asc")     
            
    });
        
        
    test("Table, sort Prices - Ascending order @ascPrices", async () => {
        await componentsMenuSteps.openCard(testData.table)
        await otherSteps.sortTablePrices("asc")   

    });

    test("Table, sort Prices - Descending order @descPrices", async () => {
        await componentsMenuSteps.openCard(testData.table)
        await otherSteps.sortTablePrices("desc")  
    });
  
        
    test("Table pagination @pagination", async () => {
        await componentsMenuSteps.openCard(testData.table)

        await otherSteps.chooseRowsPerPage("4")
        await otherSteps.chooseRowsPerPage("8")
        await otherSteps.chooseRowsPerPage("16")
    })
        
        
    test("Send Message", async () => {
                
        await componentsMenuSteps.openCard(testData.sendMessage)
                
    })
        
    test("To-Do list", async () => {
        await componentsMenuSteps.openCard(testData.toDoList)
                
    })
        
    test("Timer", async () => {
        await componentsMenuSteps.openCard(testData.timer)
    })
});