import express from 'express';
import http from 'http';
import socket from 'socket.io'
import helmet from 'helmet';
import serverConfig from './config/server.json';
import { Server } from "./server";
import * as chat from './controllers/chat/chat';
import * as userRoutes from './routes/user';

Server.getInstance(6001,0);

const app = express();

app.use(helmet());
app.use(userRoutes.router);

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