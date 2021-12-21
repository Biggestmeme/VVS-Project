import express from 'express';
import http from 'http';
import socket from 'socket.io'
import helmet from 'helmet';
import serverConfig from './config/server.json';
import * as chat from './controllers/chat/chat';
import * as nodeipc from 'node-ipc';
import * as userRoutes from './routes/user';

export class Server {
    private static instance: Server;
    public static PORT_APP : number;
    public static IP;
    private static state : number;
    private static users : Set<String>;
    private static app = express();
    private static http_server_recvMessages;
    private static socketio_recvMessages;
    public static serverListener;

    private constructor(port:number,state:number) {
        Server.IP = "localhost";
        Server.PORT_APP = port;
        Server.state = state;
        Server.users = new Set<String>();
      
    }

     public static changeAppPort(port:number) {
         this.PORT_APP = port;
     }
     public static changeServervState(state:number) {
         this.state = state;
     }
     public static getServerState() : number {
         return this.state;
     }

     public static getPortApp() : number {
         return this.PORT_APP;
     }

     public static addUser(user:string) : void {
         this.users.add(user);
     }
     public static hasUser(user:string) : boolean {
        return this.users.has(user);
     }

    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */

      /* istanbul ignore next */
    public static getInstance(port:number,state:number): Server {
        if (!Server.instance) {
            Server.instance = new Server(port,state);
                        

        }

        return Server.instance;
    }

    /* istanbul ignore next */
    public static setupServer() {
        Server.app.use(helmet());
        Server.app.use(userRoutes.router);
        Server.http_server_recvMessages = new http.Server(Server.app);
        Server.socketio_recvMessages = new socket.Server(Server.http_server_recvMessages,{cors:{origin:'*'}});

        Server.startChatServer();
        Server.startHttpServer();
    }

    /* istanbul ignore next */
    public static startChatServer() {
        Server.socketio_recvMessages.on("connection", function(socket) {
            console.log("Client Connected");
            if(Server.getServerState() == 0 ) {
                chat.receiveChatMessage(socket);
            }
        });
    }

    /* istanbul ignore next */
    public static closeChatServer() {
        Server.socketio_recvMessages.close();
    
    }
    /* istanbul ignore next */
    public static closeHttpServer() {
        Server.serverListener.close();
    }

    /* istanbul ignore next */
    public static startHttpServer() {
        Server.serverListener = Server.http_server_recvMessages.listen(Server.PORT_APP,() => {
            console.log('Started On Port : ',Server.PORT_APP);
        })
     //   Server.serverListener.close();
    }

        /* istanbul ignore next */
    public static startMaintananceServer() {

    }



}