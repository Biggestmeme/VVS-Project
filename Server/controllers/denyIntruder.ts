
export const isInhumanTypingSpeed = function(timestamp_1:number,timestamp_2:number,miliseconds:number) {
    return (timestamp_2) - (timestamp_1) <= miliseconds;
}

module.exports = {isInhumanTypingSpeed}