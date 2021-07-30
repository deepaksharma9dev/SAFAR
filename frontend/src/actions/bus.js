import axios from 'axios';
import {
    BUS_FOUND,
    BUS_NOTFOUND,
    FOUND_BUS_SEATS,
    NO_BUS_SEATS,
    ADMIN_DETAILS
} from './types';

// import { setAlert } from './alert';
// search bus


export const getBuses = ({ to, from, date }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get('/buses/GetBuses', { params: { to, from, date } }, config);
        // console.log(res.data, "data");
        dispatch({
            type: BUS_FOUND,
            payload: res.data
        });
    } catch (err) {
        console.log(err, "err");
        dispatch({
            type: BUS_NOTFOUND
        });
    }
};


export const getBus = ({ id }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get('/buses/bus/', { params: { busId: id } }, config);
        dispatch({
            type: FOUND_BUS_SEATS,
            payload: res.data
        });
    } catch (err) {
        console.log(err);
        dispatch({
            type: NO_BUS_SEATS
        });
    }
};