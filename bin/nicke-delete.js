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
            } else if (!templateObj[name]) {
                return 'Template does not exist!'
            } else {
                return true
            }
        }
    }
];

inquirer.inquirer_create(question).then(answers => {
    const {templateName} = answers;
    delete templateObj[templateName];
    const spinner = ora('Delete template...');
    spinner.start();
    // 把模板信息写入 template.json 文件中
    fs.writeFile(utils.resolve('template.json'), JSON.stringify(templateObj), 'utf-8', error => {
        if (error) {
            spinner.fail();
            console.error(logSymbols.error, chalkLog.red(`Write failed. ${error}`, false));
            return;
        }
        
        spinner.succeed();
        console.log(logSymbols.success, chalkLog.green(' 🚮 Delete successfully! \n', false));
        chalkLog.blue('The latest template list is: \n');
        Object.keys(templateObj).forEach((templateName, templateIndex) => {
            chalkLog.green(`${templateIndex + 1}、${templateName}`);
        });
    });
});