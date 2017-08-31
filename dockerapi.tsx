import * as Docker from 'dockerode';

const isWindows = process.platform === "win32";
let options:Docker.DockerOptions;

if (isWindows) {
    options = {
        host: '127.0.0.1',
        port: 2375
    }
} else {
    options = {
        socketPath: '/var/run/docker.sock'
    }
}

const docker = new Docker(options);

export = docker;