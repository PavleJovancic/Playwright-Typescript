import { Locator, Page } from "playwright/test";
import * as selectors from '../../selectors.json';
export default class Playground {
    private page: Page;

    constructor(page: Page){
        this.page = page;
    };

////////////////////
// NON SPECIFIC //


getMenuItemLink(item: string): Locator{
    return this.page.locator(selectors.uiPlayground.components.componentsMenuItems).getByText(item);
};



getCardLink(text: string): Locator{
    return this.page.locator(selectors.uiPlayground.components.listItems).getByText(text, { exact: true });
    // return this.page.locator(selectors.uiPlayground.components.listItems).filter({hasText: text})
};

getCardTitle(text: string): Locator{
    return this.page.locator(selectors.uiPlayground.components.cardTitles).getByText(text);
};


getCardTitles(names: string[]): Locator[]{
    let titles = []
    for(let i=0; i < names.length;i++){
        titles.push(this.getCardTitle(names[i]));
    };
    return titles;
};

// public getButtonsTitles(){
//     let titles = ["Open new tab button", "Download PDF", "Mouse hover button",
//     "Open new window button", "Show & hide buttons", "Upload file button"]
//     this.getCardTitles(titles)
// }

// public getInputsTitles(){
//     let titles = ["Open new tab button", "Download PDF", "Mouse hover button",
//     "Open new window button", "Show & hide buttons", "Upload file button"]
//     this.getCardTitles(titles)
// }


///////////////////
// SPECIFIc //

//////////////////////           COMPONENTS          ///////////////////////


getCloseMenuButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.closeMenuButton);
};


getDropdownButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.dropdownButton);
};


getComponentsMenu(): Locator{
    return this.page.locator(selectors.uiPlayground.components.componentsMenu);
};



getShrunkComponentsMenu(): Locator{
    return this.page.locator(selectors.uiPlayground.components.shrinkedComponentsMenu);
};

/////////////////////////           BUTTONS           ///////////////////////

getSelectAllButtons(): Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.selectAll);
};


//Open New Tab



getOpenNewTabButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.openNewTabButton.openButton);
};

//Download PDF



getDownloadButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.downloadPDF.downloadButton);
};

//Mouse Hover Button


getHoverMeButton(): Locator {
    return this.page.locator(selectors.uiPlayground.components.buttons.mouseHoverButton.hoverMeButton);
};

getHoverText(): Locator {
    return this.page.locator(selectors.uiPlayground.components.buttons.mouseHoverButton.hoverText);
};

//Open New Window



getOpenNewWindowButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.openNewWindowButton.openButton);
};
//Show And Hide Buttons



getShowButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.showAndHideButton.showButton);
};


getHideButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.showAndHideButton.hideButton);
};

getInputField(): Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.showAndHideButton.inputField);
};

//Upload File


getChooseFileButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.uploadFileButton.chooseFile);
};

getUploadedFile(): Locator{
    return this.page.locator(selectors.uiPlayground.components.buttons.uploadFileButton.uploadedFile);
};


///////////////////////          INPUTS            ////////////////////
getSelectAllInputs(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.selectAll);
};   

//Calendar input

getCalendarInput(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.calendarInput.dateInput);
};

//Progress bar

getStartProgressButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.progressBar.startProgress);
};

getStartProgressButtonText(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.progressBar.button);
};

getProgressBar(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.progressBar.progressBar);
};

//Radio buttons

getFirstRadioButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.radioButtons.radioButtons).nth(0);
};

getSecondRadioButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.radioButtons.radioButtons).nth(1);
};

getThirdRadioButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.radioButtons.radioButtons).nth(2);
};


//Checkbox input

getFirstCheckbox(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.checkboxInput.checkboxes).nth(0);
};

getSecondCheckbox(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.checkboxInput.checkboxes).nth(1);
};

getThirdCheckbox(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.checkboxInput.checkboxes).nth(2);
};

getSelectAllCheckbox(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.checkboxInput.checkboxes).nth(3);
};


//Country input

getCountryInput(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.countryInput.input);
};

getCountryInputList(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.countryInput.list);
};

//Range sliders

getRangeSlider(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.rangeSliders.rangeSlider);
};

getRangeNumber():Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.rangeSliders.rangeNumber);
};

getMultiSliderOne(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.rangeSliders.multiSliderOne);
};
getMultiSliderTwo(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.rangeSliders.multiSliderTwo);
};

//Enter verification code


getVerificationCodeInput(n: number):Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.enterVerificationCode.verificationCode).nth(n-1);
};

getCorrectCode(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.enterVerificationCode.correctCode);
};

getIncorrectCode(): Locator{
    return this.page.locator(selectors.uiPlayground.components.inputs.enterVerificationCode.incorrectCode);
};



/////////////////////////       MODALS            /////////////////////
getSelectAllModals(): Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.selectAll);
};


//Alert button

getAlertButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.alertButton.alert);
};

getAlertText():Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.alertButton.alertMessage);
};

getAlertOKButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.alertButton.okButton);
};




//Confirm Button

getConfirmButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.confirmButton.confirm);
};

getConfirmCancelButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.confirmButton.cancelButton);
};

getConfirmOKButton():Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.confirmButton.okButton);
};

getConfirmText():Locator{
    return this.page.locator(selectors.uiPlayground.components.modals.confirmButton.confirmMessage);
};

//////////////////////////       MENUS        ////////////////////
    
getSelectAllMenus(): Locator{
    return this.page.locator(selectors.uiPlayground.components.menus.selectAll);
};

//Tabs


//Tabs Scroll

//Menu


///////////////////////////     OTHER     /////////////////////////////

getSelectAllOther(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.selectAll);
};


//Others




//dropdown

getDropdownCardLink(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.dropdown.dropdownCardLink);
};


getDropdownMenu(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.dropdown.dropdownMenu);
};

//Incr/Decr element

getIncrDecrElementCardLink(): Locator{
    return this.page.locator("label[for='6']");
};


getDecrement(): Locator{
    return this.page.locator("img[alt='reduce time']");
};


getIncrement(): Locator{
    return this.page.locator("img[alt='increase time']");
};


getIncrDecrInput(): Locator{
    return this.page.locator("input[type='number']");
};


getResetIncrDecrInput(): Locator{
    return this.page.locator("img[alt='reset']");
};



//Drag and Drop


getDragAndDropLink(): Locator{
    return this.page.locator("label[for='13']");
};


getDropArea(droparea: number): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.dragAndDrop.droparea).nth(droparea - 1);
};


getDraggableItem():Locator{
    return this.page.locator(selectors.uiPlayground.components.other.dragAndDrop.draggableItem);
};


getItemFromDropArea(dropArea: number): Locator{
    // return this.getDropArea(dropArea).and(this.page.locator("#draggable-item"));
    let loc: Locator;
    if(dropArea == 1){
        loc = this.page.locator("#drop-area #draggable-item");
    }
    if(dropArea == 2){
        loc = this.page.locator("#drop-area1 #draggable-item");
    }
    if(dropArea == 3){
        loc = this.page.locator("#drop-area2 #draggable-item");
    } 
    if(dropArea == 4){
        loc = this.page.locator("#drop-area3 #draggable-item");
    }
     
    return loc;
};

//Dropdown scroll

getDropdownScrollCardLink(): Locator{
    return this.page.locator("label[for='14']");
};


getDropDownScrollMenu(): Locator{
    return this.page.locator(".dropdown-scroll-container-select");
};


getDropdownItem(item: string){
    return this.page.locator(".dropdown-scroll-container-options-item p").getByText(item);
};


getDropdownMenuItem(): Locator{
    return this.page.locator(".dropdown-scroll-container-select p");
};

//Preview File


getPreviewFileCardLink(): Locator{
    return this.page.locator("label[for='15']");
};


getClickMeButton(): Locator{
    return this.page.locator(".preview-file .btn-link-slot");
};

//Scroll to element


getScrollToElementCardLink(): Locator{
    return this.page.locator("label[for='17']");
};


getScrollToElementToBottomButton(): Locator{
    return this.page.locator("#scroll-to-element-button");
};


getScrollToElementToTopButton(): Locator{
    return this.page.locator("button.back-to-element .btn-slot");
};


getScrolledElement(): Locator{
    return this.page.locator(".scroll-to-element h4");
};





//Sortable list

getSortableListLink(): Locator{
    return this.page.locator("label[for='18']");
};

getListItem(text: string): Locator{
    return this.page.locator(".sort-list li").getByText(text);
};

getItemList(): Locator{
    return this.page.locator(".sort-list li");
};


getResetButton(): Locator{
    return this.page.locator(".sort-list .btn-slot");
};

//Multi Level Dropdown

getMultiLevelDropdownCardLink(): Locator{
    return this.page.locator("label[for='22']");
};


getAnimal(animal:string): Locator{
    return this.page.locator("//p[normalize-space()='" + animal + "']");
};


getSelectorAnimals():string{
    return "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > p:nth-child(1)";
};


getSelectorCanis():string{
    return "body > div:nth-child(1) > div:nth-child(1) > div:nth-child(3) > div:nth-child(1) > div:nth-child(4) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(1) > ul:nth-child(2) > li:nth-child(1) > p:nth-child(1)";
};


//Upload File field

getUploadFileFieldCardLink(): Locator{
    return this.page.locator("label[for='23']");
};

getUploadField(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.uploadFileField.uploadFile);
};

getDownloadOversizedFile(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.uploadFileField.downloadButtons).nth(1);
};

getDownloadAllowedSizeFile(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.uploadFileField.downloadButtons).nth(2);
};

getUploadError(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.uploadFileField.uploadError);
};
 //Table

 getTableCardLink(): Locator{
    return this.page.locator("label[for='24']");
};


getTableInstructor(): Locator{
    return this.page.locator("th:nth-child(1)");
};


getTableCourse(): Locator{
    return this.page.locator("th:nth-child(2)");
};


getTablePrice(): Locator{
    return this.page.locator("th:nth-child(3)");
};


getRowsPerPage(): Locator{
    return this.page.locator(".pagination_select");
};


getAllInstructors(): Locator{
    return this.page.locator("td:nth-child(1)");
};

getTableRows(): Locator{
    return this.page.locator(".table-wrapper tbody tr");
};
getAllCourses(): Locator{
    return this.page.locator("td:nth-child(2)");
};

getAllPrices(): Locator{
    return this.page.locator("td:nth-child(3)");
};

getInstructors(i: number): Locator{
    return this.page.locator("tbody tr:nth-child(" + i + ") td:nth-child(1)");
};

getCourses(i: number): Locator{
    return this.page.locator("tbody tr:nth-child(" + i + ") td:nth-child(2)");
};


getPrices(i: number): Locator{
    return this.page.locator("tbody tr:nth-child(" + i + ") td:nth-child(3)");
};


getRows(): Locator{
    return this.page.locator("tbody tr");
};


//Send Message

getSendMessageCardLink(): Locator{
    return this.page.locator("label[for='28']");
};

getMessage(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.sendMessage.message);
};

getSendButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.sendMessage.buttons).nth(0);
};

getClearButton(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.sendMessage.buttons).nth(1);
};



//To-Do List

getToDoListCardLink(): Locator{
    return this.page.locator("label[for='30']");
};


getInputTaskField():Locator{
    return this.page.locator(selectors.uiPlayground.components.other.toDoList.inputTask);
};

getAddTask():Locator{
    return this.page.locator(selectors.uiPlayground.components.other.toDoList.add);
};

async getTaskNames(){
    return  await this.page.locator(selectors.uiPlayground.components.other.toDoList.taskName).all();
};

getAddedTask(): Locator{
    return  this.page.locator(selectors.uiPlayground.components.other.toDoList.taskName).last();
};

getTask(task: string): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.toDoList.tasks).filter({hasText:task}).locator(selectors.uiPlayground.components.other.toDoList.taskName);
};

getEditTask(task: string):Locator{
    return this.page.locator(selectors.uiPlayground.components.other.toDoList.tasks).filter({hasText:task}).locator(selectors.uiPlayground.components.other.toDoList.edit);
};

getDeleteTask(task: string):Locator{
    return this.page.locator(selectors.uiPlayground.components.other.toDoList.tasks).filter({hasText:task}).locator(selectors.uiPlayground.components.other.toDoList.delete);
}

getNumberOfTasks():Locator{
    return this.page.locator(selectors.uiPlayground.components.other.toDoList.numberOfTasks);
};



//Timer

getTimerCardLink(): Locator{
    return this.page.locator("label[for='31']");
};



getTimerCountdown(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.timer.countdown);
};

getStartTime(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.timer.start);
};

getDecreaseCountdown(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.timer.controls).nth(0);
};

getIncreaseCountdown(): Locator{
    return this.page.locator(selectors.uiPlayground.components.other.timer.controls).nth(1);
};

};