const getDefaultPrompt = [
    {
        name:'conf',
        type:'confirm',
        message:'是否创建新的项目？'
    },
    {
        name:'name',
        message:'请输入项目工程名称？',
        when: res => Boolean(res.conf)
    },
    {
        name:'author',
        message:'请输入开发作者？',
        when: res => Boolean(res.conf)
    }
];

module.exports = {
    getDefaultPrompt
};