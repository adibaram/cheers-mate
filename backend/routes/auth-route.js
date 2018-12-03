const userService = require('../services/user-service');


function addAuthRoutes(app) {

    app.put('/login', (req, res) => {
        if (req.session.user) res.status(406).end('user is already logged in, please log out first')
        const userAuth = req.body;
        console.log('DEBUG::userAuth', userAuth);
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
        if (req.session.user) {
            res.end(`user ${req.session.user.nickname} logged out successfully`)
            req.session.destroy();
        } else throw new Error('user is not logged in')
    })
}

module.exports = addAuthRoutes