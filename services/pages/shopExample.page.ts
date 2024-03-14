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

    getItemCard(item: string){
        return this.page.locator(selectors.shopExample.card).filter({hasText: item}).getByRole('button')
    }

    getCartIcon(){
        return this.page.locator(selectors.shopExample.cartIcon)
    }

    getPrice(item){
        return this.getCartItem(item).locator(selectors.shopExample.price).getByText("Price:")
    }

    getSubtotalPrice(item){
        return this.getCartItem(item).locator(selectors.shopExample.subtotalPrice)
    }


    getDecreaseQuantity(item){
        return this.getCartItem(item).locator(selectors.shopExample.changeQuantity).nth(0)
    }

    getIncreaseQuantity(item){
        return this.getCartItem(item).locator(selectors.shopExample.changeQuantity).nth(1)
    }

    getQuantity(){
        return this.page.locator(selectors.shopExample.quantity)
    }
    getCartItem(item){
        return this.page.locator(selectors.shopExample.cartItem).filter({hasText: item})
    }

    getSubtotalPrices(){
        return this.page.locator(selectors.shopExample.subtotalPrice).allInnerTexts()
    }

    getTotalPrice(){
        return this.page.locator(selectors.shopExample.totalPrice)
    }

    getBuyAllButton(){
        return this.page.locator(selectors.shopExample.buyAll)
    }

    getSuccessfullPurchaseMessage(){
        return this.page.locator(selectors.shopExample.succesfullPurchaseMessage)
    }

    getSuccessfullPurchaseButton(){
        return this.page.locator(selectors.shopExample.succesfullPurchaseButton)
    }


    



}