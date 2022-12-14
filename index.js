const http = require('http')
const { getUsers, getUser, createUser, updateUser, removeUser } = require('./controllers/users')


const server = http.createServer((req, res) => {
    if (req.url === '/api/users' && req.method === 'GET') {
        getUsers(req, res)
    } else if (req.url.match(/\/api\/user\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split('/')[3]
        getUser(req, res, parseInt(id))
    } else if (req.url === '/api/users' && req.method === 'POST') {
        createUser(req, res)
    } else if (req.url.match(/\/api\/user\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split('/')[3]
        updateUser(req, res, parseInt(id))
    } else if (req.url.match(/\/api\/user\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3]
        removeUser(req, res, parseInt(id))
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify({ msg: 'Route not found' }))
    }
})

const hostname = process.env.HOSTNAME || '127.0.0.1'
const port = process.env.PORT || 4000

server.listen(port, hostname, () => console.log(`Server running at http://${hostname}:${port}`))