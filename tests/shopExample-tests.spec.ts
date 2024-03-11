import {Locator, expect, test} from '@playwright/test';
import Shop from '../services/pages/shopExample.page';
import ShopSteps from '../services/steps/shopExample.steps';
import Login from '../services/pages/login.page';
import LoginSteps from '../services/steps/login.steps';
import * as data from '../test-data/data.json';
import * as urls from '../test-data/urls.json';
import * as loginData from '../test-data/loginInformation.json';


test.describe("Shop Example", () => {

    let login: Login,
        loginSteps: LoginSteps,
        shop: Shop,
        shopSteps: ShopSteps;
    
    test.beforeEach(async ({page}) =>{

        login= new Login(page);
        loginSteps= new LoginSteps(page, login);
        shop= new Shop(page);
        shopSteps= new ShopSteps(page, shop);

        await page.goto(urls.shopExample, {waitUntil: 'domcontentloaded'});
        await loginSteps.login(loginData.email, loginData.password)

    })


    test("Sorting dropdown - Price: low to high ", async () => {
    
        await shopSteps.sortPriceLowToHigh()
    })

    test("Sorting dropdown - Price: high to low  ", async () => {

        await shopSteps.sortPriceHighToLow()


    })

    test("Sorting dropdown - Name: Alphabetically", async () => {

        await shopSteps.sortAlphabetically()


    })

    test("Price slider ", async () => {

        await shopSteps.setSliderTo(1025)
        await shopSteps.setSliderTo(2398)
        await shopSteps.setSliderTo(400)
        await shopSteps.setSliderTo(999)


    })

    test("out of stock items ", async () => {

        await shopSteps.clickOutOfStockButton()

    })

    test("Search input field filter ", async () => {

        
        await shopSteps.search("tv")
        await shopSteps.search("asus")
        await shopSteps.search("smart")
        await shopSteps.search("wi")
    })

    test("Adding items to cart @testing", async () => {
    
        await shopSteps.addToCart('tv')
        
        
    })

    test("Cart item amount increase ", async () => {
        
        // Given user is on the "Shop Example" page
        // When user scrolls down to the item list
        // And add one to-cart item by clicking on the "Add to cart" button
        // And clicks on the "Cart" button
        // And click on the "+" button to add the item quantity
        // Then the price equals the sum of the quantity of items added
        
    })

    test("Cart item amount decrease", async () => {

        
// Given user is on the "Shop Example" page
// When user scrolls down to the item list
// And add to cart one item by clicking on the "Add to cart" button
// And click on the "Cart" button
// And click on the "+" button to add the item quantity
// Then the item quantity increased
// And then click on the "-" button to reduce the item quantity
// Then the item quantity decrease

    })

    test("Total price calculation in cart", async () => {
        
        // Given user is on the "Shop Example" page
        // When user scrolls down to the item list
        // And add to cart three (3) items by clicking on the "Add to cart" button
        // And click on the "Cart" button
        // Then the price equals the sum of all item prices in the cart
        
    })

    test("Erase item from cart", async () => {

        
// Given user is on the "Shop Example" page
// When user scrolls down to the item list
// And add to cart three (3) items by clicking on the "Add to cart" button
// And click on the "Cart" button
// Then the items are visible
// And user clicks on the "Trash bin" icon on the right of the it
    })

    test("Buy now button check", async () => {

        
        // Given user is on the "Shop Example" page
        // When user scrolls down to the item list
        // And add to cart three (3) items by clicking on the "Add to cart" button
        // And click on the "Cart" button
        // Then the cart appears
        // When user clicks on "Buy all" button
        // Then the pop-up message appears that the purchase is successfu
    })

    test(" Back to top button", async () => {

       
// Given user is on the "Shop Example" page
// When scrolling down to the bottom of the page
// And user clicks on the "Scroll-to-top" button
// Then user is redirected to the top of the page

      
    })

   
    

})