import {} from './components/calendar.js'
import timerservice from './services/timerservice.js'
import pubsub from './services/pubsub.js';
import {CHANELS} from './services/chanels.js'
import {DateService} from './services/dateservice.js'
window.bcn = window.bcn || {pubsub,CHANELS,DateService};