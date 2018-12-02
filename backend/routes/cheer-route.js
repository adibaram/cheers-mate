const cheerService = require('../services/cheer-service')
const userService = require('../services/user-service')
const userCheerService = require('../services/rsvp-user-cheer-service')

function addCheerRoutes(app) {
    // CHEERS REST API:

    // LIST
    app.get('/cheer', (req, res) => {
        var filter = req.query;
        console.log('DEBUG::filter', filter);
        cheerService.query(filter)
            .then(cheers => {
                res.json(cheers)
            })
    })
    // TODO
    // GET FROM RADIUS
    app.get('/cheer/radius', (req, res) => {
        var params = req.query;
        console.log('DEBUG::params', params);
        // if (params.lat && params.lng && params.radius) {
            cheerService.queryRadius(params)
                .then(cheers => {
                    res.json(cheers);
                })
        // } else throw new Error('params are not defined');
    })


    // SINGLE - GET Full details
    app.get('/cheer/:cheerId', (req, res) => {
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
    app.delete('/cheer/:cheerId', (req, res) => {
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
    app.post('/cheer', (req, res) => {
        const cheer = req.body;
        cheerService.add(cheer)
            .then(cheer => res.json(cheer));
    })

    // UPDATE
    app.put('/cheer/:id', (req, res) => {
        const id = req.params.id;
        const newParams = req.body;
            cheerService.update(id,newParams)
            .then(cheer => res.json(cheer))
    })

}


module.exports = addCheerRoutes;