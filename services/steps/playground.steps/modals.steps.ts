import { expect, Page } from "@playwright/test";
import Playground from "../../pages/playground.page";
import * as data from '../../../test-data/data.json'

export default class ModalsSteps{
    private page: Page;
    private playground: Playground;

    constructor(page: Page, playground: Playground){
        this.page = page;
        this.playground = playground;
    };

    async selectAllModals(){
        await this.playground.getSelectAllModals().click();
    };


    async alertDialog(){
        /////////HOW IT SHOULD BE ///////
        // await this.page.on('dialog', async dialog => {
        //     // Verify type of dialog
        //     expect(dialog.type()).toContain('alert');
        //     expect(dialog.message()).toContain('Alert');
        //    
            
        // });

        await this.playground.getAlertButton().click();
        expect(await this.playground.getAlertText().innerText()).toBe('Alert');
        await expect(this.playground.getAlertOKButton()).toBeVisible();
    };

    async confirmDialog(url: string){
        await this.playground.getConfirmButton().click();
        expect(await this.playground.getConfirmText().innerText()).toBe('Confirm');
        await expect(this.playground.getConfirmCancelButton()).toBeVisible();

        const pagePromise = this.page.context().waitForEvent('page');
        await this.playground.getConfirmOKButton().click();
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL(url);
    };

};