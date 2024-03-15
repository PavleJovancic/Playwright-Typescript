import { Locator, Page } from "@playwright/test";
import * as selectors from '../../selectors.json';

export default class Header{

    constructor(page: Page){
        this.page = page;
    };
    private page: Page;


    public getHomeLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('Home')
    }

    public getUIPlaygroundLink(): Locator {
        return this.page.locator(selectors.header.navigationBar).filter({hasText: "UI Playground"})
       
    }

    public getShopExampleLink(): Locator{
        return this.page.locator(selectors.header.navigationBar).getByText('Shop Example')
    }

    public getAPITrainingLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('API Training')
    }

    public getTestingPageLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('Testing Page')
    }

    public getWhiteboardLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('Whiteboard')
    }   

    public getLogo(){
        return this.page.locator(selectors.header.logo)
    }

}