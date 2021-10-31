import queue from 'queue';
import * as verifiers from './chatMessageVerifiers';
import * as chatInputModifier from './chatInputModifier';
import * as denyIntruder from '../denyIntruder';
import * as chat from './chat';
import SocketConfig from "../../config/socketMessages.json";
import { Server } from '../../server';

//list containing last 25 messages
let message_queue = new queue()

export const handleReceivedMessages = function(message:string) : string {
    message = chatInputModifier.stripNewLine(message);

    if (verifiers.checkMessageConditions(message) == false) {
        return null;
    }

    if (verifiers.isGameCommand(message)) {
        message = chatInputModifier.stripAfterCommand(message);
    }

    return message;
}

  /* istanbul ignore next */
export const receiveChatMessage = function(socket:any) {
  
    let last_message_sent_timestamp : number;
    let current_messate_send_timestamp : number;
    socket.on(SocketConfig.ReceiveChatMessageFromClient, function(message) {
        if(Server.getServerState() >= 2) {
            socket.disconnect();
            return null;
        }
        current_messate_send_timestamp = new Date().getTime();
        if(denyIntruder.isInhumanTypingSpeed(last_message_sent_timestamp,current_messate_send_timestamp,50)) {
            socket.disconnect();
            return null;
        }
        last_message_sent_timestamp = new Date().getTime();
    
        if(chat.handleReceivedMessages(message) != null) {
            socket.broadcast.emit(SocketConfig.BroadcastChatMessage,message);
            return message;
        }
        return null;

    });
}

export const addUser = function (req:any,res:any) {
    console.log(req.query.user)
    if(verifiers.isHTML(req.query.user)               || 
       verifiers.isEncodedURL(req.query.user)         ||
       !verifiers.isUsernameValid(req.query.user) ||
       Server.hasUser(req.query.user)) {

        res.sendStatus(400);
    }
    else {
        Server.addUser(req.query.user);
        res.sendStatus(200);
    }

}

module.exports = {handleReceivedMessages,receiveChatMessage,addUser};