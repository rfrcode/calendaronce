import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js'

export class Day extends LitElement {
    _objectDay;
    static get styles() {
        return css`
        :host{
            display: flex;
            justify-content: center;
            align-items: center;
            box-sizing: border-box;
        
        }
        
        :host([today]){
            background-color: var(--calendar-highlighted-color);
            font-weight: var(--calendar-today-font-weight);
            outline: 0.125rem solid var(--calendar-highlighted-color);
        }
    
        :host([selected]){
            outline: 0.125rem solid var(--calendar-highlighted-color);
        }
    
        :host([today][selected]){
            border: 0.125rem solid var(--calendar-internal-border-color);
        }

        :host(:hover) {     
            outline: 0.125rem solid var(--calendar-greyed-color);
         }
    
        :host([selected]:hover){
            outline: 0.125rem solid var(--calendar-darker-highlighted-color);
        }

        :host([today]:hover){
            outline: 0.125rem solid var(--calendar-secondary-color);
        }
    
        :host(:not([selected]):not([today])[notinmonth]) {    
            color: var(--calendar-greyed-color);
        }
    `;
    }
    static get properties() {
        return {
            dayOfTheMonth: { type: Number },
            selected: { type: Boolean, reflect: true },
            today: { type: Boolean, reflect: true },
            notInMonth: { type: Boolean, reflect: true },
        };
    }
    render() {
        return html`${this.dayOfTheMonth}`;
    }
    set objectDay(value) {
        this._objectDay = value;
        this.dayOfTheMonth = value.date.getDate();
        this.today = value.isToday;
        this.notInMonth = !value.isCurrentMonth;
    }
    get objectDay() {
        return this._objectDay;
    }
}

customElements.define('bcn-day', Day)