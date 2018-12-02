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

    app.delete('/userCheer/:cheerId', (req, res) => {
        if (!req.session.user) throw new Error('user not logged in')
        let cheerId = req.params.cheerId;
        let userId = req.session.user._id;
        rsvpService.remove({cheerId,userId})
            .then(()=>res.end('deleted'))
            .catch(err=>{
                throw new Error('error: '+ err)
            })
    })


}


module.exports = addRoutes;