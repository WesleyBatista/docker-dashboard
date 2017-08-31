let express = require('express')
let path = require('path')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
// let kafka = require('socket.io-kafka');
// io.adapter(kafka('localhost:2181'));

// let redisAdapter = require("socket.io-redis")
// io.adapter(redisAdapter({ host: 'localhost', port: 6379 }));


let docker = require('./dockerapi')

// Use the environment port if available, or default to 3000
let port = process.env.PORT || 3000

// Serve static files from /public
app.use(express.static('public'))

// Create an endpoint which just returns the index.html page
app.get('/', (req, res) => res.sendFile(path.join(__dirname, 'index.html')))

function refreshContainers() {
    docker.listContainers({ all: true}, (err, containers) => {
        io.emit('containers.list', containers)
    })
}

io.on('connection', socket => {
    socket.on('containers.list', () => {
        refreshContainers()
    })

    socket.on('container.start', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.start((err, data) => refreshContainers())
        }
    })

    socket.on('container.stop', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.stop((err, data) => refreshContainers())
        }
    })

    socket.on('container.remove', args => {
        const container = docker.getContainer(args.id)

        if (container) {
            container.remove((err, data) => refreshContainers())
        }
    })

    socket.on('image.run', args => {
        docker.createContainer({ Image: args.name }, (err, container) => {
            if (!err)
                container.start((err, data) => {
                    if (err)
                        socket.emit('image.error', { message: err })
                })
            else
                socket.emit('image.error', { message: err })
        })
    })

})

setInterval(refreshContainers, 1000)


// Start the server
server.listen(port, () => console.log(`Server started on port ${port}`))
