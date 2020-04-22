import { CHANELS } from '../services/chanels.js'
import { DateService } from '../services/dateservice.js';
import { Day } from './currentday.js';
import pubsub from '../services/pubsub.js'
import { MixinPubSub, Disposables } from '../services/mixins.js';
import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js';

class DayGrid extends MixinPubSub(Disposables(LitElement)) {
    _click;
    static get styles() {
        return css`
        :host{
            display:grid;
            grid-template-columns: repeat(7,2.5rem);
            grid-template-rows: repeat(6, 2.5rem);
            gap: 0.375rem;
        }
    `
    }
    static get properties() {
        return {
            displayedMonth: { type: Object },
            selectedDate: { type: Object }
        }
    }
    constructor() {
        super();
        pubsub.sub(CHANELS.CHANGEMONTH, this.changeAutomaticMonth, this, this.disposables);
        pubsub.sub(CHANELS.CHANGEDAY, this.changeDay, this, this.disposables);
        this._click = this.click.bind(this);
        this.addEventListener('click', this._click);
        this.displayedMonth = this.selectedDate = DateService.getCurrentDate();
    }
    render() {
        return html`${DateService.getMonthCalendar(this.displayedMonth).map(
            objectDay => html`
                <bcn-day .objectDay="${Object.assign(objectDay, { selectedDate: this.selectedDate })}"</bcn-day>`)}`;
    }
    click(ev) {
        ev.stopPropagation();
        let day = ev.composedPath().filter(d => d instanceof Day)[0]; //event delegation
        if (day) {
            this.setSelectedDate(day.date);
        }
    }
    //TODO refactor to getter?
    setSelectedDate(date) {
        this.pubSub.pub(CHANELS.SELECTEDDAY, { date })
        this.selectedDate = date;
    }
    changeDay(date) {
        this.requestUpdate();
    }
    changeAutomaticMonth(date) {
        if (DateService.isCurrentMonth(date, this.displayedMonth)) {
            this.displayedMonth = date;
        }
    }
    changeManualMonth(dif) {
        this.displayedMonth = DateService.getNextOrPreviosMonth(this.displayedMonth, dif);
    }
    connectedCallback() {
        super.connectedCallback();
        this.getPub(this);
    }
    set pubSub(value) {
        super.pubSub = value;
        if (value) {
            super.pubSub.sub(CHANELS.CHANGEMANUALMONTH,
                (dif) => this.changeManualMonth(dif),
                null,
                this.disposables
            );
        }
    }
    get pubSub() {
        return super.pubSub;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispose();
        this.removeEventListener('click', this._click);
    }
}

customElements.define('bcn-daygrid', DayGrid)