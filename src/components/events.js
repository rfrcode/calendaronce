import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js';
import { } from './eventitem.js'
import { CHANELS } from '../services/chanels.js'
import { EventService } from '../services/eventservice.js';
import { FormatDate } from '../services/formatdate.js';
import { CULTURE } from '../services/culture.js'
import { CONFIG } from '../services/config.js'
import { flexcolumn } from '../css/flexcolumn.js'
import { padding } from '../css/padding.js';
import { MixinPubSub, Disposables } from '../services/mixins.js';


class Events extends MixinPubSub(Disposables(LitElement)) {
    static get properties(){
        return {dayEvents:{type:Object}}
    }
    static get styles() {
        return [
            flexcolumn,
            padding,
            css`
        :host{
            display:grid;
            grid-template-rows:2.188rem auto;
            align-items: center;
        }`
        ]
    }

    constructor() {
        super();
        this.objectDay = { date: new Date() }
        this.refreshDay(this.objectDay);
    }
     async refreshDay(objectDay){
        this.objectDay = objectDay;        
        this.dayEvents = await EventService(objectDay.date);
    }
    render() {
        return html`
            <div>${FormatDate.getDay(this.objectDay.date)}</div>
            ${!this.dayEvents?
                html`<div>${CULTURE[CONFIG.culture].noEvents}</div>` :
                html`${this.dayEvents.events.map(dayEvent => html`<event-item .item=${dayEvent}></event-item>`)}`
            }
        `;
    }
    connectedCallback() {
        super.connectedCallback();
        this.getPub(this);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispose();
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