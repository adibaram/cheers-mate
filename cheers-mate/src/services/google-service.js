import axios from 'axios';


const GOOGLE_PLACES_API = 'https://maps.googleapis.com/maps/api/place/findplacefromtext/json?key=AIzaSyDSpb5jrUSIDb124D7Qpjd4XJQ6d8oVPW0&inputtype=textquery&fields=photos,formatted_address,name,rating,opening_hours,geometry&input='

function getPlaceFromTxt(txt) {
    axios.get(GOOGLE_PLACES_API+txt)
        .then(res=>{
            console.log('DEBUG:google-service getPlaceFromTxt :res', res);
        })
}


export default {
    getPlaceFromTxt
}