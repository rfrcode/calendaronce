import { LitElement, html, css } from 'lit-element'
import { flexcolumn } from '../css/flexcolumn.js'
import { padding } from '../css/padding.js';
class CalendarBody extends LitElement {
    static get styles() {
        const style = css`
            :host{
                border-bottom: 1px solid;
            }
        `;
        return [style, flexcolumn, padding];
    }
    render() {
       return html`<div class='container'>
                       <bcn-currentmonth></bcn-currentmonth>
                       <bcn-calendarbutton previous></bcn-calendarbutton>
                       <bcn-calendarbutton next></bcn-calendarbutton>
                   </div>
        `
    }
}

customElements.define('bcn-calendar-body', CalendarBody);



