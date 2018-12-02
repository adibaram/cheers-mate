const rsvpService = require('../services/rsvp-user-cheer-service');
const BASE_URL = '/rsvp/user-cheer';

function addRoutes(app) {
    // GET ALL
    app.get('/userCheer', (req,res)=>{
        rsvpService.query()
            .then(userCheers=>{
                res.json(userCheers);
            })
    })

    // ADD USER CHEER
    app.post('/userCheer', (req, res)=>{
        let userCheer = req.body;
        rsvpService.add(userCheer)
            .then(()=>{
                res.json(userCheer);
            })
    })




}


module.exports = addRoutes;