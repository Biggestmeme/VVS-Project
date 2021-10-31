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
exports.serverListener = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = __importDefault(require("socket.io"));
const helmet_1 = __importDefault(require("helmet"));
const server_json_1 = __importDefault(require("./config/server.json"));
const server_1 = require("./server");
const chat = __importStar(require("./controllers/chat/chat"));
const userRoutes = __importStar(require("./routes/user"));
const port = 8080;
const app = (0, express_1.default)();
app.use((0, helmet_1.default)());
app.use(userRoutes.router);
server_1.Server.getInstance();
const http_server_recvMessages = new http_1.default.Server(app);
const socketio_recvMessages = new socket_io_1.default.Server(http_server_recvMessages, { cors: { origin: '*' } });
socketio_recvMessages.on("connection", function (socket) {
    if (server_1.Server.getServerState() == 0) {
        console.log(chat.receiveChatMessage(socket));
    }
});
exports.serverListener = http_server_recvMessages.listen(server_json_1.default.PORT_Chat, () => {
    console.log('Started On Port : ', server_json_1.default.PORT_Chat);
});
module.exports = { serverListener: exports.serverListener };
