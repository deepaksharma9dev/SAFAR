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
} from '../actions/types'

const initialState = {
    details: {},
    loading: true
};



export default function(state = initialState, action) {

    const { type, payload } = action;

    switch (type) {
        case ADMIN_DETAILS:
        case ADD_LOCATION:
        case ADD_AGENCY:
        case ADD_STAFF:
        case ADD_BUS:
            return {
                ...state,
                details: payload,
                loading: false
            };
        case NO_DETAILS:
        case ADD_LOCATION_FAIL:
        case ADD_AGENCY_FAIL:
        case ADD_STAFF_FAIL:
        case ADD_BUS_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state
    }
}