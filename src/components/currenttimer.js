import { CurrentTextElement } from './currenttextelement.js'
import { CHANELS } from '../services/chanels.js';
import { FormatDate } from '../services/formatdate.js';
import {css} from 'lit-element'
class CurrentTimer extends CurrentTextElement {
    constructor() {
        super(CHANELS.CHANGETIMER, FormatDate.getTimer)
    }
    static get styles() {
        return css`
            :host{
                font-size:3rem;
                font-weight: lighter;
            }
        `;
    }
    
}
customElements.define('bcn-timer',CurrentTimer);