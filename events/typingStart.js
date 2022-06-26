const Sleep = require('../modules/sleep'); // delayInMilliseconds
const Log = require('../modules/logger'); // DEBUG, ERROR, FATAL, INFO, LOG, WARN; │, ─, ├─, └─

module.exports = {
    name: "typingStart",
    once: false,
    async execute(typing) {
        console.log("`typingStart` even triggered!");
    }
}
