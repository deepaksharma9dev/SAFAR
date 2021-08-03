import {
    IS_BOOKED,
    BOOK_TICKETS,
    CANNOT_BOOK,
    TICKETS,
    NO_TICKETS,
    CANCEL_TICKET,
    CANNOT_CANCEL
} from '../actions/types';

const initialState = {
    tickets: {},
    loading: true
};



export default function(state = initialState, action) {
    const { type, payload } = action

    switch (type) {
        case IS_BOOKED:
        case BOOK_TICKETS:
        case CANCEL_TICKET:
            return {
                ...state,
                ...payload,
                loading: false
            };
        case TICKETS:
            return {
                ...state,
                tickets: payload,
                loading: false
            }
        case CANNOT_BOOK:
        case NO_TICKETS:
        case CANNOT_CANCEL:
            return {
                ...state,
                loading: false
            }

        default:
            return state;
    }
}