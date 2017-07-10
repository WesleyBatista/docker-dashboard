let express = require('express')
let path = require('path')
let app = express()
let server = require('http').Server(app)
let io = require('socket.io')(server)
let kafka = require('socket.io-kafka');
io.adapter(kafka('ec2-54-207-33-157.sa-east-1.compute.amazonaws.com:2181'));

console.log(io)
