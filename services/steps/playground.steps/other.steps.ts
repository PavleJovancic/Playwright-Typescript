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
        await this.playground.getSelectAllOther().click();
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
        expect(await this.playground.getIncrDecrInput().getAttribute('data-value')).toBe("0");
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
        await expect(this.playground.getScrollToElementToTopButton()).toBeVisible();
    };

    async scrollUptoElement(){
        await this.playground.getScrollToElementToBottomButton().scrollIntoViewIfNeeded();
        await expect(this.playground.getScrollToElementToBottomButton()).toBeVisible();
    };

    async clickScrollToElementButton(){
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
        let resetList = this.playground.getItemList();
        await expect(resetList).toHaveText(initialList);
    };

    async uploadOversizedFile(){
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.playground.getDownloadOversizedFile().click()
        ]);
        
        const suggestedFileName = download.suggestedFilename();
        const filePath = './testFiles/' + suggestedFileName;
        await download.saveAs(filePath);

        const dragAndDropScript = `
        // Replace 'your_selector_for_drag_and_drop_area' with the actual CSS selector of the drag and drop area
        const dropArea = document.querySelector('#qa-upload-file-field');
        
        // Create a custom event
        const event = new DragEvent('drop', {
          bubbles: true,
          cancelable: true,
        });
        
        // Simulate dropping the file
        Object.defineProperty(event, 'dataTransfer', {
          value: {
            files: [new File(['filePath'], 'filePath.split('/').pop()}')]
          },
          writable: false
        });
        
        // Dispatch the drop event
        dropArea.dispatchEvent(event);
      `;
      
      // Execute the JavaScript code to simulate the drag and drop action
      await this.page.evaluate(dragAndDropScript);
      









        // await this.playground.getUploadField().setInputFiles("../../testFiles/"+ filePath);
        expect(await this.playground.getUploadError().innerText()).toBe("File exceeds the maximum allowed size (1 MB)");
    };

    async uploadAllowedSizeFile(){
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.playground.getDownloadAllowedSizeFile().click()
        ]);
        
        const suggestedFileName = download.suggestedFilename();
        const filePath = './testFiles/' + suggestedFileName;
        await download.saveAs(filePath);

        await this.playground.getUploadField().setInputFiles("../../testFiles/"+ filePath);
        expect(await this.playground.getUploadField().innerText()).toBe("File added") ;
    };

    async sortTableInstructors(sort:string){
        
        let unsortedInstructors = await this.playground.getAllInstructors().allInnerTexts();
        let sortedInstructors =[];
    
        if(sort == "asc"){
            sortedInstructors = unsortedInstructors.sort();
        } 
        if(sort == "desc"){
            sortedInstructors = unsortedInstructors.sort();
            sortedInstructors = unsortedInstructors.reverse();
        } 

        if(sort == "asc"){
            await this.playground.getTableInstructor().click();
        }
        if(sort == "desc"){
            await this.playground.getTableInstructor().click();
            await this.playground.getTableInstructor().click();
        }
         
        let afterSortInstructors = await this.playground.getAllInstructors().allInnerTexts();
    
        expect(sortedInstructors).toEqual(afterSortInstructors);
    
    };

    async sortTableCourses(sort:string){
        
        let unsortedCourses = await this.playground.getAllCourses().allInnerTexts();
        let sortedCourses = [];
        if(sort == "asc"){
            sortedCourses = unsortedCourses.sort();
        } 
        if(sort == "desc"){
            sortedCourses = unsortedCourses.sort();
            sortedCourses = unsortedCourses.reverse();
        } 
    
        if(sort == "asc"){
            await this.playground.getTableCourse().click();
        }
        if(sort == "desc"){
            await this.playground.getTableCourse().click();
            await this.playground.getTableCourse().click();
        }
 
        let afterSortCourses = await this.playground.getAllCourses().allInnerTexts();
    
        expect(sortedCourses).toEqual(afterSortCourses);
    };

    async prices(){
        let pricesList = await this.playground.getAllPrices().allInnerTexts();
        let unsortedPrices = [];
        pricesList.forEach(text=>{
            let price = text.slice(0, -1);
            unsortedPrices.push(price);
        })
        return unsortedPrices;
    };

    async sortTablePrices(sort:string){
                 
        let unsortedPrices = await this.prices();
        let sortedPrices = [];
       
        if(sort == "asc"){
            sortedPrices = unsortedPrices.sort((a, b) =>{return a-b});
        } 
        if(sort == "desc"){
            sortedPrices = unsortedPrices.sort((a, b)=>{return b-a});
        } 
    
        if(sort == "asc"){
            await this.playground.getTablePrice().click();
        }
        if(sort == "desc"){
            await this.playground.getTablePrice().click();
            await this.playground.getTablePrice().click();
        };

        let afterSortPrices = await this.prices();
      
        expect(sortedPrices).toEqual(afterSortPrices);
    
    };

    async chooseRowsPerPage(rows: string){
        
        await this.playground.getRowsPerPage().selectOption(rows);
        let list = await this.playground.getTableRows();

        expect(list).toHaveCount(Number(rows));
    };

    async sendMessage(){
        await this.playground.getSendButton().click();
        await expect(await this.playground.getMessage()).toBeVisible({timeout:10000});
    }
    async clearMessage(){
        await this.playground.getClearButton().click();
        await expect(this.playground.getMessage()).toBeHidden();
    };

    async addTask(task: string){
        let numberOfTasks = (await this.playground.getNumberOfTasks().innerText());
        let initialNumberOfTasks = Number(numberOfTasks.slice(numberOfTasks.length - 1));

        await this.playground.getInputTaskField().fill(task);
        await this.playground.getAddTask().click();
        let addedTask = await this.playground.getAddedTask().innerText();
        expect(addedTask).toEqual(task);
        
        numberOfTasks = (await this.playground.getNumberOfTasks().innerText());
        let numberOfTasksAfterAdd = Number(numberOfTasks.slice(numberOfTasks.length - 1));
        expect(numberOfTasksAfterAdd).toBe(initialNumberOfTasks + 1);
    };

    async editTask(task:string, editedTask:string){
        await this.playground.getEditTask(task).click();
        await this.playground.getInputTaskField().clear();
        await this.playground.getInputTaskField().fill(editedTask);
        await this.playground.getAddTask().click();
        let editedTaskName = await this.playground.getTask(editedTask).innerText();
        expect(editedTaskName).toEqual(editedTask);
    };

    async deleteTask(task: string){
        let numberOfTasks = (await this.playground.getNumberOfTasks().innerText());
        let initialNumberOfTasks = Number(numberOfTasks.slice(numberOfTasks.length - 1));

        await this.playground.getDeleteTask(task).click();
        await expect(this.playground.getTask(task)).not.toBeAttached();

        numberOfTasks = (await this.playground.getNumberOfTasks().innerText());
        let numberOfTasksAfterAdd = Number(numberOfTasks.slice(numberOfTasks.length - 1));
        expect(numberOfTasksAfterAdd).toBe(initialNumberOfTasks - 1);
    };

    async sliceCountdown(){
        let initialCountdown: string = await this.playground.getTimerCountdown().innerText();
        if(initialCountdown.includes(":")){
            let minutes = Number(initialCountdown.slice(0,1));
            let seconds = Number(initialCountdown.slice(initialCountdown.length-2 , initialCountdown.length));
            return minutes * 60 + seconds;
        } else{
            return Number(initialCountdown) * 60;
        };
    };

    async decreaseTimeoutCountdown(){
        
        let initialCountdown =await this.sliceCountdown();
        await this.playground.getDecreaseCountdown().click();
        let decreasedCountdown = await this.sliceCountdown();
        expect(decreasedCountdown).toBe(initialCountdown - 30);
        
    };

    async increaseTimeoutCountdown(){
        let initialCountdown =await this.sliceCountdown();
        await this.playground.getIncreaseCountdown().click();
        let decreasedCountdown = await this.sliceCountdown();
        expect(decreasedCountdown).toBe(initialCountdown + 30);
    };

    async startCountdown(seconds: number){
        let initialCountdown =await this.sliceCountdown();
        await this.playground.getStartTime().click();
        await this.page.waitForTimeout(seconds * 1000);
        let decreasedCountdown = await this.sliceCountdown();
        expect(decreasedCountdown).toBe(initialCountdown - seconds);
    };


};