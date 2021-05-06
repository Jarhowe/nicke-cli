#!/usr/bin/env node
const inquirer = require('../libs/inquirer.promise');
const logSymbols = require('log-symbols');
const ora = require('ora');
const chalkLog = require('../utils/chalk-log');
const fs = require('fs');
const utils = require('../utils/index'); 
const templateObj = require(utils.resolve('template'));


const question = [
    {
        name: "templateName",
        type: 'input',
        message: "请输入模板名称",
        validate (name) {
            if (name === '' || !name) {
                return 'Template name is required!'
            } else if (templateObj[name]) {
                return 'Template has already existed!'
            } else {
                return true
            }
        }
    },
    {
        name: "templatePath",
        type: 'input',
        message: "请输入模板地址",
        validate (path) {
            if (path === '' || !path) return 'The template path is required!'
            return true
        }
    }
];

inquirer.inquirer_create(question).then(answers => {
    const {templateName, templatePath} = answers;
    // 过滤 unicode 字符
    templateObj[templateName] = templatePath.replace(/[\u0000-\u0019]/g, '');
    const spinner = ora('Writing template...');
    spinner.start();
    // 把模板信息写入 template.json 文件中
    fs.writeFile(utils.resolve('template.json'), JSON.stringify(templateObj), 'utf-8', error => {
        if (error) {
            spinner.fail();
            console.error(logSymbols.error, chalkLog.red(`Write failed. ${error}`, false));
            return;
        }
        
        spinner.succeed();
        console.log(logSymbols.success, chalkLog.green(' 🌟 Added successfully! \n', false));
        chalkLog.blue('The latest template list is: \n');
        Object.keys(templateObj).forEach((templateName, templateIndex) => {
            chalkLog.green(`${templateIndex + 1}、${templateName}`);
        });
    });
});