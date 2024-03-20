import { Locator, Page } from "@playwright/test";
import * as selectors from '../../selectors.json';

export default class Header{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    };
    
    getHomeLink(){
        return this.page.locator(selectors.header.home);
    };

    public getUIPlaygroundLink(): Locator {
        return this.page.locator(selectors.header.uiPlayground);
    };

    public getShopExampleLink(): Locator{
        return this.page.locator(selectors.header.shopExample);
    };

    public getAPITrainingLink(): Locator{
        return this.page.locator(selectors.header.apiTraining);
    };

    public getTestingPageLink(): Locator{
        return this.page.locator(selectors.header.testingPage);
    };

    public getWhiteboardLink(): Locator{
        return this.page.locator(selectors.header.whiteboard);
    };

    public getLogo(): Locator{
        return this.page.locator(selectors.header.logo);
    };

    getLogoutButton(): Locator{
        return this.page.locator(selectors.header.logout);
    };
};