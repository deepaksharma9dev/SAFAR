import axios from 'axios';


const setAuthToken = token => {
    // console.log(token, "xee");
    if (token) {
        axios.defaults.headers.common.authorization = token;
        // console.log(axios.defaults.headers.common, "msg");
    } else {
        delete axios.defaults.headers.common.authorization;
    }
};


export default setAuthToken;