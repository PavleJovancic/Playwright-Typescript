import { expect, Page } from "@playwright/test";
import Playground from "../../pages/playground.page";
import * as fs from 'fs';

export default class ButtonsSteps{
    private page: Page;
    private playground: Playground;

    constructor(page: Page, playground: Playground){
        this.page = page;
        this.playground = playground;
    };


    //Buttons
    async selectAllButtons(){
        await this.playground.getSelectAllButtons().click();
    };

    //Open new tab button

    async openNewTabAndCheckUrl(url:string){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.playground.getOpenNewTabButton().click();
        const newPage = await pagePromise;
        expect(newPage).toHaveURL(url);
    };
  
    //Download PDF
    
    async clickDownloadButton(){
        await this.playground.getDownloadButton().click();
    };    
    
    async downloadAndComparePDFs(){
        // Start waiting for download before clicking. Note no await.
        // 
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.clickDownloadButton()
        ]);
        
        // Use the suggested filename from the download event to save the file
        const suggestedFileName = download.suggestedFilename();
        const filePath = './testFiles/' + suggestedFileName;
        await download.saveAs(filePath);
        
        // Use the 'pdf-parse' module to extract the text from the PDF file
        let pdf = require('pdf-parse');
        let actualDataBuffer = fs.readFileSync('./testFiles/' + suggestedFileName);
        let expectedDataBuffer = fs.readFileSync('./testFiles/expected.pdf')
        await pdf(actualDataBuffer).then((data) =>{
            fs.writeFileSync('./testFiles/actual.txt', data.text);
        });
        await pdf(expectedDataBuffer).then((data) =>{
            fs.writeFileSync('./testFiles/expected.txt', data.text);
        });
        
        // Read the expected and actual values from the saved files
        let expectedText = fs.readFileSync('./testFiles/expected.txt', 'utf-8');
        let actualText = fs.readFileSync('./testFiles/actual.txt', 'utf-8');
        
        // Use the `expect` function from Playwright to assert that the values match
        expect(expectedText).toMatch(actualText);
    };
    
    //Mouse hover button
    
    async hoverOverHoverMeButton(){
        await this.playground.getHoverMeButton().hover();
    };

    async isHoverTextVisible(){
        expect(this.playground.getHoverText()).toBeVisible();
    };

    //Open new window button
  
    async openNewWindowAndCheckUrl(url:string){
        const pagePromise = this.page.context().waitForEvent('page')    ;
        await this.playground.getOpenNewWindowButton().click();
        const newPage = await pagePromise;
        expect(newPage).toHaveURL(url);
    };

    //Show and Hide buttons
  
    async clickShowButton(){
        await this.playground.getShowButton().click();
        await expect(this.playground.getInputField()).toHaveCSS('opacity', '1');
    };

    async clickHideButton(){
        await this.playground.getHideButton().click();
        await expect(this.playground.getInputField()).toHaveCSS('opacity', '0');
    };

    async writeInInputField(text: string){
        let inputField = this.playground.getInputField();
        await inputField.fill(text);
        expect(await inputField.getAttribute('data-value')).toEqual(text);
    };

    //Upload file button
    
    async uploadFileAndVerify(file: string){
        await this.playground.getChooseFileButton().setInputFiles("../../testFiles/" + file);
        let uploadedFileText = await this.playground.getUploadedFile().innerText();
        expect(uploadedFileText).toEqual(file);
    };


};