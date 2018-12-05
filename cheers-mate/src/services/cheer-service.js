import axios from 'axios';

const BASE_URL = (process.env.NODE_ENV !== 'development')? 
                '/cheer' : 'http://localhost:3003/cheer';


function query(filter={}) {
    var queryParams = new URLSearchParams();
    for (let key in filter) {
        queryParams.set(`${key}`, filter[key]);
    }
    return axios.get(`${BASE_URL}?${queryParams}`)
        .then(res => res.data);
}
function getById(id) {
    return axios.get(`${BASE_URL}/${id}`)
        .then(res => {
            return res.data
        });
}
function add(cheer) {
    return axios.post(BASE_URL,cheer)
}

function update(id,cheer) {
    return axios.put(`${BASE_URL}/${id}`,cheer)
        .then(res => {
            return res.data
        });
}

function remove(id) {
    return axios.delete(`${BASE_URL}/${id}`)
        .then(res => res.data);
}
export default {
    query,
    getById,
    add,
    update,
    remove
}
