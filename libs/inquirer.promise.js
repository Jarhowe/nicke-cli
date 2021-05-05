const inquirer = require('inquirer');

const inquirer_create = (promptConfig) => {
    return new Promise(resolve => {
        inquirer.prompt(promptConfig).then(res => {
            resolve(res);
        });
    });
};

module.exports = {
    inquirer_create
};