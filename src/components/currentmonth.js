import { CHANELS } from '../services/chanels.js';
import { FormatDate } from '../services/formatdate.js';
import { CurrentTextElement } from './currenttextelement.js'
import { DateService } from '../services/dateservice.js'
import { MixinPubSub, Disposables } from '../services/mixins.js'

class CurrentMonth extends MixinPubSub(Disposables(CurrentTextElement)) {
    static get properties() {
        return {
            date: { type: Object }
        };
    }
    constructor() {
        super(CHANELS.CHANGEMONTH, FormatDate.getCurrentMonth);
        this.date = DateService.getCurrentDate();
    }

    changeManualMonth(dif) {
        this.date = DateService.getNextOrPreviosMonth(this.date, dif)
    }

    changeAutomaticMonth(newDate) {
        if (DateService.isNextMonth(this.date, newDate)) {
            this.date = newDate;
        }
    }

    connectedCallback() {
        super.connectedCallback();
        this.getPub();
        this.pubSub.sub(CHANELS.CHANGEMANUALMONTH, this.changeManualMonth, this, this.disposables);
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispose();
    }
}

customElements.define('bcn-currentmonth', CurrentMonth);
