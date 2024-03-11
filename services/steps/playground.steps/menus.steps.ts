import { expect, Page } from "@playwright/test";
import Playground from "../../pages/playground.page";
import * as data from '../../../test-data/data.json'

export default class MenusSteps{
    private page: Page;
    private playground: Playground;

    constructor(page: Page, playground: Playground){
        this.page = page;
        this.playground = playground;
    };

    async selectAllMenus(){
        await this.playground.getSelectAllMenus().click()
    }
    
}