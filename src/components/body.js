import { NEXT, PREVIOUS } from './calendarbutton.js'
import { html, css, LitElement } from 'lit-element';
import { flexcolumn } from '../css/flexcolumn.js'
import { padding } from '../css/padding.js'
import { } from './currentmonth.js'
import { } from './daysofweek.js'
import { } from './daygrid.js'

class CalendarBody extends LitElement {
    static get styles() {
        return [
            flexcolumn,
            padding,
            css`
                :host{
                    border-bottom: 1px solid;
                }
                .container{
                    display:grid;
                    grid-template-columns: repeat(7,2.5rem);
                    grid-template-rows:2.5rem;
                    gap:0.375rem;
                    align-items: center;
                }
                bcn-currentmonth{
                    grid-column-start: 1;
                    grid-column-end:6;
                }
        `]

    }
    render() {
        return html`
            <div class="container">
                <bcn-currentmonth></bcn-currentmonth>
                <bcn-calendarbutton .action="${PREVIOUS}"></bcn-calendarbutton>
                <bcn-calendarbutton .action="${NEXT}"></bcn-calendarbutton>
            </div>
            <bcn-daysofweek></bcn-daysofweek>
            <bcn-daygrid></bcn-daygrid>
        `;
    }
}
customElements.define('bcn-calendar-body', CalendarBody);
