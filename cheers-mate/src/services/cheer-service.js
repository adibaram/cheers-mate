import utilService from './util-service.js';

var cheers = _createCheers();

async function query(filter={}) {
    var cheersForDisplay = cheers;
    return cheersForDisplay
}

async function getById(id) {
    var cheers = await query();
    return cheers.find(cheer => cheer._id === id);
}

export default {
    query,
    getById,
}

function _createCheers() {
    return [_createCheer(Date.now(), {lat: 32.0714143, lng: 34.78723}, [{user:'A'}, {user:'B'}],'lorem',4,(Math.random() > 0.5)? 'en' : 'he'),
           _createCheer(Date.now(), {lat: 30, lng: -40}, [{user:'A'}, {user:'B'}],'lorem',4, (Math.random() > 0.5)? 'en' : 'he'),];
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
}

function _getLocationName({lat,lng}) {
    var locationName = '';
    locationName = `lat: ${lat}, lng: ${lng}`;

    return locationName;
}