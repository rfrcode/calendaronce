import { CHANELS } from '../services/chanels.js'
import { MixinPubSub } from '../services/mixins.js';
import { html, css, LitElement } from '../../node_modules/lit-element/lit-element.js';
import { button } from '../css/button.js'
export const NEXT = 1;
export const PREVIOUS = -1;
const CLASSPREVIOUS = 'previous';
const CLASSNEXT = 'next';

class CalendarButton extends MixinPubSub(LitElement) {

    static getproperties() {
        return {
            action: { type: Number }
        }
    }
    static get styles() {
        return [css`
           :host{
                width: 100%;
                height: 100%;
           }
        `, button];
    }
    constructor() {
        super();
        this.action = PREVIOUS;
    }
    connectedCallback() {
        super.connectedCallback();
        this.getPub();
    }
    handleClick(ev) {
        ev.stopPropagation();
        if (this.pubSub) {
            this.pubSub.pub(CHANELS.CHANGEMANUALMONTH, this.action);
        }
    }
    get clazz(){
        return this.action === PREVIOUS ? CLASSPREVIOUS : CLASSNEXT;
    }
    render() {
        return html`
        <button @click="${this.handleClick}">
            <i class="${this.clazz}"></i>
        </button>`
    }
}

customElements.define('bcn-calendarbutton', CalendarButton);