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
exports.addUser = exports.receiveChatMessage = exports.handleReceivedMessages = void 0;
const queue_1 = __importDefault(require("queue"));
const verifiers = __importStar(require("./chatMessageVerifiers"));
const chatInputModifier = __importStar(require("./chatInputModifier"));
const denyIntruder = __importStar(require("../denyIntruder"));
const chat = __importStar(require("./chat"));
const socketMessages_json_1 = __importDefault(require("../../config/socketMessages.json"));
const server_1 = require("../../server");
//list containing last 25 messages
let message_queue = new queue_1.default();
const handleReceivedMessages = function (message) {
    message = chatInputModifier.stripNewLine(message);
    if (verifiers.checkMessageConditions(message) == false) {
        return null;
    }
    if (verifiers.isGameCommand(message)) {
        message = chatInputModifier.stripAfterCommand(message);
    }
    return message;
};
exports.handleReceivedMessages = handleReceivedMessages;
/* istanbul ignore next */
const receiveChatMessage = function (socket) {
    let last_message_sent_timestamp;
    let current_messate_send_timestamp;
    socket.on(socketMessages_json_1.default.ReceiveChatMessageFromClient, function (message) {
        console.log(message);
        if (server_1.Server.getServerState() >= 2) {
            socket.disconnect();
            return null;
        }
        current_messate_send_timestamp = new Date().getTime();
        if (denyIntruder.isInhumanTypingSpeed(last_message_sent_timestamp, current_messate_send_timestamp, 50)) {
            socket.disconnect();
            return null;
        }
        last_message_sent_timestamp = new Date().getTime();
        if (chat.handleReceivedMessages(message) != null) {
            socket.broadcast.emit(socketMessages_json_1.default.BroadcastChatMessage, message);
            return message;
        }
        return null;
    });
};
exports.receiveChatMessage = receiveChatMessage;
const addUser = function (req, res) {
    console.log(req.query.user);
    if (verifiers.isHTML(req.query.user) ||
        verifiers.isEncodedURL(req.query.user) ||
        !verifiers.isUsernameValid(req.query.user) ||
        server_1.Server.hasUser(req.query.user)) {
        res.sendStatus(400);
    }
    else {
        server_1.Server.addUser(req.query.user);
        res.sendStatus(200);
    }
};
exports.addUser = addUser;
module.exports = { handleReceivedMessages: exports.handleReceivedMessages, receiveChatMessage: exports.receiveChatMessage, addUser: exports.addUser };
