import { expect, Locator, Page } from "@playwright/test";
import Shop from "../pages/shopExample.page";
import { text } from "stream/consumers";

export default class ShopSteps{
    private page: Page;
    private shop: Shop;

    constructor(page: Page, shop: Shop){
        this.page = page;
        this.shop = shop;
    }

    //create list with unsorted items
    // manualy sort and create list 
    //REMOVE $ sing
    // list.forEach(text=>{
    //     let price = text.slice(0, -1)
    //     newListWithoutDollarSign.push(price)
    // })
    // .sort() for ASC Letters, .reverse() for DESC Letters
    //.sort((a, b) =>{return a-b}) for ASC Numbers
    //.sort((a, b)=>{return b-a}) fro DSC Numbers
    //select sort
    // get list with authomaticaly sorted items
    //expect manualy sorted toEqual automaticaly sorted

    async collectPrices(){
        let pricesWithE = await this.shop.getItemPrices()
        let prices = []
            pricesWithE.forEach(text=>{
                let price = text.slice(0, -1)
                prices.push(Number(price))
            })
            return prices
    }

    async prices(){
        let itemPrices = await this.shop.getItemPrices()
        let unsortedPrices = []
        itemPrices.forEach( text=>{
            let price = text.slice(0, -1)
            unsortedPrices.push(Number(price))
        })
        return unsortedPrices

    }

    async sortPriceLowToHigh(){
        await expect(this.shop.getResetButton()).toBeDisabled()

        let unsortedPrices = await this.prices()
        let sortedPrices = unsortedPrices.toSorted((a, b) =>{return a-b})

        await this.shop.getSortBy().selectOption("Price:lowtohigh") 
        expect(await this.collectPrices()).toEqual(sortedPrices)

        await this.shop.getResetButton().click()
        expect(await this.collectPrices()).toEqual(unsortedPrices)

    }

    async sortPriceHighToLow(){
        await expect(this.shop.getResetButton()).toBeDisabled()

        let unsortedPrices = await this.prices()
        let sortedPrices = unsortedPrices.toSorted((a, b) =>{return b-a})

        await this.shop.getSortBy().selectOption("Price:hightolow")
        expect(await this.collectPrices()).toEqual(sortedPrices)

        await this.shop.getResetButton().click()
        expect(await this.collectPrices()).toEqual(unsortedPrices)
    }

    async removeDescriptionFromTitle(){
        let titles = []
        let titleWithDesc = await this.shop.getItemTitles()
        let descriptions = await this.shop.getItemDescription()
        for(let i = 0; i < titleWithDesc.length; i++){
            let parent = titleWithDesc[i]
            let child = descriptions[i]
            titles.push(parent.replace(child, ""))
        }
        return titles
    }

    async sortAlphabetically(){
        await expect(this.shop.getResetButton()).toBeDisabled()
    
        let unsortedTitles = await this.removeDescriptionFromTitle()

        await this.shop.getSortBy().selectOption("Name:alphabetically")

        let sortedTitles = await this.removeDescriptionFromTitle()
        expect(sortedTitles).toEqual(unsortedTitles.toSorted())

        await this.shop.getResetButton().click()
        let resetedTitles = await this.removeDescriptionFromTitle()
        expect(resetedTitles).toEqual(unsortedTitles)

    }

    async setSliderTo(range){
        await this.shop.getRange().fill(String(range))
        let itemPrices = await this.shop.getItemPrices()
        itemPrices.forEach( text=>{
            let price = Number(text.slice(0, -1))
            expect(price).toBeLessThanOrEqual(range)
        })
    }

    async clickOutOfStockButton(){
        let buttons = await (await this.shop.getItemButtons())
        buttons.forEach(async button => {
            if(await button.textContent() == "Out of stock"){
                expect(button).toBeDisabled()
            }
        });

    }

    async search(item: string){
        await this.shop.getSearch().dblclick()
        await this.shop.getSearch().fill(item)
        await this.shop.getSearch().press('Enter')
        let titles = await this.shop.getItemTitles()
        titles.forEach(title =>{
            expect(title.toUpperCase()).toContain(item.toUpperCase())
        })
    
    }

    async addToCart(item:string){

    await     this.page.waitForTimeout(10000)
    let button = await this.shop.getItemCard(item)
    console.log(button)
    button.isVisible()


    }



}