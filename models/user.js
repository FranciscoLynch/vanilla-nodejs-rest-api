const users = require('../data/users')
const { v4: uuidv4 } = require('uuid')
const { writeDataToFile } = require('../utils')

function findAll() {
    return new Promise((resolve, _reject) => {
        resolve(users)
    })
}

function findById(id) {
    return new Promise((resolve, _reject) => {
        const user = users.find((u) => u.id === id)
        resolve(user)
    })
}

function create(user) {
    return new Promise((resolve, _reject) => {
        const newUser = { id: uuidv4(), ...user }
        users.push(newUser)
        writeDataToFile('./data/users.json', users)
        resolve(newUser)
    })
}

function update(id, userData) {
    return new Promise((resolve, _reject) => {

        const index = users.findIndex((u) => u.id === id)
        users[index] = { id, ...userData }
        writeDataToFile('./data/users.json', users)
        resolve(users[index])
    })
}

module.exports = {
    findAll,
    findById,
    create,
    update
}