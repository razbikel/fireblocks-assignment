import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import userReducer from './userReducer';
import reservationsReducer from './reservationsReducer'
import dayRedcuer from './dayReducer'


export default combineReducers({
    date: dateReducer,
    user: userReducer,
    reservations: reservationsReducer,
    day: dayRedcuer
});