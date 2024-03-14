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

    test("Adding items to cart ", async () => {
    
        await shopSteps.addToCart('Ethernet CD8 switch')
        await shopSteps.addToCart('Smartwatch')
        await shopSteps.addToCart('Portable Charger')

        await shopSteps.cartIconNumber(3)
        
    })

    test("Buy products @testing", async () => {
        
        await shopSteps.addToCart('Ethernet CD8 switch')
        await shopSteps.addToCart('Smartwatch')
        await shopSteps.addToCart('Portable Charger')

        await shopSteps.openCart()

        await shopSteps.increaseItemAmount('Ethernet CD8 switch')
        await shopSteps.increaseItemAmount('Ethernet CD8 switch')
        await shopSteps.increaseItemAmount('Smartwatch')
        await shopSteps.increaseItemAmount('Portable Charger')
        await shopSteps.increaseItemAmount('Portable Charger')
        await shopSteps.increaseItemAmount('Portable Charger')

        await shopSteps.decreaseItemAmount('Smartwatch')
        await shopSteps.decreaseItemAmount('Portable Charger')
        await shopSteps.decreaseItemAmount('Portable Charger')
        await shopSteps.decreaseItemAmount('Ethernet CD8 switch')

        await shopSteps.calculateTotalPrice()

        await shopSteps.buyProducts()
    })

    

   
    

})