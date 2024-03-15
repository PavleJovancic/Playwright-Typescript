import { Locator, Page } from "@playwright/test";
import * as selectors from '../../selectors.json';

export default class Footer{
    private page: Page;

    constructor(page: Page){
        this.page = page;
    };

    getLinkedIn(){
        return this.page.locator(selectors.footer.socials.linkedIn)
    }

    getYoutube(){
        return this.page.locator(selectors.footer.socials.youTube)
    }

    getSpotify(){
        return this.page.locator(selectors.footer.socials.spotify)
    }

    getInstagram(){
        return this.page.locator(selectors.footer.socials.instagram)
    }

    getFacebook(){
        return this.page.locator(selectors.footer.socials.facebook)
    }

    public getHomeLink(){
        return this.page.locator(selectors.header.menu).getByText('Home')
    }

    public getUIPlaygroundLink(): Locator {
        return this.page.locator(selectors.header.menu).getByText('UI Playground')
       
    }

    public getShopExampleLink(): Locator{
        return this.page.locator(selectors.header.menu).getByText('Shop Example')
    }

    public getAPITrainingLink(){
        return this.page.locator(selectors.header.menu).getByText('API Training')
    }

    public getTestingPageLink(){
        return this.page.locator(selectors.header.menu).getByText('Testing Page')
    }

    public getWhiteboardLink(){
        return this.page.locator(selectors.header.menu).getByText('Whiteboard')
    }   



} 