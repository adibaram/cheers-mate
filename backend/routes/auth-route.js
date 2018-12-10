const userService = require('../services/user-service');


function addAuthRoutes(app) {

    app.put('/login', (req, res) => {
        if (req.session.user) res.status(418).end('user is already logged in, please log out first')
        const userAuth = req.body;
        userService.checkLogin(userAuth)
            .then(user => {
                req.session.user = user;
                res.json(user)
            })
            .catch(err => {
                console.log('DEBUG:auth routes:err', err);
                res.status(401).end(err.toString())
                // throw new Error(err.message)
            })
    })

    app.post('/signup', (req, res) => {
        const user = req.body;
        userService.checkNickname(user.nickname)
            .then(isExist => {
                if (isExist) {
                    res.status(403).end('nickname already exist')
                }
                else {
                    userService.add(user)
                        .then(() => res.json(user))
                        .catch(err => {
                            res.status(401).end(err.toString())
                        })
                }
            })
    });

    app.put('/logout', (req, res) => {
        console.log('inside logout')
        if (req.session.user) {
            res.end(`user ${req.session.user.nickname} logged out successfully`)
            req.session.destroy();
        } else throw new Error('user is not logged in')
    })

    // DEBUGG LOGGED IN USER
    app.get('/loggedin', (req, res) => {
        let user = req.session.user;
        res.json(user);
    })

}

module.exports = addAuthRoutes