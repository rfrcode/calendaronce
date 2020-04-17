import { MixinPubSub, Disposables } from '../services/mixins.js'
import {CurrentTextElement} from './currenttextelement.js'
import { CHANELS } from '../services/chanels.js';
import { DateService } from '../services/dateservice.js'
import { FormatDate } from '../services/formatdate.js';
import pubsub from '../services/pubsub.js'


class CurrentMonth extends MixinPubSub(CurrentTextElement) {

    constructor() {
        super(CHANELS.CHANGEMONTH,FormatDate.getCurrentMonth,(date) => this.changeAutomaticMonth(date));
    }
    connectedCallback() {
        super.connectedCallback();
        this.getPub(this);
    }
    set pubSub(value) {
        super.pubSub=value;
        if (value) {
            super.pubSub.sub(CHANELS.CHANGEMANUALMONTH,
                (dif)=>this.changeManualMonth(dif),
                null,
                this.disposables
            );
        }
    }
    changeManualMonth(dif) {
        this.date = DateService.getNextOrPreviosMonth(this.date, dif)
    }
    changeAutomaticMonth(date) {
        if (!DateService.isCurrentMonth(DateService.getCurrentDate(), date)) {
            this.date = date;
        }
    }
    
}
customElements.define('bcn-currentmonth', CurrentMonth);
