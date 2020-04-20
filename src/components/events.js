import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js';
import { } from './eventitem.js'
import { CHANELS } from '../services/chanels.js'
import { EventService } from '../services/eventservice.js';
import { FormatDate } from '../services/formatdate.js';
import { CULTURE } from '../services/culture.js'
import { CONFIG } from '../services/config.js'
//TODO necesario?
//import { flexcolumn } from '../css/flexcolumn.js'
import { padding } from '../css/padding.js';
import { MixinPubSub } from '../services/mixins.js';


class Events extends MixinPubSub(LitElement) {
    _dayEvents;
    static get styles() {
        return [
            padding,
            css`
        :host{
            display:grid;
            grid-template-rows:2.188 auto;
            align-items: center;
        }`
        ]
    }
    static get properties() {
        return {
            objectDay: { type: Object },
            dayEvents: { type: Object }
        };
    }
    constructor() {
        super();
        this.objectDay = { date: new Date() }
        this.refreshDay(this.objectDay);
    }
    async refreshDay(objectDay){
        this.objectDay = objectDay;
        this.dayEvents = null;
        this.dayEvents = await EventService(objectDay.date);
    }
    render() {
        return html`
            <div>${FormatDate.getDay(this.objectDay.date)}</div>
            ${!this.dayEvents ?
                html`<div>${CULTURE[CONFIG.culture].noEvents}</div>` :
                html`${this.dayEvents.events.map(dayEvent => html`<event-item .item=${dayEvent}></event-item>`)}`
            }
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.getPub(this);
    }
    set pubSub(value) {
        super.pubSub = value;
        if (value) {
            super.pubSub.sub(CHANELS.SELECTEDDAY,
                (objectDay) => this.refreshDay(objectDay),
                null,
                this.disposables
            );
        }
    }
    get pubSub() {
        return super.pubSub;
    }
}
customElements.define('bcn-events', Events)