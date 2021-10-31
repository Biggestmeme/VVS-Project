"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
class Server {
    constructor() {
        Server.PORT_APP = 64501;
        Server.state = 0;
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
    static getInstance() {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }
}
exports.Server = Server;
