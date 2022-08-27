import {combineReducers} from 'redux';
import dateReducer from './dateReducer';
import userReducer from './userReducer';
import reservationsReducer from './reservationsReducer'


export default combineReducers({
    date: dateReducer,
    user: userReducer,
    reservations: reservationsReducer
});