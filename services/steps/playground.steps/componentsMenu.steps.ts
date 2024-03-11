import { expect, Page } from "@playwright/test";
import Playground from "../../pages/playground.page";


export default class ButtonsSteps{
    private page: Page;
    private playground: Playground;

    constructor(page: Page, playground: Playground){
        this.page = page;
        this.playground = playground;
    };

    clickCloseMenuButton(){
        this.playground.getCloseMenuButton().click();
    };

    async checkVisibilityOfComponentsMenu(visibility: string){
    
        if(visibility == "visible"){
            await expect(this.playground.getShrinkedComponentsMenu()).toBeHidden();
        } 
        if(visibility == "hidden") {
            await expect(this.playground.getShrinkedComponentsMenu()).toBeVisible();
        }        
    };

    clickDropdownButton(){
        this.playground.getDropdownButton().click();
    };

    async checkVisibilityOfComponentsMenuItems(visibility: string){
    
        if(visibility == "visible"){
            await expect(this.playground.getComponentsMenu()).toBeVisible();
        } 
        if(visibility == "hidden") {
            await expect(this.playground.getComponentsMenu()).toBeHidden();
        }        
    };


    openMenuItem(item: string){
        this.playground.getMenuItemLink(item).click();
    };

    async openCard(text: string){
        await this.playground.getCardLink(text).click();
        await expect(this.playground.getCardTitle(text)).toBeVisible();
        
    };

    

    cardsAreOpened(condition: boolean,cards: string[]){
        let titles = [];
        titles = this.playground.getCardTitles(cards);
        this.page.waitForTimeout(1000);
        if(condition === true){
            titles.forEach((title) => {
                expect(title).toBeVisible();
            })
        } else {
            titles.forEach((title) => {
                expect(title).toBeHidden();
            })
        };
        
    };
    






}