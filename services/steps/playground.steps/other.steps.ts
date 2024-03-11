import { expect, Page } from "@playwright/test";
import Playground from "../../pages/playground.page";
import * as data from '../../../test-data/data.json'

export default class OtherSteps{
    private page: Page;
    private playground: Playground;

    constructor(page: Page, playground: Playground){
        this.page = page;
        this.playground = playground;
    };

    async selectAllOthers(){
        await this.playground.getSelectAllOther().click()
    }

    //dropdown

    async selectOptionAndCheckValue(option: string){
        await this.playground.getDropdownMenu().selectOption(option)
        await expect(this.playground.getDropdownMenu()).toHaveValue(option)
    }
    
    //Incr./decr. element

    async incrementOrDecrementNumber(action: string){
    

        if(action == "+"){
            await this.playground.getIncrement().click()
            
        }
        if(action == "-"){
            await this.playground.getDecrement().click()
            
        }
        

    }
    
    async valueOfElementIs(value: string){
        expect(await this.playground.getIncrDecrInput().getAttribute('data-value')).toBe(value)
    }
    

    
    async resetInput(){
        await this.playground.getResetIncrDecrInput().click()

        expect(await this.playground.getIncrDecrInput().getAttribute('data-value')).toBe("0")
    }

    async dragItemToArea(area: number){
        await this.playground.getDraggableItem().dragTo(this.playground.getDropArea(area))
        await expect(this.playground.getItemFromDropArea(area)).toBeVisible()
        
    }

    async selectDropdownScrollMenuItem(item: string){
        await this.playground.getDropDownScrollMenu().click()
        await this.playground.getDropdownItem(item).click()
        await expect(this.playground.getDropdownMenuItem()).toHaveText(item)
    }


    async previewFile(url: string){
        const pagePromise = this.page.context().waitForEvent('page')    
        await this.playground.getClickMeButton().click()
        const newPage =await pagePromise;
        expect(newPage).toHaveURL(url)
    }

    async scrollDownToElement(){
        
        await this.playground.getScrollToElementToTopButton().scrollIntoViewIfNeeded()
        await expect(this.playground.getScrollToElementToTopButton()).toBeVisible()
        
    }

    async scrollUptoElement(){
        await this.playground.getScrollToElementToBottomButton().scrollIntoViewIfNeeded()
        await expect(this.playground.getScrollToElementToBottomButton()).toBeVisible()
    }

    async clickSrolltoElementButton(){
        await this.playground.getScrollToElementToBottomButton().click()
        await expect(this.playground.getScrollToElementToTopButton()).toBeVisible()
        await expect(this.playground.getScrolledElement()).toContainText("Scrolled element!")
    }

    async clickGoBackToStartButton(){
        await this.playground.getScrollToElementToTopButton().click()
        await expect(this.playground.getScrollToElementToBottomButton()).toBeVisible()
    }

    async dragListItemNextTo(item: string, dragNextTo:string){
        await this.playground.getListItem(item).dragTo(this.playground.getListItem(dragNextTo))
       
    }

  

    async compareInitialListAndSortedList(desiredList: string[]){
        let sortedList = this.playground.getItemList()
        await expect(sortedList).toHaveText(desiredList)
    
    }

    async resetList(){
        let initialList = ["The Beatles", "Lez Zeppelin", "The Rolling Stones", "Queen", "AC/DC", "Pink Floyd"]
        await this.playground.getResetButton().click()
        let resetedList = this.playground.getItemList()
        await expect(resetedList).toHaveText(initialList)
    
    }

    async uploadOversizedFile(){
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.playground.getDownloadOversizedFile()
        ]);
        
        const suggestedFileName = download.suggestedFilename();
        const filePath = './testFiles/' + suggestedFileName;
        await download.saveAs(filePath);

        await this.playground.getUploadField().setInputFiles("../../testFIles/"+ filePath);
        expect(await this.playground.getUploadError().innerText()).toBe("File exceeds the maximum allowed size (1 MB)")
    }

    async uploadAllowedSizeFile(){
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.playground.getDownloadAllowedSizeFile()
        ]);
        
        const suggestedFileName = download.suggestedFilename();
        const filePath = './testFiles/' + suggestedFileName;
        await download.saveAs(filePath);

        await this.playground.getUploadField().setInputFiles("../../testFIles/"+ filePath);
        expect(await this.playground.getUploadField().innerText()).toBe("File added")
       
    }

    async sortTable(){
        
        test("Table, sort Instructors", async () => {
            
            await componentsMenuSteps.openCard(testData.table)
            let unsortedPrices = []
            
            unsortedPrices = await this.playground.getAllInstructors().allInnerTexts()
            console.log(unsortedPrices)
    
            let sortedPricesAs = unsortedPrices.sort()
            console.log(sortedPricesAs)
    
            await this.playground.getTableInstructor().click()
    
            let afterSortPrices = await this.playground.getAllInstructors().allInnerTexts()
    
            console.log(afterSortPrices)
    
            expect(sortedPricesAs).toEqual(afterSortPrices)
    
            let sortedInstPrices = unsortedPrices.reverse()
            console.log(sortedInstPrices)
    
        
    
            await this.playground.getTableInstructor().click()
    
            afterSortPrices = await this.playground.getAllInstructors().allInnerTexts()
    
            console.log(afterSortPrices)
    
            expect(afterSortPrices).toEqual(sortedInstPrices)
            
        })
    
    
        test("Table, sort Courses", async () => {
        
            await componentsMenuSteps.openCard(testData.table)
            let unsortedCourses = []
            
            unsortedCourses = await this.playground.getAllCourses().allInnerTexts()
            console.log(unsortedCourses)
    
            let sortedCoursesAsc = unsortedCourses.sort()
            console.log(sortedCoursesAsc)
    
            await this.playground.getTableCourse().click()
    
            let afterSortCourses = await this.playground.getAllCourses().allInnerTexts()
    
            console.log(afterSortCourses)
    
            expect(sortedCoursesAsc).toEqual(afterSortCourses)
    
            let sortedCoursesDesc = unsortedCourses.reverse()
            console.log(sortedCoursesDesc)
    
        
    
            await this.playground.getTableCourse().click()
    
            afterSortCourses = await this.playground.getAllCourses().allInnerTexts()
    
            console.log(afterSortCourses)
    
            expect(afterSortCourses).toEqual(sortedCoursesDesc)
    
    
    
            
        })
    
    
        test("Table, sort Prices ", async () => {
        
            await componentsMenuSteps.openCard(testData.table)
            
            let something = []
            let unsortedPrices = []
            something = await this.playground.getAllPrices().allInnerTexts()
            
            something.forEach(text=>{
                let price = text.slice(0, -1)
                unsortedPrices.push(price)
            })
           
    
    
            let sortedPricesAsc = unsortedPrices.sort((a, b) =>{return a-b})
            
     
            await this.playground.getTablePrice().click()
            let afterSortPrices = []
            let afterSortText = await this.playground.getAllPrices().allInnerTexts()
            afterSortText.forEach(text=>{
                let price = text.slice(0, -1)
                afterSortPrices.push(price)
            })
            
    
            expect(sortedPricesAsc).toEqual(afterSortPrices)
    
            let sortedPricesDesc = unsortedPrices.sort((a, b)=>{return b-a})
            console.log(sortedPricesDesc)
    
        
    
            await this.playground.getTablePrice().click()
    
            afterSortPrices = []
            afterSortText = await this.playground.getAllPrices().allInnerTexts()
            afterSortText.forEach(text=>{
                let price = text.slice(0, -1)
                afterSortPrices.push(price)
            })
            console.log(afterSortPrices)
    
    
            expect(afterSortPrices).toEqual(sortedPricesDesc)
    
    
            
        })
    }

    
    
    
}