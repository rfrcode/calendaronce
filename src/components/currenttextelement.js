import { Disposables } from '../services/mixins.js'
import pubsub from '../services/pubsub.js'
import { DateService } from '../services/dateservice.js'
import { LitElement, html } from '../../node_modules/lit-element/lit-element.js'
export class CurrentTextElement extends Disposables(LitElement) {
    static get properties() {
        return { date: Object };
    }
    constructor(chanel, format, cb = null) {
        super();
        this._format = format;
        this.date = DateService.getCurrentDate();
        const cbDate = (date) => this.date = date;
        pubsub.sub(chanel, cb || cbDate, null, this.disposables)
    }
    format() {
        return this._format(this.date);
    }
    render() {
        return html`${this.format()}`;
    }
    disconnectedCallback() {
        super.disconnectedCallback();
        this.dispose();
    }
}

