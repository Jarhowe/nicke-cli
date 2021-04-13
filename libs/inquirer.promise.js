const inquirer = require('inquirer');
const promptConfig = require('./prompt.config');

const inquirer_create = () => {
    return new Promise(resolve => {
        inquirer.prompt(promptConfig.getDefaultPrompt).then(res => {
            resolve(res);
        });
    });
};

module.exports = {
    inquirer_create
};