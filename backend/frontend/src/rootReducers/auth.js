import {
    REGISTER_SUCCESS,
    REGISTER_FAIL,
    ADMIN_REGISTER_SUCCESS,
    ADMIN_REGISTER_FAIL,
    USER_LOADED,
    AUTH_ERROR,
    LOGIN_SUCCESS,
    LOGIN_FAIL,
    ADMIN_LOGIN_SUCCESS,
    ADMIN_LOGIN_FAIL
} from '../actions/types';


const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    loading: false,
    user: null
};


export default function(state = initialState, action) {
    const { type, payload } = action;
console.log(type, payload)
    switch (type) {
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                loading: false,
                user: payload
            };
        case REGISTER_SUCCESS:
        case ADMIN_REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
        case ADMIN_LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token);
            return {
                ...state,
                ...payload,
                isAuthenticated: true,
                loading: false
            };
        case REGISTER_FAIL:
        case ADMIN_REGISTER_FAIL:
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case ADMIN_LOGIN_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                token: null,
                isAuthenticated: false,
                loading: false
            }
        default:
            return state;
    }
};