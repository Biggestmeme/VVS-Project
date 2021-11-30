"use strict";
exports.__esModule = true;
exports.stripAfterCommand = exports.stripNewLine = void 0;
var stripNewLine = function (message) {
    return message.replace(/\n/g, '');
};
exports.stripNewLine = stripNewLine;
var stripAfterCommand = function (message) {
    return message.split(' ')[0];
};
exports.stripAfterCommand = stripAfterCommand;
module.exports = { stripNewLine: exports.stripNewLine, stripAfterCommand: exports.stripAfterCommand };
