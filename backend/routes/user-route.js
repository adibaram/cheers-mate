const userService = require('../services/user-service');
const userCheerService = require('../services/rsvp-user-cheer-service');
const cheerService = require('../services/cheer-service');
const BASE_URL = '/user';

function addRoutes(app) {
    
    // DEBUGG LOGGED IN USER
    app.get(BASE_URL+'/loggedin', (req, res)=>{
        let user = req.session.user;
        res.json(user);
    })

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
            userCheerService.getByUser(userId)
                .then(userCheers => {
                    return cheerService.getCheersForUser(userCheers)
                })
        ])
            .then(([user, cheers]) => {
                res.json({ user, cheers });
            });
    });
    // UPDATE USER
    app.put(`${BASE_URL}/:id`, (req, res) => {
        const id = req.params.id;
        const newParams = req.body;
            userService.update(id,newParams)
            .then(user => res.json(user))
    })
    // REMOVE USER
    app.delete(`${BASE_URL}/:id`, (req,res)=>{
        let currUser = req.session.user;
        let userId = req.params.id;
        if (!currUser) throw new Error('user not logged in')
        if (!currUser._id !== userId) throw new Error('unauthorized, attempting to delete a non logged in user')
        Promise.all([
            userCheerService.remove({userId}),
            userService.remove(userId)
        ])
            .then(()=> res.send(`user deleted successfully: ${userId}`))
            .catch(err =>
                {
                console.log('DEBUG::err', err);
                res.send('an error accured: ' + err);
            })
    })
}
module.exports = addRoutes;