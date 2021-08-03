import axios from 'axios';
import {
    IS_BOOKED,
    BOOK_TICKETS,
    CANNOT_BOOK,
    TICKETS,
    NO_TICKETS,
    CANCEL_TICKET,
    CANNOT_CANCEL
} from './types';

import { setAlert } from './alert';
// import { loadUser } from './auth';


export const isBooked = ({ id }) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    try {
        const res = await axios.get(`/api/user/auth/isBooked/${id}`, config);
        dispatch({
            type: IS_BOOKED,
            payload: res.data
        });

    } catch (err) {
        console.log(err, "err");
    }
};

export const book_Tickets = ({
    selectedSeats,
    passengerNames,
    passengerGender,
    passengerAge,
    contactNumber,
    journeyDate,
    id
}) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    const seats = selectedSeats;
    const passengers = [];

    for (let passenger = 0; passenger < selectedSeats.length; passenger++) {
        passengers.push({
            seat_no: "",
            name: passengerNames[passenger],
            gender: passengerGender[passenger],
            age: passengerAge[passenger]
        });
    }
    const contactNo = contactNumber;
    const body = JSON.stringify({
        seats,
        passengers,
        contactNo,
        journeyDate
    });
    // console.log(body, "njno");

    try {

        const res = await axios.post(`/api/users/user/buses/${id}/bookticket`, body, config);
        dispatch({
            type: BOOK_TICKETS,
            payload: res.data
        });

        dispatch(setAlert('ticket has booked success', 'success'));

    } catch (err) {
        console.log(err);
        dispatch(setAlert('cannot book a ticket', 'danger'));
        dispatch({
            type: CANNOT_BOOK
        });

    }

};



export const getTickets = () => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };

    // dispatch(loadUser());

    try {
        const res = await axios.get('/api/users/user/tickets', config);

        dispatch({
            type: TICKETS,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        dispatch({
            type: NO_TICKETS
        });
    }
};

export const cancelTicket = (
    ticketId) => async dispatch => {
    const config = {
        headers: {
            'Content-Type': 'application/json'
        }
    };
    // ticketId


    try {
        const res = await axios.delete(`/api/users/user/tickets/ticket/${ticketId}`, config);

        dispatch({
            type: CANCEL_TICKET,
            payload: res.data
        });

    } catch (err) {
        console.log(err);
        dispatch({
            type: CANNOT_CANCEL
        });

    }


};