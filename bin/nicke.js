#!/usr/bin/env node
const program = require('commander');
const chalkColor = require('../utils/chalk-log');
const inquirer = require('../libs/inquirer.promise');
const create = require('../src/create');
const {green, blue, yellow, red} = chalkColor;


program.version(require('../package').version);

/* create a project */
program.command('create')
    .description('create a project')
    .action(function() {
        green('===== [欢迎使用nicke-cli, 轻松构建web项目工程] =====');
        inquirer.inquirer_create().then(result => {
            if (result.conf) {
                create(result);
            }
        });
    });


/* start project */
program.command('start')
    .description('start a project')
    .action(function() {
        green('===== [正在为您启动项目，请稍后。。。] =====');
    });


/* build project */
program.command('build')
    .description('build a project')
    .action(function() {
        green('===== [正在为您打包项目，请稍后。。。] =====');
    });

program.parse(process.argv);