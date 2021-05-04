const fs = require('fs');
const Utils = require('../utils/index');
const chalkColor = require('../utils/chalk-log');


/**
 * 修改模板package.json文件
 * @param {Object} promptResult 命令交互返回结果
 * @param {String} templateSourcePath 模板资源文件路径
 * @returns 
 */
const modifyPackageJson = (promptResult, templateSourcePath) => {
    return new Promise((resolve)=>{
        const template_packageJson_path = `${templateSourcePath}/package.json`;
        // 读取指定文件内容
        fs.readFile(template_packageJson_path, (error, data) => {
            if (error) throw error;
            const { projectName, author } = promptResult;
            let packageJson_result = data.toString();
            packageJson_result = packageJson_result.replace(/name/g, projectName.trim());
            packageJson_result = packageJson_result.replace(/author/g, author.trim());
            const path = process.cwd() + '/package.json';
            fs.writeFile(path, Buffer.from(packageJson_result), () => {
                chalkColor.green( '创建文件：'+ path )
                resolve()
            })
        })
    })
}


module.exports = function(result) {
    chalkColor.green('开始构建, 请稍后...');
    const tempalte_sourcePath = Utils.resolve('template');
    // 修改package.json
    modifyPackageJson(result, tempalte_sourcePath).then(() => {

    });
}