import {CHANELS} from '../services/chanels.js';
import {FormatDate} from '../services/formatdate.js';
import {CurrentTextElement} from './currenttextelement.js'
import {css} from 'lit-element'
class CurrentDate extends CurrentTextElement{
    constructor(){
        super(CHANELS.CHANGEDAY,FormatDate.getCurrentDate);
    }
    static get styles() {
        return css`
            :host{
                color:var(--calendar-secondary-color);
            }
        `;
    }
}

customElements.define('bcn-currentdate',CurrentDate);