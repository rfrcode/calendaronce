import { Disposables } from '../services/mixins.js'
import pubsub from '../services/pubsub.js'
import { DateService } from '../services/dateservice.js'
import { LitElement, html } from '../../node_modules/lit-element/lit-element.js'
export class CurrentTextElement extends Disposables(LitElement) {
    #date = DateService.getCurrentDate();
    #format;
    constructor(chanel, format) {
        super();
        this.#format = format;
        pubsub.sub(chanel, (date) => this.date = date, null, this.disposables)
    }
    set date(value) {
        const olddate = this.#date;
        this.#date = value;
        this.requestUpdate('date',olddate);
    }
    get date() {
        return this.#date
    }
    format() {
        return this.#format(this.date);
    }
    render() {
        return html`${this.format()}`;
    }
}

