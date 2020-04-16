import {CONFIG} from '../services/config.js';
import {CULTURE} from '../services/culture.js';
import { LitElement, html, css } from 'lit-element'
class DayOfWeek extends LitElement{

    static get styles() {
        return css`
        :host{
            display:grid; 
            grid-template-columns: repeat(7,40px);
            gap:2px;
            height:40px;
        }
        div{
            display: flex;
            justify-content: center;
            align-items: center;
        }
        `;
    }

    render() {
        
        return html `${DayOfWeek}`;
    }
        /*return html `
        <div>
            <p>${DayOfWeek}</p>
        </div>`;
    }*/

    shouldUpdate(changedProperties) {
        changedProperties.forEach((oldValue, DayOfWeek) => {
          console.log(`${DayOfWeek} changed. oldValue: ${oldValue}`);
        });
        return changedProperties.has('DayofWeek');
    }
}

customElements.define('bcn-dayofweek',DayOfWeek);