import { expect, Page } from "@playwright/test";
import Playground from "../../pages/playground.page";

export default class OtherSteps{
    private page: Page;
    private playground: Playground;

    constructor(page: Page, playground: Playground){
        this.page = page;
        this.playground = playground;
    };

    async selectAllOthers(){
        await this.playground.getSelectAllOther().click()
    };

    //dropdown

    async selectOptionAndCheckValue(option: string){
        await this.playground.getDropdownMenu().selectOption(option);
        await expect(this.playground.getDropdownMenu()).toHaveValue(option);
    };
    
    //Incr./decr. element

    async incrementOrDecrementNumber(action: string){
        if(action == "+"){
            await this.playground.getIncrement().click();
        }
        if(action == "-"){
            await this.playground.getDecrement().click();      
        };
    };
    
    async valueOfElementIs(value: string){
        expect(await this.playground.getIncrDecrInput().getAttribute('data-value')).toBe(value);
    };
    
    async resetInput(){
        await this.playground.getResetIncrDecrInput().click();
        expect(await this.playground.getIncrDecrInput().getAttribute('data-value')).toBe("0")
    };

    async dragItemToArea(area: number){
        await this.playground.getDraggableItem().dragTo(this.playground.getDropArea(area));
        await expect(this.playground.getItemFromDropArea(area)).toBeVisible();
    };

    async selectDropdownScrollMenuItem(item: string){
        await this.playground.getDropDownScrollMenu().click();
        await this.playground.getDropdownItem(item).click();
        await expect(this.playground.getDropdownMenuItem()).toHaveText(item);
    };

    async previewFile(url: string){
        const pagePromise = this.page.context().waitForEvent('page');  
        await this.playground.getClickMeButton().click();
        const newPage =await pagePromise;
        expect(newPage).toHaveURL(url);
    };

    async scrollDownToElement(){
        await this.playground.getScrollToElementToTopButton().scrollIntoViewIfNeeded();
        await expect(this.playground.getScrollToElementToTopButton()).toBeVisible()  ;
    };

    async scrollUptoElement(){
        await this.playground.getScrollToElementToBottomButton().scrollIntoViewIfNeeded();
        await expect(this.playground.getScrollToElementToBottomButton()).toBeVisible();
    };

    async clickSrolltoElementButton(){
        await this.playground.getScrollToElementToBottomButton().click();
        await expect(this.playground.getScrollToElementToTopButton()).toBeVisible();
        await expect(this.playground.getScrolledElement()).toContainText("Scrolled element!");
    };

    async clickGoBackToStartButton(){
        await this.playground.getScrollToElementToTopButton().click();
        await expect(this.playground.getScrollToElementToBottomButton()).toBeVisible();
    };

    async dragListItemNextTo(item: string, dragNextTo:string){
        await this.playground.getListItem(item).dragTo(this.playground.getListItem(dragNextTo));
    };

    async compareInitialListAndSortedList(desiredList: string[]){
        let sortedList = this.playground.getItemList();
        await expect(sortedList).toHaveText(desiredList);
    };

    async resetList(){
        let initialList = ["The Beatles", "Lez Zeppelin", "The Rolling Stones", "Queen", "AC/DC", "Pink Floyd"];
        await this.playground.getResetButton().click();
        let resetedList = this.playground.getItemList();
        await expect(resetedList).toHaveText(initialList);
    };

    async uploadOversizedFile(){
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.playground.getDownloadOversizedFile()
        ]);
        
        const suggestedFileName = download.suggestedFilename();
        const filePath = './testFiles/' + suggestedFileName;
        await download.saveAs(filePath);

        await this.playground.getUploadField().setInputFiles("../../testFIles/"+ filePath);
        expect(await this.playground.getUploadError().innerText()).toBe("File exceeds the maximum allowed size (1 MB)");
    };

    async uploadAllowedSizeFile(){
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.playground.getDownloadAllowedSizeFile()
        ]);
        
        const suggestedFileName = download.suggestedFilename();
        const filePath = './testFiles/' + suggestedFileName;
        await download.saveAs(filePath);

        await this.playground.getUploadField().setInputFiles("../../testFIles/"+ filePath);
        expect(await this.playground.getUploadField().innerText()).toBe("File added") ;
    };

    async sortTableInstructors(sort:string){
        
        let unsortedInstructors = await this.playground.getAllInstructors().allInnerTexts()
        let sortedInstructors =[]
    
        if(sort == "asc"){
            sortedInstructors = unsortedInstructors.sort()
        } 
        if(sort == "desc"){
            sortedInstructors = unsortedInstructors.sort()
            sortedInstructors = unsortedInstructors.reverse()
        } 

        if(sort == "asc"){
            await this.playground.getTableInstructor().click()
        }
        if(sort == "desc"){
            await this.playground.getTableInstructor().click()
            await this.playground.getTableInstructor().click()
        }
         
        let afterSortInstructors = await this.playground.getAllInstructors().allInnerTexts()
    
        expect(sortedInstructors).toEqual(afterSortInstructors)
    
    };

    async sortTableCourses(sort:string){
        
        let unsortedCourses = await this.playground.getAllCourses().allInnerTexts()
        let sortedCourses = []
        if(sort == "asc"){
            sortedCourses = unsortedCourses.sort()
        } 
        if(sort == "desc"){
            sortedCourses = unsortedCourses.sort()
            sortedCourses = unsortedCourses.reverse()
        } 
    
        if(sort == "asc"){
            await this.playground.getTableCourse().click()
        }
        if(sort == "desc"){
            await this.playground.getTableCourse().click()
            await this.playground.getTableCourse().click()
        }
 
        let afterSortCourses = await this.playground.getAllCourses().allInnerTexts()
    
        expect(sortedCourses).toEqual(afterSortCourses)
    };

    async prices(){
        let pricesList = await this.playground.getAllPrices().allInnerTexts()
        let unsortedPrices = []
        pricesList.forEach(text=>{
            let price = text.slice(0, -1)
            unsortedPrices.push(price)
        })
        return unsortedPrices
    }

    async sortTablePrices(sort:string){
                 
        let unsortedPrices = await this.prices()
        let sortedPrices = []
       
        if(sort == "asc"){
            sortedPrices = unsortedPrices.sort((a, b) =>{return a-b})
        } 
        if(sort == "desc"){
            sortedPrices = unsortedPrices.sort((a, b)=>{return b-a})
        } 
    
        if(sort == "asc"){
            await this.playground.getTablePrice().click()
        }
        if(sort == "desc"){
            await this.playground.getTablePrice().click()
            await this.playground.getTablePrice().click()
        }

        let afterSortPrices = await this.prices()
      
        expect(sortedPrices).toEqual(afterSortPrices)
    
    }

    async chooseRowsPerPage(rows: string){
        
        await this.playground.getRowsPerPage().selectOption(rows)
        let list = await this.playground.getTableRows()

        expect(list).toHaveCount(Number(rows))
    }

    async sendMessage(){
        await this.playground.getSendButton().click()
        await expect(await this.playground.getMessage()).toBeVisible({timeout:10000})
    }
    async clearMessage(){
        await this.playground.getClearButton().click()
        await expect(this.playground.getMessage()).toBeHidden()
    }
   


};