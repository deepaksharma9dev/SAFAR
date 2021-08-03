import {
    ADMIN_DETAILS,
    NO_DETAILS,
    ADD_LOCATION,
    ADD_LOCATION_FAIL,
    ADD_AGENCY,
    ADD_AGENCY_FAIL,
    ADD_STAFF,
    ADD_STAFF_FAIL,
    ADD_BUS,
    ADD_BUS_FAILED
} from '../actions/types';
import { setAlert } from '../actions/alert';
import axios from 'axios';


export const getAdminDetails = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    try {
        const res = await axios.get('/api/admins/admin/dashboard', config);
        dispatch({
            type: ADMIN_DETAILS,
            payload: res.data
        });



    } catch (err) {
        dispatch({
            type: NO_DETAILS
        });
        console.log(err, "error");
    }
};


export const add_Location = ({ city, state }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ city, state });

    try {
        const res = await axios.post('/api/admins/admin/location', body, config);
        dispatch({
            type: ADD_LOCATION,
            payload: res.data
        });

        dispatch(setAlert('Location has added Successfully', 'success'));
    } catch (err) {
        dispatch(setAlert('Location does already exists', 'danger'));
        console.log(err);
        dispatch({ type: ADD_LOCATION_FAIL });
    }
};



export const add_Agency = ({
    phone,
    agencyName,
    headOfficeLocation
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const body = JSON.stringify({ phone, agencyName, headOfficeLocation });

    try {
        const res = await axios.post('/api/admins/admin/agency', body, config);
        dispatch({
            type: ADD_AGENCY,
            payload: res.data
        });

        dispatch(setAlert('Agency has added Successfully', 'success'));
    } catch (err) {
        dispatch(setAlert('Agency does already exists', 'danger'));
        console.log(err);
        dispatch({ type: ADD_AGENCY_FAIL });
    }
};


export const add_Staff = ({
    name,
    phone,
    address,
    position,
    agencyName
}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const isDriver = (position === 'Driver') ? true : false;

    const body = JSON.stringify({ name, phone, address, isDriver, agencyName });

    try {
        const res = await axios.post('/api/admins/admin/staff', body, config);
        dispatch({
            type: ADD_STAFF,
            payload: res.data
        });

        dispatch(setAlert('staff has added Successfully', 'success'));
    } catch (err) {
        console.log(err.msg);
        dispatch(setAlert('staff does already exists', 'danger'));

        dispatch({ type: ADD_STAFF_FAIL });
    }
};


export const addBus = ({
    busName,
    vehicleNo,
    seats,
    busType,
    seatCategory,
    policy,
    from,
    to,
    arrivalTime,
    departureTime,
    image,
    staffs,
    schedule
}) => async dispatch => {

    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let day = 0; day < schedule.length; day++) {
        schedule[day] = days.indexOf(schedule[day]);
    }

    const Staff_Number = [staffs];
    const body = JSON.stringify({
        busName,
        vehicleNo,
        seats,
        busType,
        seatCategory,
        policy,
        from,
        to,
        arrivalTime,
        departureTime,
        image,
        Staff_Number,
        schedule
    });

    console.log(body);
    try {
        const res = await axios.post('/api/admins/admin/addbus', body, config);

        dispatch({
            type: ADD_BUS,
            payload: res.data
        });

        dispatch(setAlert('bus has added succefully', 'success'));


    } catch (err) {
        console.log(err);
        dispatch(setAlert('there was an error while adding the bus', 'danger'));

        dispatch({
            type: ADD_BUS_FAILED
        });

    }


};