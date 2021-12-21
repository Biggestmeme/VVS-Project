"use strict";
exports.__esModule = true;
exports.checkMessageConditions = exports.isUsernameValid = exports.isGameCommand = exports.isEncodedURL = exports.isHTML = void 0;
var isHTML = function (message) {
    return /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/i.test(message);
};
exports.isHTML = isHTML;
var isEncodedURL = function (message) {
    return /%[0-9A-F]/i.test(message);
};
exports.isEncodedURL = isEncodedURL;
var isGameCommand = function (message) {
    return (/^do:[w|a|s|d|q|e|space]$/i.test(message));
};
exports.isGameCommand = isGameCommand;
var isUsernameValid = function (message) {
    return /^[a-zA-Z0-9_]*$/i.test(message);
};
exports.isUsernameValid = isUsernameValid;
var checkMessageConditions = function (message) {
    //test message length
    if (message.length > 100)
        return false;
    //test if some douchbag tries to enter html into the chat
    if ((0, exports.isHTML)(message))
        return false;
    if ((0, exports.isEncodedURL)(message))
        return false;
    return true;
};
exports.checkMessageConditions = checkMessageConditions;
module.exports = { isHTML: exports.isHTML, isEncodedURL: exports.isEncodedURL, checkMessageConditions: exports.checkMessageConditions, isGameCommand: exports.isGameCommand, isUsernameValid: exports.isUsernameValid };
