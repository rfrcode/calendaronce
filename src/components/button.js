import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js'
import { button } from '../css/button.js'
import {CHANELS} from '../services/chanels.js';


import pubsub from '../services/pubsub.js';
import {MixinPubSub, Disposables } from '../services/mixins.js';


const NEXT = 1;
const PREVIOUS = -1;
const DEFAULTATTRIBUTE = 'previous';

class Button extends MixinPubSub(Disposables(LitElement)){ 
    _action
    
    /*
    static get styles() {
        return [
            button,
            css`
                :
                host{
                    color:var(--calendar-color);
                    background-color: var(--calendar-background);
                    cursor: default;
                    user-select: none;
                    width:20rem;
                }
            `
        ];
    }
       
    
    */
    constructor(){
        super();
        this.getPub();
        
    }

    connectedCallback() {
        super.connectedCallback();
        this._action = this.hasAttribute(DEFAULTATTRIBUTE) ? PREVIOUS : NEXT;
    }
    render() {
        return html`
          <button @click="${this.emit}"></button>
        `;
      }
    
    emit(ev) {
        ev.stopPropagation();
        pubsub.pub(CHANELS.CHANGEMANUALMONTH, this._action);
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispose();
    }

}

customElements.define('bcn-calendarbutton', Button);