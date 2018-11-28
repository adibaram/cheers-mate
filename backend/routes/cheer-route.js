const cheerService = require('../services/cheer-service')


function addCheerRoutes(app) {
    // CHEERS REST API:

    // LIST
    app.get('/cheer', (req, res) => {
        cheerService.query()
            .then(cheers => {
                res.json(cheers)
            })
    })
    // GET FROM RADIUS
    app.get('/cheer/radius', (req, res) => {
        var params = req.query;
        console.log('DEBUG::params', params);
        if (params.lat && params.lng && params.radius) {
            const locationFilter = {
                $near: {
                    $geometry: {
                        type: "point",
                        coordinates: [params.lat,params.lng]
                    },
                    $minDistance: 0,
                    $maxDistance: params.radius
                }
            }
            cheerService.query(locationFilter)
                .then(cheers => {
                    res.json(cheers);
                })
        } else throw new Error('params are not defined');
    })


// SINGLE - GET Full details
app.get('/cheer/:cheerId', (req, res) => {
    const cheerId = req.params.cheerId;
    Promise.all([
        cheerService.getById(cheerId),
        // reviewService.query({cheerId})
    ])
        .then(([cheer]) => {
            res.json({ cheer })
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