import { Locator, Page } from "@playwright/test";
import * as selectors from '../../selectors.json';

export default class Footer{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    };

    getLinkedIn(): Locator{
        return this.page.locator(selectors.footer.socials.linkedIn);
    };

    getYoutube(): Locator{
        return this.page.locator(selectors.footer.socials.youTube);
    };

    getSpotify(): Locator{
        return this.page.locator(selectors.footer.socials.spotify);
    };

    getInstagram(): Locator{
        return this.page.locator(selectors.footer.socials.instagram);
    };

    getFacebook(): Locator{
        return this.page.locator(selectors.footer.socials.facebook);
    };

    getHomeLink(): Locator{
        return this.page.locator(selectors.footer.home);
    };

    getUIPlaygroundLink(): Locator {
        return this.page.locator(selectors.footer.uiPlayground);
    };

    getShopExampleLink(): Locator{
        return this.page.locator(selectors.footer.shopExample);
    };

    getAPITrainingLink(): Locator{
        return this.page.locator(selectors.footer.apiTraining);
    };

    getTestingPageLink(): Locator{
        return this.page.locator(selectors.footer.testingPage);
    };

    getWhiteboardLink(): Locator{
        return this.page.locator(selectors.footer.whiteboard);
    };

};