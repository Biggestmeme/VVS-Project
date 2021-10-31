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
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const clientsocketio = __importStar(require("socket.io-client"));
const server_json_1 = __importDefault(require("../../config/server.json"));
const chat = __importStar(require("../../controllers/chat/chat"));
let socket;
let httpServer;
let httpServerAddr;
let ioServer;
let app;
/**
 * Setup WS & HTTP servers
 */
beforeAll((done) => {
    app = (0, express_1.default)();
    httpServer = new http_1.default.Server(app);
    ioServer = new socket_io_1.default.Server(httpServer, { cors: { origin: '*' } });
    httpServer.listen(server_json_1.default.PORT_Chat, () => { });
    done();
});
/**
 *  Cleanup WS & HTTP servers
 */
afterAll((done) => {
    ioServer.close();
    httpServer.close();
    done();
});
/**
 * Run after each test
 */
afterEach((done) => {
    // Cleanup
    if (socket.connected) {
        socket.disconnect();
    }
    done();
});
describe('basic socket.io example', () => {
    test('should communicate', (done) => {
        // once connected, emit Hello World
        ioServer.on('connection', (socket) => {
            console.log("HELLLLLLLLLLOOOOOOOOOOO", socket);
            chat.receiveChatMessage(socket);
            expect(1 + 1).toBe(2);
            done();
        });
        socket = clientsocketio.connect(`ws://[${server_json_1.default.ServerIP}]:${server_json_1.default.PORT_Chat}`);
        socket.emit('sendToServer', 'hello world');
    });
});
