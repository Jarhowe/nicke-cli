#!/usr/bin/env node
const program = require('commander');

program
    // 定义当前版本
    .version(require('../package').version)
    // 定义使用的方法
    .usage('<command> [options]')
    // 编写自定义指令
    .command('list', 'list all the template')   // 查看所有开发模板
    .command('add', 'add template')   // 添加模板
    .command('delete', 'delete template')   // 删除模板
    .command('init', 'generate a new project from a template')  // 生成指定的模板

// 解析命令行参数
program.parse(process.argv);