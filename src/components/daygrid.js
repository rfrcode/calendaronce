import { CHANELS } from '../services/chanels.js'
import { DateService } from '../services/dateservice.js';
import { Day } from './currentday.js';
import pubsub from '../services/pubsub.js'
import { MixinPubSub, Disposables } from '../services/mixins.js';
import { LitElement, html, css } from '../../node_modules/lit-element/lit-element.js';

class DayGrid extends MixinPubSub(Disposables(LitElement)) {
    _date;
    _days = [];
    _unsubscribers = [];
    _click;
    _selectedDay;
    _selectedDate;
    _todayDay;
    static get styles() {
        return css`
        :host{
            display:grid;
            grid-template-columns: repeat(7,2.5rem);
            grid-template-rows: repeat(6, 2.5rem);
            gap: 0.375rem;
        }    
    `
    }
    constructor() {
        super();
        this._unsubscribers = [
            pubsub.sub(CHANELS.CHANGEMONTH, this.changeAutomaticMonth.bind(this)),
            pubsub.sub(CHANELS.CHANGEDAY, this.changeDay.bind(this)),
        ];
        this._click = this.click.bind(this);
        this.addEventListener('click', this._click);
    }
    render(){
        return html`${this._days.map(day => html`${day}`)}`;
    }
    click(ev) {
        ev.stopPropagation();
        let day = ev.composedPath().filter(d => d instanceof Day)[0]; //event delegation
        if (day) {
            this.setSelectedDay(day);
        }
    }
    setSelectedDay(day) {
        this.pubSub.pub(CHANELS.SELECTEDDAY, day.objectDay)
        if (this._selectedDay) {
            this._selectedDay.selected = false;
        }
        day.selected = true;
        this._selectedDay = day;
        this._selectedDate = new Date(day.objectDay.date.getTime());
    }
    changeDay(date) {
        if (this.isCurrentMonth()) {
            //TODO Cambiar OldToday a false
            //Cambiar newToday a true
            //si _date == _selectedDay o !_selectedDay 
            this._date = date;
        }
        this.refreshTodayDay(date)
    }

    refreshTodayDay(date) {
        this._todayDay.today = false;
        let dateDay = this.getDayInGrid(date)
        if (dateDay) {
            dateDay.today = true;
            this._todayDay = dateDay;
        }
    }

    changeAutomaticMonth(date) {
        if (this.isCurrentMonth()) {
            this.changeMonth(date)
        }
        else {
            this.refreshTodayDay(date);
        }
    }
    changeMonth(date) {
        if (this._selectedDate) {
            this._selectedDay.selected = false;
        }
        DateService.getMonthCalendar(date).forEach((objectDay, index) => {
            this.updateDay(this._days[index], objectDay)
        })
        this._date = date;
    }
    changeManualMonth(dif) {
        this.changeMonth(DateService.getNextOrPreviosMonth(this._date, dif))
    }
    createDays(date) {
        this._days = DateService.getMonthCalendar(date)
            .map(objectDay => {
                let day = new Day();
                this.updateDay(day, objectDay);
                return day;
            });
    }
    init(date) {
        this._date = date;
        this.createDays(date);
        this._days.forEach(day => {
            if (day.objectDay.isToday) {
                this.setSelectedDay(day);
            }
        });
    }
    updateDay(day, objectDay) {
        day.objectDay = objectDay;
        if (this._selectedDate && DateService.isCurrentDate(objectDay.date, this._selectedDate)) {
            day.selected = true;
            this._selectedDay = day;
        }
        if (objectDay.isToday) {
            this._todayDay = day;
        }
    }
    isCurrentMonth() {
        return this._days.map(d => d.objectDay).filter(o => o.isToday && o.isCurrentMonth)[0]
    }
    getDayInGrid(date) {
        return this._days.filter(d => DateService.isCurrentDate(d.objectDay.date, date))[0]
    }
    connectedCallback() {
        super.connectedCallback();
        this.getPub(this);
        this.init(DateService.getCurrentDate());
    }
    set pubSub(value) {
        super.pubSub = value;
        if (value) {
            super.pubSub.sub(CHANELS.CHANGEMANUALMONTH,
                (dif) => this.changeManualMonth(dif),
                null,
                this.disposables
            );
        }
    }
    get pubSub(){
        return super.pubSub;
    }
    disconnectedCallback() {
        this.dispose();
        this.removeEventListener('click', this._click);
        this._days = null;
    }
}
customElements.define('bcn-daygrid', DayGrid)