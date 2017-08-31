"use strict";

import * as express from "express"
import * as http from "http"
import * as SocketIO from 'socket.io'
import * as path from "path"
import * as  docker  from "../dockerapi"
import { ContainerInfo } from 'dockerode';
import { Container } from "./components/interfaces"

/**
 * The server.
 *
 * @class Server
 */
export class Server {

  public _app: express.Application
  public _socketio: SocketIO.Server
  public _server: http.Server

  /**
   * Bootstrap the application.
   *
   * @class Server
   * @method bootstrap
   * @static
   */
  public static bootstrap(): Server {
    return new Server()
  }

  public _configure() {
    this._app.use(express.static("public"))
  }

  public _setRoutes() {
    this._app.get('/', (req:express.Request, res:express.Response) => res.sendFile(path.join(__dirname, '../../index.html')))
  }

  public start() {

    this._socketio.on('connection', socket => {
        socket.on('containers.list', () => {
            this.refreshContainers()
        })

        socket.on('container.start', args => {
            const container = docker.getContainer(args.id)

            if (container) {
                container.start((err, data) => this.refreshContainers())
            }
        })

        socket.on('container.stop', args => {
            const container = docker.getContainer(args.id)

            if (container) {
                container.stop((err, data) => this.refreshContainers())
            }
        })

        socket.on('container.remove', args => {
            const container = docker.getContainer(args.id)

            if (container) {
                container.remove((err, data) => this.refreshContainers())
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

    this._server.listen(3000, function(){
      console.log('Example app listening on port 5000!')
    });
  }

  public refreshContainers() {
    docker.listContainers({ all: true}, (err:Error, containers:ContainerInfo[]) => {
      this._socketio.emit('containers.list', containers)
    })
  }

  /**
   * Constructor.
   *
   * @class Server
   * @constructor
   */
  constructor() {
    //create expressjs application
    this._app = express()
    this._server = http.createServer(this._app)
    this._socketio = SocketIO(this._server)

    //configure application
    this._configure()
    this._setRoutes()

    setInterval(() => {this.refreshContainers()}, 1000)
  }
}
