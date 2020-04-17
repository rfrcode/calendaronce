import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js'
import { flexcolumn } from '../css/flexcolumn.js'
import { } from './header.js'
import { } from './body.js'
import { PubSub } from '../services/pubsub.js'
class Calendar extends LitElement {
    constructor() {
        super();
        this._pubsub = new PubSub();
    }
    static get styles() {
        return [
            flexcolumn,
            css`
                :host{
                    color:var(--calendar-color);
                    background-color: var(--calendar-background);
                    cursor: default;
                    user-select: none;
                    width:20.625rem;
                }
            `
        ];
    }
    connectedCallback() {
        super.connectedCallback();
        this.addEventListener('getpub', (ev) => {
            ev.stopPropagation();      
            const {instance} = ev.detail || {};
            instance && (instance.pubSub = this._pubsub)      
            
        },false)
    }
    render() {
        return html`
            <bcn-calendar-header></bcn-calendar-header>
            <bcn-calendar-body></bcn-calendar-body>
        `
    }
}
customElements.define('bcn-calendar', Calendar);