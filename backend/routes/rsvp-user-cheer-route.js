const rsvpService = require('../services/rsvp-user-cheer-service');
// const BASE_URL = '/rsvp/user-cheer';

function addRoutes(app) {
    // GET ALL
    app.get('/api/userCheer', (req,res)=>{
        rsvpService.query()
            .then(userCheers=>{
                res.json(userCheers);
            })
    })

    // ADD USER CHEER
    app.post('/api/userCheer', (req, res)=>{

        if (!req.session.user) res.status('401').end('user is not logged in')

        let userCheer = req.body;
        rsvpService.getByBoth(userCheer)
            .then(isAttending => {
                if (isAttending) res.status('403').end('userCheer already exists'); 
                rsvpService.add(userCheer)
                    .then(()=>{
                        res.json(userCheer);
                    })
            })
            .catch(err => {console.log('debbug, err: ',err);
            })
    })

    app.delete('/api/userCheer/:cheerId', (req, res) => {
        if (!req.session.user) res.status('401').end('user not logged in')
        let cheerId = req.params.cheerId;
        let userId = req.session.user._id;
        rsvpService.remove({cheerId,userId})
            .then(()=>res.end(`${req.session.user.nickname} removed his attend`))
            .catch(err=>{
                throw new Error('error: '+ err)
            })
    })


}


module.exports = addRoutes;