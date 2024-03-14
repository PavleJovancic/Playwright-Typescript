import { Locator, Page } from "@playwright/test";
import * as selectors from '../../selectors.json';

export default class Header{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    };

    async getHomeLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('Home')
    }

    async getUIPlaygroundLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('UI Playground')
    }

    async getShopExampleLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('Shop Example')
    }

    async getAPITrainingLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('API Training')
    }

    async getTestingPageLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('Testing Page')
    }

    async getWhiteboardLink(){
        return this.page.locator(selectors.header.navigationBar).getByText('Whiteboard')
    }   

    async getLogo(){
        return this.page.locator(selectors.header.logo)
    }

}