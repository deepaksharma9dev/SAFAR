import { combineReducers } from 'redux';
import alert from './alert';
import auth from './auth';
import bus from './bus';
import tickets from './tickets';
import admin from './admin';

export default combineReducers({
    alert,
    auth,
    admin,
    bus,
    tickets
});