#!/usr/bin/env node
const ora = require('ora');
const chalkLog = require('../utils/chalk-log');
const utils = require('../utils/index'); 
const templateObj = require(utils.resolve('template'));


const spinner = ora('Template Loading...');
spinner.start();

Promise.resolve().then(() => {
    spinner.succeed();
    chalkLog.green('🌟 Template Loading is completed! ');
    Object.keys(templateObj).forEach((templateName, templateIndex) => {
        const _tempIdx = templateIndex + 1;
        chalkLog.green(`${_tempIdx}、${templateName}`);
    });
});