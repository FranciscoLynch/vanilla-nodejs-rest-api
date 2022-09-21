const User = require('../models/user')


// @desc GET All Users
// @route GET /api/users
async function getUsers(req, res) {
    try {
        const users = await User.findAll()

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(users))
    } catch (error) {
        console.log(error);
    }
}


// @desc GET Single User
// @route GET /api/user/:id
async function getUser(req, res, id) {
    try {

        const user = await User.findById(id)
        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ msg: 'Route not found' }))
        } else {
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify(user))
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    getUser
}