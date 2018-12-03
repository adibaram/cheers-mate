import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')? 
                '/user' : 'http://localhost:3003/user';


function getById(id) {
    return axios.get(`${BASE_URL}/${id}`)
        .then(res => res.data);
}

function getAll() {
    return axios.get(`${BASE_URL}`)
    .then(res => res.data);
}

function remove(id) {
    return axios.delete(`${BASE_URL}/${id}`)
        .then(res => res.data);
}

function login(user, rememberPref = false) {
    if (!user) return;
    if (rememberPref) {
        localStorage.setItem('user', JSON.stringify(user));
    } else {
        sessionStorage.setItem('user', JSON.stringify(user));
    }
}


export default {
    getById,
    remove,
    getAll,
    login,
}



