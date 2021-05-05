#!/usr/bin/env node
const program = require('commander');
const path = require('path');
const fs = require('fs');
const glob = require('glob');
const ora = require('ora');
const logSymbols = require('log-symbols');
const chalkLog = require('../utils/chalk-log');
const utils = require('../utils/index'); 
const gitDownload = require('download-git-repo');
const templateObj = require(utils.resolve('template'));

// 配置命令
/**
 * 如：nicke init <template-name> [project-name]
 * template-name: 模板名称
 * project-name: 项目名称
 */
program.usage('<template-name> [project-name]');
program.parse(process.args);

// 当没有输入参数时默认help提示
if (program.args.length < 1) {
    return program.help();
}


const templateName = program.args[0];
const projectName = program.args[1];

// 选中模板名称是否存在配置模板对象
if (!templateObj[templateName]) {
    chalkLog.red('\n Template does not exit! \n ');
    return;
}

// 项目名称为空 
if (!projectName) {
    chalkLog.red(`\n Project should not be empty! \n`);
    return;
}

// 判断项目名称是否存在该目录
// 1 - 同步读取当前目录文件名(Array[String])
const globList = glob.sync('*');

// 2 - 项目名称是否存在
if (globList.length) {
    const fileNameFlag = globList.filter(nameItem => {
        const _fileName = path.resolve(process.cwd(), path.join('.', nameItem));
        const isDir = fs.statSync(_fileName).isDirectory();
        return nameItem.indexOf(projectName) != -1 && isDir;
    });
    if (fileNameFlag.length !== 0) {
        console.error(logSymbols.error, chalkLog.red(`创建项目${projectName}已经存在`, false));
        return;
    }
}


// 模板地址
const template_url = templateObj[templateName];

chalkLog.green(`\n Start generating... \n`);
const spinner = ora('Template Downloading...');
spinner.start();

gitDownload(template_url, projectName, { clone: true } , error => {
    // 下载失败
    if (error) {
        spinner.fail();
        chalkLog.red(`Generation failed. ${error}`);
        return;
    }

    spinner.succeed();
    chalkLog.green('\n 🌟 Generation completed! ');
    console.log('\n 🌟 To get started');
    console.log(`\n cd ${projectName} \n`);

});