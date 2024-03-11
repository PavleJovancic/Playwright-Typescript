import { Locator, Page } from "playwright/test";
import * as selectors from '../../selectors.json';

export default class Shop{

    private page: Page;

    constructor(page: Page){
        this.page = page;
    }

    getSortBy(): Locator{
        return this.page.locator(selectors.shopExample.sortBy)
    }

    getSearch(): Locator{
        return this.page.locator(selectors.shopExample.search)
    }

    getRange(): Locator{
        return this.page.locator(selectors.shopExample.range)
    }

    getResetButton(): Locator{
        return this.page.locator(selectors.shopExample.reset)
    }

    async getItemTitles(){
        await this.page.waitForTimeout(1000)
        return await this.page.locator(selectors.shopExample.itemTitle).allTextContents()
       
    }
    async getItemTitle(item){
        await this.page.waitForTimeout(1000)
        return await this.page.locator(selectors.shopExample.itemTitle).getByText(item)
       
    }


    async getItemDescription(){
        await this.page.waitForTimeout(1000)
        return await this.page.locator(selectors.shopExample.itemDescription).allTextContents()
    }

    async getItemPrices(){
        await this.page.waitForTimeout(1000)
        return await this.page.locator(selectors.shopExample.itemPrice).allTextContents()
        
    }

    async getItemButtons(){
        await this.page.waitForTimeout(1000)
        return this.page.locator(selectors.shopExample.itemButton).all()
    }
    async getItemButton(){
        await this.page.waitForTimeout(1000)
        return this.page.locator(selectors.shopExample.itemButton)
    }

    async getItemCard(item: string){
        return await this.page.locator(selectors.shopExample.card).filter({has: (await this.getItemTitle(item)) })
    }

    



}