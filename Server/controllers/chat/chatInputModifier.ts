export const stripNewLine = function(message) : string {
    return message.replace(/\n/g,'');
}

export const stripAfterCommand = function(message) : string {
    return message.split(' ')[0];
}

module.exports = {stripNewLine,stripAfterCommand};