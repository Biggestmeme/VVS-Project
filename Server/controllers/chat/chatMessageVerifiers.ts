export const isHTML = function(message:string) : boolean {
    return /(\<\w*)((\s\/\>)|(.*\<\/\w*\>))/i.test(message);
}

export const isEncodedURL = function(message:string) : boolean {
    return /%[0-9A-F]/i.test(message);
}

export const isGameCommand = function(message: string) : boolean {

    return (/^do:[w|a|s|d|q|e|space]$/i.test(message));
}

export const isUsernameValid = function(message : string) : boolean {
    return /^[a-zA-Z0-9_]*$/i.test(message)
}

export const checkMessageConditions = function(message:string) : boolean {
    //test message length
    if (message.length > 100) 
        return false;

    //test if some douchbag tries to enter html into the chat
    if (isHTML(message)) 
        return false;
    

    if(isEncodedURL(message))
        return false;

    return true;
}

module.exports = {isHTML,isEncodedURL,checkMessageConditions,isGameCommand,isUsernameValid};