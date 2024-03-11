import { expect, Page } from "@playwright/test";
import Playground from "../../pages/playground.page";


export default class InputsSteps{
    private page: Page;
    private playground: Playground;

    constructor(page: Page, playground: Playground){
        this.page = page;
        this.playground = playground;
    };

    async selectAllInputs(){
        await this.playground.getSelectAllInputs().click();
    };

    //Calendar input

    async setDate(day: string, month: string, year: string){
        await this.playground.getCalendarInput().fill(year + "-" + month + "-" + day);
        let value = await this.playground.getCalendarInput().getAttribute('data-value');
        expect(value).toEqual(year + "-" + month + "-" + day);
    };

    async startProgress(){
        await this.playground.getStartProgressButton().click();
        await expect(this.playground.getProgressBar()).toBeVisible();
        await this.playground.getStartProgressButtonText().getByText("Start progress").waitFor({state:'visible'});
        await expect(this.playground.getProgressBar()).toBeHidden();
    };

    //Radio buttons

    async checkRadioButton(button: string){
        if(button=="first"){
            await this.playground.getFirstRadioButton().check();
            await expect(this.playground.getSecondRadioButton()).not.toBeChecked();
            await expect(this.playground.getThirdRadioButton()).not.toBeChecked();
        } else if(button=="second"){
            await this.playground.getSecondRadioButton().check();
            await expect(this.playground.getFirstRadioButton()).not.toBeChecked();
            await expect(this.playground.getThirdRadioButton()).not.toBeChecked();
        } else if(button=="third"){
            await this.playground.getThirdRadioButton().check();
            await expect(this.playground.getFirstRadioButton()).not.toBeChecked();
            await expect(this.playground.getSecondRadioButton()).not.toBeChecked();
        };
    };

    //Checkbox input
    async clickFirstCheckbox(){
        await this.playground.getFirstCheckbox().check();
    };

    async clickSecondCheckbox(){
        await this.playground.getSecondCheckbox().check();
    };

    async clickThirdCheckbox(){
        await this.playground.getThirdCheckbox().check();
    };

    async clickSelectAllCheckbox(){
        await this.playground.getSelectAllCheckbox().check()
        if(await this.playground.getSelectAllCheckbox().innerText() == 'Select all'){
            await expect(this.playground.getFirstCheckbox()).toBeChecked();
            await expect(this.playground.getSecondCheckbox()).toBeChecked();
            await expect(this.playground.getThirdCheckbox()).toBeChecked();
        } else if(await this.playground.getSelectAllCheckbox().innerText() == 'Unselect'){
            await expect(this.playground.getFirstCheckbox()).toBeChecked();
            await expect(this.playground.getSecondCheckbox()).toBeChecked();
            await expect(this.playground.getThirdCheckbox()).toBeChecked();
        };
         
    };

    //Country input

    async selectCountry(country: string){
        let countryInput = this.playground.getCountryInput();
        expect(await countryInput.getAttribute('placeholder')).toEqual('Search countries...');

        await countryInput.click();
        let countries = this.playground.getCountryInputList();
        await expect(countries).toHaveCount(248);

        await countryInput.fill(country);
        countries = this.playground.getCountryInputList();
        await expect(countries).toHaveCount(1);
        await expect(countries).toContainText(country);
    
        await countries.click();
        expect(await countryInput.getAttribute('data-value')).toEqual(country);
    };

    //Range sliders


    async moveRangeSlider(){
        let randomRange = Math.floor(Math.random() * (100 - 0 + 1)) + 0;

        const sliderBound = await this.playground.getRangeSlider().boundingBox();
        
        const targetX = sliderBound.x + (sliderBound.width * 0.5);
        const targetY = sliderBound.y + sliderBound.height/2;
       
        await this.page.mouse.move(targetX, targetY);
        await this.page.mouse.down();

        await this.page.mouse.move(sliderBound.x + sliderBound.width * randomRange / 100, sliderBound.y + sliderBound.height / 2);
        await this.page.mouse.up();

        expect(await this.playground.getRangeSlider().getAttribute('data-value')).toEqual(await this.playground.getRangeNumber().innerText());

    };

    async moveMultiRangeSlider(){
        let randomRangeOne = (Math.floor(Math.random() * (50 - 1 + 1)) + 1).toString();
        let randomRangeTwo =  (Math.floor(Math.random() * (100 - 50 + 1)) + 50).toString();

        await this.playground.getMultiSliderOne().fill(randomRangeOne);
        expect(await this.playground.getMultiSliderOne().getAttribute('data-value')).toEqual(randomRangeOne);

        await this.playground.getMultiSliderTwo().fill(randomRangeTwo);
        expect(await this.playground.getMultiSliderTwo().getAttribute('data-value')).toEqual(randomRangeTwo);
    };

    async enterCode(inputNumber: number, code: number){
        await this.playground.getVerificationCodeInput(inputNumber).fill("" + code);
    };

    async isCodeCorrect(condition:boolean){   
        if(condition){
            for(let i = 0; i< 6; i++){
                expect(await this.playground.getVerificationCodeInput(i).getAttribute('class')).toEqual('correct-code');
            };
        } else {
            for(let i = 0; i< 6; i++){
                expect(await this.playground.getVerificationCodeInput(i).getAttribute('class')).toEqual('wrong-code');
            };
        };
    };  
};

  

    
