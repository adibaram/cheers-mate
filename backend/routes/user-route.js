const userService = require('../services/user-service');
const reviewService = require('../services/cheer-service');
const BASE_URL = '/user';

function addRoutes(app) {
    // GET ALL USERS;
    app.get(BASE_URL, (req, res) => {
        userService.query()
            .then(users => res.json(users));
    });
    // GET SPECIFIC USER WITH CHEERS;
    app.get(`${BASE_URL}/:id`, (req, res) => {
        const userId = req.params.id;
        Promise.all([
            userService.getById(userId),
            // reviewService.query({ userId });
        ])
        .then(([user, reviews]) => {
            console.log({user});
            res.json({user,reviews});
        });
    });
}


module.exports = addRoutes;