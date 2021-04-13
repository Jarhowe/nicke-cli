const chalk = require('chalk');
const colors = new Array('green' , 'blue' , 'yellow' ,'red');
const consoleColorsMap = {};

/* 实现console color */
colors.forEach(_colorsItem => {
    consoleColorsMap[_colorsItem] = function(text, isConsole = true) {
        return isConsole ? console.log(chalk[_colorsItem](text)) : chalk[_colorsItem](text);
    };
});

module.exports = consoleColorsMap;