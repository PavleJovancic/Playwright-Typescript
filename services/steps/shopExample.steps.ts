import { expect, Page } from "@playwright/test";
import Shop from "../pages/shopExample.page";


export default class ShopSteps{
    private page: Page;
    private shop: Shop;

    constructor(page: Page, shop: Shop){
        this.page = page;
        this.shop = shop;
    };

 
    async collectPrices(){
        let pricesWithE = await this.shop.getItemPrices();
        let prices = [];
            pricesWithE.forEach(text=>{
                let price = text.slice(0, -1);
                prices.push(Number(price));
            });
            return prices;
    };

    async prices(){
        let itemPrices = await this.shop.getItemPrices();
        let unsortedPrices = [];
        itemPrices.forEach( text=>{
            let price = text.slice(0, -1);
            unsortedPrices.push(Number(price));
        });
        return unsortedPrices;
    };

    async sortPriceLowToHigh(){
        await expect(this.shop.getResetButton()).toBeDisabled();

        let unsortedPrices = await this.prices();
        let sortedPrices = unsortedPrices.toSorted((a, b) =>{return a-b});

        await this.shop.getSortBy().selectOption("Price:lowtohigh");
        expect(await this.collectPrices()).toEqual(sortedPrices);

        await this.shop.getResetButton().click();
        expect(await this.collectPrices()).toEqual(unsortedPrices);
    };

    async sortPriceHighToLow(){
        await expect(this.shop.getResetButton()).toBeDisabled();

        let unsortedPrices = await this.prices();
        let sortedPrices = unsortedPrices.toSorted((a, b) =>{return b-a});

        await this.shop.getSortBy().selectOption("Price:hightolow");
        expect(await this.collectPrices()).toEqual(sortedPrices);

        await this.shop.getResetButton().click();
        expect(await this.collectPrices()).toEqual(unsortedPrices);
    };

    async removeDescriptionFromTitle(){
        let titles = [];
        console.log()
        let titleWithDesc = await this.shop.getItemTitles();
        let descriptions = await this.shop.getItemDescription();
        console.log(titleWithDesc)
        console.log(descriptions)
        for(let i = 0; i < titleWithDesc.length; i++){
            let parent = titleWithDesc[i];
            let child = descriptions[i];
            titles.push(parent.replace(child, ""));
            
        };
        console.log(titles)
        return titles;
    };

    async sortAlphabetically(){
        await expect(this.shop.getResetButton()).toBeDisabled();
    
        let unsortedTitles = await this.removeDescriptionFromTitle();

        await this.shop.getSortBy().selectOption("Name:alphabetically");

        let sortedTitles = await this.removeDescriptionFromTitle();
        expect(sortedTitles).toEqual(unsortedTitles.toSorted());

        await this.shop.getResetButton().click();
        let resetedTitles = await this.removeDescriptionFromTitle();
        expect(resetedTitles).toEqual(unsortedTitles);
    };

    async setSliderTo(range: number){
        await this.shop.getRange().fill(String(range));
        let itemPrices = await this.shop.getItemPrices();
        itemPrices.forEach( text=>{
            let price = Number(text.slice(0, -1));
            expect(price).toBeLessThanOrEqual(range);
        });
    };

    async clickOutOfStockButton(){
        let buttons = await this.shop.getItemButtons();
        buttons.forEach(async button => {
            if(await button.textContent() == "Out of stock"){
                expect(button).toBeDisabled();
            };
        });
    };

    async search(item: string){
        await this.shop.getSearch().dblclick();
        await this.shop.getSearch().fill(item);
        await this.shop.getSearch().press('Enter');
        let titles = await this.shop.getItemTitles();
        titles.forEach(title =>{
            expect(title.toUpperCase()).toContain(item.toUpperCase());
        });
    };

    async addToCart(item:string){
        let button = await this.shop.getItemCard(item);
        await button.scrollIntoViewIfNeeded();
        await button.click();
    };

    async cartIconNumber(num: number){
        let cartIcon = this.shop.getCartIcon();

        let cartIconNumber: number;
        let cssValue = await cartIcon.evaluate((element) =>{
            return window.getComputedStyle(element).getPropertyValue("--numberOfItemsInCart");
        })
        cartIconNumber = Number(cssValue.substring(1, cssValue.length -1));
        
        expect(cartIconNumber).toEqual(num);
    };

    async subtotalPrice(){
        this.shop.getCartIcon().click();
    };

    async openCart(){
        await this.shop.getCartIcon().click();
    };

    async price(item: string){
        let text =  await this.shop.getSubtotalPrice(item).innerText();
        let price = Number(text.replace(',','').slice(0, - 1));
        return price;
    };

    async increaseItemAmount(item: string){
        let text =(await this.shop.getPrice(item).innerText());
        let initialPrice = Number(text.substring(7, text.length -1));
        let subtotal = (await this.price(item));
        await this.shop.getIncreaseQuantity(item).click();
        let sum = subtotal + initialPrice;
        expect(await this.price(item)).toBe(Number(sum.toFixed(2)));      
    };

    async decreaseItemAmount(item: string){
        let text =(await this.shop.getPrice(item).innerText());
        let initialPrice = Number(text.substring(7, text.length -1));
        let subtotal = (await this.price(item));
        await this.shop.getDecreaseQuantity(item).click();
        let subtract = subtotal - initialPrice;
        expect(await this.price(item)).toBe(Number(subtract.toFixed(2)));
    };

    async calculateTotalPrice(){
        
        let subtotalPrices = await this.shop.getSubtotalPrices();
    
        let sum = 0;
        subtotalPrices.forEach(async (el) => {
            let price = Number(el.replace(',','').slice(0, - 1));
            sum = sum + price;
            let fixed = sum.toFixed(2);
            sum = Number(fixed);
        });
    
        let text = await this.shop.getTotalPrice().innerText();
    
        text = text.substring(13, text.length -1);
        let totalPrice = Number(text.replace(',',""));
        expect(totalPrice).toEqual(sum);
    };

    async buyProducts(){
        await this.shop.getBuyAllButton().click();
        let message = await this.shop.getSuccessfulPurchaseMessage().innerText();
        expect(message).toBe("Purchase successful");
        await this.shop.getSuccessfulPurchaseButton().click();
    };
};