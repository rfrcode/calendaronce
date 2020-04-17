import {CONFIG} from '../services/config.js';
import {CULTURE} from '../services/culture.js';
import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js'
class DaysOfWeek extends LitElement{

    static get styles() {
        return css`
        :host{
            display:grid;
            grid-template-columns: repeat(7,2.5rem);
            gap: 0.375rem;
            height:2.5rem;
        }
        div{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        `;
    }

    render() {
        return html `
            ${CULTURE[CONFIG.culture].daysOfWeek.map(day => html`<div>${day}</div>`)}
       `;
     }

}

customElements.define('bcn-daysofweek',DaysOfWeek);
