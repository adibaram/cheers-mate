import axios from 'axios';

const BASE_URL = 'http://localhost:3003/cheer';


function query(filter={}) {
    return axios.get(BASE_URL)
        .then(res => res.data);
}
function getById(id) {
    return axios.get(`${BASE_URL}/${id}`)
        .then(res => res.data);
}
function add(cheer) {
    return axios.post(BASE_URL,cheer)
}

function remove(id) {
    return axios.delete(`${BASE_URL}/${id}`)
        .then(res => res.data);
}

export default {
    query,
    getById,
    add,
    remove
}

function _getLocationName({lat,lng}) {
    var locationName = '';
    locationName = `lat: ${lat}, lng: ${lng}`;

    return locationName;
}