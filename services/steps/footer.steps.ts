import {Page, expect } from "@playwright/test";
import Footer from "../pages/footer.page"

export default class FooterSteps{
    private page: Page;
    private footer: Footer;

    constructor(page: Page, footer: Footer){
        this.page = page;
        this.footer = footer;
    };


    async openLinkedinLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getLinkedIn().click()
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL("https://www.linkedin.com/company/badin-soft/");
        await this.closeTab()
    }
    async openYoutubeLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getYoutube().click()
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL("https://www.youtube.com/channel/UCRRAMb1FYTxE2yH90qstr5Q");
        await this.closeTab()
    }
    async openSpotifyLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getSpotify().click()
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL("https://open.spotify.com/show/7H5AfQ09ujsRNUhMt2Rdgw?si=0a51070ade674e82&nd=1");
        await this.closeTab()
    }
    async openInstagramLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getInstagram().click()
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL("https://www.instagram.com/badin.soft/");
        await this.closeTab()
    }
    async openFacebookLink(){
        const pagePromise = this.page.context().waitForEvent('page');
        await this.footer.getFacebook().click()
        const newPage = await pagePromise;
        await expect(newPage).toHaveURL("https://www.facebook.com/badinsoft/");
        await this.closeTab()
    }

    async closeTab(){
        let allpages = this.page.context().pages()
        await allpages[1].close()
    }

    async openHomeLink(){
        await this.footer.getHomeLink().click()
    }

    async openUIPlaygroundLink(){
        await this.footer.getUIPlaygroundLink().click()
    }

    async openShopExampleLink(){
        await this.footer.getShopExampleLink().click()
    }

    async openAPITrainingLink(){
        await this.footer.getAPITrainingLink().click()
    }

    async openTestingPageLink(){
        await this.footer.getTestingPageLink().click()
    }

    async openWhiteboardLink(){
        await this.footer.getWhiteboardLink().click()
    }

    async verifyCorrectPage(url, page){
        await expect(page).toHaveURL(url)
    }

   

} 