const cheerService = require('../services/cheer-service')
const userService = require('../services/user-service')
const userCheerService = require('../services/rsvp-user-cheer-service')

function addCheerRoutes(app) {
    // CHEERS REST API:

    // LIST
    app.get('/api/cheer', (req, res) => {
        var filter = req.query;
        cheerService.query(filter)
        .then(cheers => {
            Promise.all(cheers.map(cheer=>{
                return userCheerService.getByCheer(cheer._id.toString())
                    .then(userCheers=>{
                        return userService.getUsersFromCheer(userCheers)
                            .then(users=>{
                                cheer.attendees = users;
                                return cheer;
                            })
                    })
            }))
            .then(cheers=>{
                res.json(cheers);
            })
        })
    })
    // GET FROM RADIUS
    app.get('/api/cheer/radius', (req, res) => {
        var params = req.query;
        // if (params.lat && params.lng && params.radius) {
            cheerService.queryRadius(params)
                .then(cheers => {
                    Promise.all(cheers.map(cheer=>{
                        return userCheerService.getByCheer(cheer._id.toString())
                            .then(userCheers=>{
                                return userService.getUsersFromCheer(userCheers)
                                    .then(users=>{
                                        cheer.attendees = users;
                                        return cheer;
                                    })
                            })
                    }))
                    .then(cheers=>{
                        res.json(cheers);
                    })
                })
        // } else throw new Error('params are not defined');
    })


    // SINGLE - GET Full details
    app.get('/api/cheer/:cheerId', (req, res) => {
        const cheerId = req.params.cheerId;
        Promise.all([
            cheerService.getById(cheerId),
            userCheerService.getByCheer(cheerId)
                .then(userCheers => {
                    return userService.getUsersFromCheer(userCheers);
                })
            ])
            .then(([cheer, users]) => {
                cheer.attendees = users
                res.json( cheer )
            })
            
        })

    // DELETE
    app.delete('/api/cheer/:cheerId', (req, res) => {
        const cheerId = req.params.cheerId;
        Promise.all([
            cheerService.remove(cheerId),
            userCheerService.remove({cheerId})
        ])
            .then(() => res.end(`cheer ${cheerId} Deleted `))
            .catch(err=>{
                console.log('an error has benn accured: '+err);
                throw new Error(errs);
            })
    })

    // CREATE
    app.post('/api/cheer', (req, res) => {
        const cheer = req.body;
        cheerService.add(cheer)
            .then(cheer => res.json(cheer));
    })

    // UPDATE
    app.put('/api/cheer/:id', (req, res) => {
        const id = req.params.id;
        const newData = req.body;
            cheerService.update(id,{$set : newData})
            .then(cheer => res.json(cheer))
    })

}


module.exports = addCheerRoutes;