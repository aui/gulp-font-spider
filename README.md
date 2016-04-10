# 字蛛 - gulp 插件

中文 WebFont 自动化压缩工具，它能自动分析页面使用的 WebFont 并进行按需压缩，并不需要指定字体与字符。

官方网站：<http://font-spider.org>

## 特性

在网页中呈现艺术字体，WebFont 会比图片拥有更好的体验，它支持选中、搜索、翻译、朗读、缩放等。字蛛作为一个 WebFont 压缩转码工具，拥有如下特性：

1. 按需压缩：数 MB 的中文字体可被压成几十 KB
2. 简单可靠：完全基于 CSS 规则，无需 js 与服务端辅助
3. 自动转码：支持 IE 与标准化的浏览器

## 安装

```shell
npm install gulp-font-spider --save-dev
```

## 使用

```javascript
var gulp = require( 'gulp' );
var fontSpider = require( 'gulp-font-spider' );
	
gulp.task('fontspider', function() {
	return gulp.src('./index.html')
		.pipe(fontSpider());
});

gulp.task('defualt', ['fontspider']);
```

## API 

### fontSpider(options)

### options

```javascript
{
    /**
     * 忽略加载的文件规则 - 与 resourceIgnore 参数互斥
     * @see     https://github.com/kaelzhang/node-ignore
     * @type    {Array<String>}
     */
    ignore: [],

    /**
     * 映射的文件规则-可以将远程字体文件映射到本地来（支持正则）
     * @type    {Array<Array<String>>}
     * @example [['http://font-spider.org/font', __diranme + '/font'], ...]
     */
    map: [],

    /**
     * 是否支持备份原字体
     */
    backup: true,

    /**
     * 是否对查询到的文本进行去重处理
     */
    unique: true,

    /**
     * 是否排序查找到的文本
     */
    sort: true,

    /**
     * 是否支持加载外部 CSS 文件
     */
    loadCssFile: true,

    /**
     * 是否忽略内部解析错误-打开它有利于开发调试
     * @type    {Boolean}
     */
    silent: true,

    /**
     * 请求超时限制
     * @type    {Number}    毫秒
     */
    resourceTimeout: 8000,

    /**
     * 最大的文件加载数量限制
     * @tyoe    {Number}    数量
     */
    resourceMaxNumber: 64,

    /**
     * 是否缓存请求成功的资源
     * @return  {Object}
     */
    resourceCache: true,

    /**
     * 映射资源路径 - 与 map 参数互斥
     * @param   {String}    旧文件地址
     * @return  {String}    新文件地址
     */
    resourceMap: function(file) {},

    /**
     * 忽略资源 - 与 ignore 参数互斥
     * @param   {String}    文件地址
     * @return  {Boolean}   如果返回`true`则忽略当当前文件的加载
     */
    resourceIgnore: function(file) {},

    /**
     * 资源加载前的事件
     * @param   {String}    文件地址
     */
    resourceBeforeLoad: function(file) {},

    /**
     * 加载远程资源的自定义请求头
     * @param   {String}    文件地址
     * @return  {Object}
     */
    resourceRequestHeaders: function(file) {
        return {
            'accept-encoding': 'gzip,deflate'
        };
    }
}
```

## 使用场景限制

- 仅支持固定的文本与样式，不支持 javascript 动态插入的元素与样式
- .otf 字体需要转换成 .ttf 才能被压缩
- 仅支持 `utf-8` 编码的 HTML 与 CSS 文件

##	字体兼容性参考

| 格式      | IE   | Firefox | Chrome | Safari | Opera | iOS Safari | Android Browser | Chrome for Android | 
| ------- | ---- | ------- | ------ | ------ | ----- | ---------- | --------------- | ------------------ | 
| `.eot`  | 6    | --      | --     | --     | --    | --         | --              | --                 | 
| `.woff` | 9    | 3.6     | 5      | 5.1    | 11.1  | 5.1        | 4.4             | 36                 | 
| `.ttf`  | --   | 3.5     | 4      | 3.1    | 10.1  | 4.3        | 2.2             | 36                 | 
| `.svg`  | --   | --      | 4      | 3.2    | 9.6   | 3.2        | 3               | 36                 | 

来源：<http://caniuse.com/#feat=fontface>

## 贡献者

*  [@chenmnkken](https://github.com/chenmnkken)
*  [@aui](https://github.com/aui)

## 相关链接

- [fontmin](https://github.com/ecomfe/fontmin)
- [Google: 网页字体优化](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/webfont-optimization?hl=zh-cn)
- [思源黑体: ttf 版本](https://github.com/akiratw/kaigen-gothic/releases)

=============

*字体受版权保护，若在网页中使用商业字体，请联系相关字体厂商购买授权*