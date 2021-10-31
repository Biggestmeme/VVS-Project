"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isInhumanTypingSpeed = void 0;
const isInhumanTypingSpeed = function (timestamp_1, timestamp_2, miliseconds) {
    return (timestamp_2) - (timestamp_1) <= miliseconds;
};
exports.isInhumanTypingSpeed = isInhumanTypingSpeed;
module.exports = { isInhumanTypingSpeed: exports.isInhumanTypingSpeed };
