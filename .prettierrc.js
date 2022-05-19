module.exports = {
    semi: true,
    useTabs: false, // 使用空格代替tab缩进
    tabWidth: 4, // 缩进长度
    printWidth: 120,
    singleQuote: true, //使用单引号
    quoteProps: 'as-needed', //仅在必需时为对象的key添加引号
    endOfLine: 'lf', // 结束行形式
    trailingComma: 'all', //多行时尽可能打印尾随逗号
    bracketSpacing: true, // 在对象前后添加空格 -> eg: { foo: bar }
    embeddedLanguageFormatting: 'auto', //对引用代码进行格式化
    htmlWhitespaceSensitivity: 'ignore', //对HTML全局空白不敏感
 }