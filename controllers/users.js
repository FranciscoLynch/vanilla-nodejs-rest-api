const User = require('../models/user')
const { getPostData } = require('../utils')

// @desc GET All Users
// @route GET /api/users
async function getUsers(_req, res) {
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
async function getUser(_req, res, id) {
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

// @desc POST Create Single User
// @route POST /api/users
async function createUser(req, res) {
    try {

        /*  const user =
         {
             name: "John Doe",
             username: "Johnny",
             email: "doejohn@gmail.com",
             address: {
                 street: "Kulas Light",
                 suite: "Apt. 559",
                 city: "Gwenborough",
                 zipcode: "92998-3874",
                 geo: {
                     lat: "-37.3159",
                     lng: "81.1496"
                 }
             },
             phone: "1-773-721-9999 x56442",
             website: "hildegard.org",
             company: {
                 name: "Romaguera-Crona",
                 catchPhrase: "Multi-layered client-server neural-net",
                 bs: "harness real-time e-markets"
             }
         } */

        const body = await getPostData(req)

        const { name, username } = JSON.parse(body)

        const user = { name, username }

        const newUser = await User.create(user)

        res.writeHead(201, { 'Content-Type': 'application/json' })
        return res.end(JSON.stringify(newUser))

    } catch (error) {
        console.log(error);
    }
}

// @desc PUT Update Single User
// @route PUT /api/user/:id
async function updateUser(req, res, id) {
    try {

        const user = await User.findById(id)

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ msg: 'Route not found' }))
        } else {
            const body = await getPostData(req)

            const { name, username } = JSON.parse(body)

            const userData = { name: name || user.name, username: username || user.username }

            const updUser = await User.update(id, userData)

            res.writeHead(200, { 'Content-Type': 'application/json' })
            return res.end(JSON.stringify(updUser))
        }

    } catch (error) {
        console.log(error);
    }
}

// @desc DELETE Single User
// @route DELETE /api/user/:id
async function removeUser(_req, res, id) {
    try {

        const user = await User.findById(id)

        if (!user) {
            res.writeHead(404, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ msg: 'Route not found' }))
        } else {
            await User.remove(id)
            res.writeHead(200, { 'Content-Type': 'application/json' })
            res.end(JSON.stringify({ msg: `User ${id} has been removed` }))
        }

    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getUsers,
    getUser,
    createUser,
    updateUser,
    removeUser
}