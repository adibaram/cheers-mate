const userService = require('../services/user-service');


function addAuthRoutes(app) {

    app.put('/login', (req, res) => {
        if (req.session.user) res.end('user is already logged in, please log out first')
        const userAuth = req.body;
        console.log('DEBUG::userAuth', userAuth);
        userService.checkLogin(userAuth)
            .then(user => {
                req.session.user = user;
                res.json(user)
            })
            .catch(err => {
                throw new Error(err.message)
            })
    })

    app.post('/signup', (req, res) => {
        const user = req.body;

        userService.checkNickname(user.nickname)
            .then(user => {
                if (user) res.end('nickname already exist')
                else {
                    userService.add(user)
                    .then(() => res.json(user))
                    .catch(err => {
                        console.log('DEBUG::err', err);
                        throw new Error('an error accured: ' + err);
                    })
                }
            })
    });

    app.put('/logout', (req,res) =>{
        if (req.session.user) {
            res.end(`user ${req.session.user.nickname} logged out successfully`)
            req.session.destroy();
        } else throw new Error('user is not logged in')
    })
}

module.exports = addAuthRoutes