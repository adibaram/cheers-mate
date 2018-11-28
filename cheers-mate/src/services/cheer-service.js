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
<<<<<<< HEAD
}

function _createCheers() {
<<<<<<< HEAD
    return [_createCheer(1545908790000, {lat: 30, lng: -30}, [{user:'A'}, {user:'B'}],'lorem',4,(Math.random() > 0.5)? 'en' : 'he'),
           _createCheer(1543921590000, {lat: 30, lng: -40}, [{user:'A'}, {user:'B'}],'lorem',4, (Math.random() > 0.5)? 'en' : 'he'),];
=======
    return [_createCheer(Date.now(), {lat: 32.0714143, lng: 34.78723}, [{user:'A'}, {user:'B'}],'lorem',4,(Math.random() > 0.5)? 'en' : 'he'),
           _createCheer(Date.now(), {lat: 30, lng: -40}, [{user:'A'}, {user:'B'}],'lorem',4, (Math.random() > 0.5)? 'en' : 'he'),];
>>>>>>> 67a1028e97914219f55ca6d8f9006b7ebce58677
}

function _createCheer(date,position,attendance,desc,spots,language) {
    return {
        _id: utilService.makeId(),
        date,
        position,
        locationName: _getLocationName(position),
        attendance,
        desc,
        spots,
        language,
    }
=======
    add,
    remove
>>>>>>> juval
}

function _getLocationName({lat,lng}) {
    var locationName = '';
    locationName = `lat: ${lat}, lng: ${lng}`;

    return locationName;
}