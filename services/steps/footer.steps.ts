import { Expect, Page } from "@playwright/test";
import Footer from "../pages/footer.page"

export default class FooterSteps{
    private page: Page;
    private footer: Footer;

    constructor(page: Page, footer: Footer){
        this.page = page;
        this.footer = footer;
    };


} 