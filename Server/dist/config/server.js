"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
class Server {
    constructor() {
        Server.PORT_APP = 64501;
        Server.state = 0;
    }
    onInit() {
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
    /**
     * The static method that controls the access to the singleton instance.
     *
     * This implementation let you subclass the Singleton class while keeping
     * just one instance of each subclass around.
     */
    static getInstance() {
        if (!Server.instance) {
            Server.instance = new Server();
        }
        return Server.instance;
    }
    /**
     * Finally, any singleton should define some business logic, which can be
     * executed on its instance.
     */
    someBusinessLogic() {
        // ...
    }
}
exports.Server = Server;
