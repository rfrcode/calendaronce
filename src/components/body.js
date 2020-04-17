import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js'
import { flexcolumn } from '../css/flexcolumn.js'
import { padding } from '../css/padding.js'
import { } from './currentmonth.js'
import { } from './button.js'
import { } from './daysofweek.js'
import { CONFIG } from '../services/config.js'
import { CULTURE } from '../services/culture.js'

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
                       <bcn-calendarbutton previous alt='${CULTURE[CONFIG.culture].previous}'></bcn-calendarbutton>
                       <bcn-calendarbutton next alt='${CULTURE[CONFIG.culture].next}'></bcn-calendarbutton>
                   </div>
                   <bcn-daysofweek></bcn-daysofweek>
        `
    }
}

customElements.define('bcn-calendar-body', CalendarBody);



