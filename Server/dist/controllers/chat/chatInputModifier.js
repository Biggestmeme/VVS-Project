"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripAfterCommand = exports.stripNewLine = void 0;
const stripNewLine = function (message) {
    return message.replace(/\n/g, '');
};
exports.stripNewLine = stripNewLine;
const stripAfterCommand = function (message) {
    return message.split(' ')[0];
};
exports.stripAfterCommand = stripAfterCommand;
module.exports = { stripNewLine: exports.stripNewLine, stripAfterCommand: exports.stripAfterCommand };
