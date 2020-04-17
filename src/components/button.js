import {CHANELS} from '../services/chanels.js';
import { LitElement, html } from '../../node_modules/lit-element/lit-element.js'

import pubsub from '../services/pubsub.js';
import { } from '../services/mixins.js';

const NEXT = 1;
const PREVIOUS = -1;
const DEFAULTATTRIBUTE = 'previous';

class Button extends LitElement {
    #action
    constructor(){
        super();
        this.addEventListener('click', this.emit.bind(this));
    }

    connectedCallback() {
        super.connectedCallback();
        this.#action = this.hasAttribute(DEFAULTATTRIBUTE) ? PREVIOUS : NEXT;
    }
    render() {
        return html`
          <button @click="${this.emit}"></button>
        `;
      }
    
    emit(ev) {
        ev.stopPropagation();
        pubsub.pub(CHANELS.CHANGEMANUALMONTH, this.#action);
    }
}

customElements.define('bcn-calendarbutton', Button);