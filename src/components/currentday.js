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
            background-color:  rgb(0, 120, 215);
            padding:0.125rem;
    /*         color: white; */
            font-weight: bolder;
            outline: 0.125rem solid rgb(0, 120, 215);
        }
    
        :host([selected]){
            outline: 0.125rem solid rgb(0, 120, 215);
        }
    
        :host([today][selected]){
            background-color: rgb(0, 120, 215);
            border: 0.125rem solid black;
            outline: 0.125rem solid rgb(0, 120, 215);
        }
    
        :host([today][selected]:hover){
            background-color: rgb(0, 120, 215);
            border: 0.125rem solid black;
            outline: 0.125rem solid rgb(102, 174, 231);
        }
    
        :host([today]:not([selected]):hover){
            background-color: rgb(0, 120, 215);
            outline: 0.125rem solid rgb(102, 174, 231);
        }
    
        :host(:not([selected]):not([today]):hover) {     
            outline: 0.125rem solid grey;
         }
    
        :host(:not([selected]):not([today])[notinmonth]) {    
            color: grey;
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