import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import userReducer from './userReducer';
import reservationsReducer from './reservationsReducer'
import dayRedcuer from './dayReducer'
import reservationErrorReducer from './reservationErrorReducer'


export default combineReducers({
    date: dateReducer,
    user: userReducer,
    reservations: reservationsReducer,
    day: dayRedcuer,
    reservationError: reservationErrorReducer
});