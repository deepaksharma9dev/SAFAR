import axios from 'axios';
import { setAlert } from './alert';
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
    ADMIN_LOGIN_FAIL,
    LOGOUT
} from './types';

import { getAdminDetails } from './admin';

import setAuthToken from '../utils/setAuthToken';
//loaduser

export const loadUser = () => async dispatch => {

    if (localStorage.token) {
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('/api/user/auth/authuser');
        // console.log(res);

        await dispatch({
            type: USER_LOADED,
            payload: res.data
        });

        // dispatch(getAdminDetails());

    } catch (err) {
        console.log(err, "err");
        dispatch({
            type: AUTH_ERROR
        });
    }

};


//for registering a user

export const register = ({ name, email, password, confirm_password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ name, email, password, confirm_password });

    try {
        const res = await axios.post('/api/users/user/signup', body, config);
        dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data
        });

        dispatch(loadUser());

    } catch (err) {
        // console.log(res)

        if (err) {
            const errors = err.response.data.errors;
            console.log(errors, "errors");
            if (errors[0].hasOwnProperty('msg')) {
                {
                    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }
            } else {
                dispatch(setAlert(errors, 'danger'));
            }
        }
        dispatch({
            type: REGISTER_FAIL
        });
    }
};



//register for admin


export const adminregister = ({ admin_email, name, email, password, confirm_password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ admin_email, name, email, password, confirm_password });

    try {
        const res = await axios.post('/api/admins/admin/signup', body, config);
        // console.log("worked")
        // console.log(res);
        dispatch({
            type: ADMIN_REGISTER_SUCCESS,
            payload: res.data
        });
        dispatch(loadUser());

    } catch (err) {
        // console.log(res)

        if (err) {
            const errors = err.response.data.errors;
            if (errors[0].hasOwnProperty('msg')) {
                {
                    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }
            } else {
                dispatch(setAlert(errors, 'danger'))
            }
        }
        dispatch({
            type: ADMIN_REGISTER_FAIL
        });
    }
};

//log in for user and admin


export const login = ({ email, password }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/users/user/login', body, config);

        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        });
        console.log(res);
        dispatch(loadUser());

    } catch (err) {
        // console.log(res)
        console.log(err, "err");

        if (err) {

            const errors = err.response.data.errors;
            if (errors[0].hasOwnProperty('msg')) {
                {
                    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }
            } else {
                dispatch(setAlert(errors, 'danger'));
            }
        }
        dispatch({
            type: LOGIN_FAIL
        });
    }
};


//Log in for admin

export const adminlogin = ({
    email,
    password
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ email, password });

    try {
        const res = await axios.post('/api/admins/admin/login', body, config);
        // console.log(res, "res");

        dispatch({
            type: ADMIN_LOGIN_SUCCESS,
            payload: res.data
        });

        await dispatch(loadUser());

        dispatch(getAdminDetails());




    } catch (err) {
        // console.log(res)
        console.log(err);

        if (err) {
            console.log(err);
            const errors = err.response.data.errors;
            if (errors[0].hasOwnProperty('msg')) {
                {
                    errors.forEach(error => dispatch(setAlert(error.msg, 'danger')));
                }
            } else {
                dispatch(setAlert(errors, 'danger'));
            }
        }
        dispatch({
            type: ADMIN_LOGIN_FAIL
        });
    }
};


export const logOut = () => async dispatch => {
    dispatch({
        type: LOGOUT
    });
};