
import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development') ?
    '' : 'http://localhost:3003';


function signup(user) {
    return axios.post(`${BASE_URL}/signup`, user)
        .then(res => res.data);
}


function checkUser(user) {
    return axios.put(`${BASE_URL}/login`, user)
        .then(res => res.data);
}

function logout() {
    // remove user from session storage to log user out
    axios.put(`${BASE_URL}/logout`)
        .then(res => {
            if (sessionStorage.getItem('user')) sessionStorage.removeItem('user');
            if (localStorage.getItem('user')) localStorage.removeItem('user');
        })
}
function getLoggedInUser() {
    return axios.get(`${BASE_URL}/loggedin`)
        .then(res=>res.data)
}

export default {
    signup,
    checkUser,
    logout,
    getLoggedInUser
}


