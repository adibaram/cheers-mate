const cheerService = require('../services/cheer-service')


function addCheerRoutes(app) {
    // CHEERS REST API:

    // LIST
    app.get('/cheer', (req, res) => {
        var filter = req.query;
        console.log('filter', filter);
        
        cheerService.query(filter)
            .then(cheers => {
                res.json(cheers)
            })
    })

    // SINGLE - GET Full details
    app.get('/cheer/:cheerId', (req, res) => {
        const cheerId = req.params.cheerId;
        Promise.all([
            cheerService.getById(cheerId),
            // reviewService.query({cheerId})
        ])
        .then(([cheer]) => {
            res.json( {
                cheer
            })
        })
    })

    // DELETE
    app.delete('/cheer/:cheerId', (req, res) => {
        const cheerId = req.params.cheerId;
        cheerService.remove(cheerId)
            .then(() => res.end(`cheer ${cheerId} Deleted `));
    })

    // CREATE
    app.post('/cheer', (req, res) => {
        const cheer = req.body;
        cheerService.add(cheer)
            .then(cheer => res.json(cheer));
    })

    // UPDATE
    app.put('/cheer/:cheerId', (req, res) => {
        const cheer = req.body;
        cheerService.update(cheer)
            .then(cheer => res.json(cheer))
    })

}


module.exports = addCheerRoutes;