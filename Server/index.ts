import express from 'express';
import http from 'http';
import socket from 'socket.io'
import helmet from 'helmet';
import serverConfig from './config/server.json';
import { Server } from "./server";
import * as chat from './controllers/chat/chat';
import * as nodeipc from 'node-ipc';
import * as userRoutes from './routes/user';

const Iroh = require("iroh");
const {performance} = require('perf_hooks');

let code = `
function main(n) {
  let res = 0;
  let ii = 0;
  while (++ii < 10000) {
    res += ii;
  };
  return res;
};
main(3);
`;

let stage = new Iroh.Stage(code);
let now = 0;
stage.addListener(Iroh.CALL).on("before",(e) => {
  if (e.name === 'main') {
      now = performance.now();
  }
})
.on("after", (e) => {
  if (e.name === "main") {
    let then = performance.now();
    console.log(e.name, "took", then - now, "ms");
  }
});
eval(stage.script);

const port = 8080;

const app = express();

app.use(helmet())
app.use(userRoutes.router);

Server.getInstance();

const http_server_recvMessages = new http.Server(app);
const socketio_recvMessages = new socket.Server(http_server_recvMessages,{cors:{origin:'*'}})

/* istanbul ignore next */
socketio_recvMessages.on("connection", function(socket) {
    if(Server.getServerState() == 0 ) {
        chat.receiveChatMessage(socket);
    }
});

export const serverListener = http_server_recvMessages.listen(serverConfig.PORT_Chat,() => {
    console.log('Started On Port : ',serverConfig.PORT_Chat);
})


module.exports = {serverListener};