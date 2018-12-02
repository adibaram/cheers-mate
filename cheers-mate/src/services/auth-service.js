
import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')? 
                '' : 'http://localhost:3003';


function signup(user) {
    return axios.post(`${BASE_URL}/signup`, user);
}


function checkUser(user) {
    return axios.put(`${BASE_URL}/login`, user);
}

export default { 
    signup,
    checkUser
}


