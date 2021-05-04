const getDefaultPrompt = [
    {
        name:'conf',
        type:'confirm',
        message:'是否创建新的项目？'
    },
    {
        name:'projectName',
        message:'请输入项目工程名称？',
        when: res => Boolean(res.conf)
    },
    {
        name:'author',
        message:'请输入开发作者？',
        when: res => Boolean(res.conf)
    },
    {
        name: 'list',
        message: '请选择桌面端UI组件库？',
        name: 'component',
        choices: ['element-ui','ant-design-vue'], /* 选项*/
        filter: value => value.toLowerCase(),
        when: res => Boolean(res.conf)
    }
];

module.exports = {
    getDefaultPrompt
};