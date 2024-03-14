import { Locator, Page } from "@playwright/test";
import * as selectors from '../../selectors.json';

export default class Footer{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    };


} 