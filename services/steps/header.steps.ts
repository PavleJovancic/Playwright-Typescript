import { Expect, Page } from "@playwright/test";
import Header from "../pages/header.page";

export default class HeaderSteps{
    private page: Page;
    private header: Header;

    constructor(page: Page, header: Header){
        this.page = page;
        this.header = header;
    };



} 