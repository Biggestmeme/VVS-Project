"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const helmet_1 = __importDefault(require("helmet"));
const chat = __importStar(require("./controllers/chat/chat"));
const userRoutes = __importStar(require("./routes/user"));
class Server {
    constructor(port, state) {
        Server.IP = "localhost";
        Server.PORT_APP = port;
        Server.state = state;
        Server.users = new Set();
    }
    static changeAppPort(port) {
        this.PORT_APP = port;
    }
    static changeServervState(state) {
        this.state = state;
    }
    static getServerState() {
        return this.state;
    }
    static getPortApp() {
        return this.PORT_APP;
    }
    static addUser(user) {
        this.users.add(user);
    }
    static hasUser(user) {
        return this.users.has(user);
    }
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    /* istanbul ignore next */
    static getInstance(port, state) {
        if (!Server.instance) {
            Server.instance = new Server(port, state);
        }
        return Server.instance;
    }
    /* istanbul ignore next */
    static setupServer() {
        Server.app.use((0, helmet_1.default)());
        Server.app.use(userRoutes.router);
        Server.http_server_recvMessages = new http_1.default.Server(Server.app);
        Server.socketio_recvMessages = new socket_io_1.default.Server(Server.http_server_recvMessages, { cors: { origin: '*' } });
        Server.startChatServer();
        Server.startHttpServer();
    }
    /* istanbul ignore next */
    static startChatServer() {
        Server.socketio_recvMessages.on("connection", function (socket) {
            console.log("Client Connected");
            if (Server.getServerState() == 0) {
                chat.receiveChatMessage(socket);
            }
        });
    }
    /* istanbul ignore next */
    static closeChatServer() {
        Server.socketio_recvMessages.close();
    }
    /* istanbul ignore next */
    static closeHttpServer() {
        Server.serverListener.close();
    }
    /* istanbul ignore next */
    static startHttpServer() {
        Server.serverListener = Server.http_server_recvMessages.listen(Server.PORT_APP, () => {
            console.log('Started On Port : ', Server.PORT_APP);
        });
        //   Server.serverListener.close();
    }
    /* istanbul ignore next */
    static startMaintananceServer() {
    }
}
exports.Server = Server;
Server.app = (0, express_1.default)();
