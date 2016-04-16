# 字蛛 - gulp 插件

字蛛是一个中文 WebFont 自动化压缩工具，它能自动分析页面使用的 WebFont 并进行按需压缩，无需手工配置。

官方网站：<http://font-spider.org>

## 特性

1. 按需压缩：从原字体中剔除没有用到的字符，可以将数 MB 大小的中文字体压缩成几十 KB
2. 简单可靠：完全基于 HTML 与 CSS 分析进行本地处理，无需 js 与服务端辅助
3. 自动转码：将字体转码成所有浏览器支持的格式，包括老旧的 IE6 与现代浏览器
4. 图标字体：除了常规的字体支持外，还支持图标字体（字蛛 v1.0.0 新特性）

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

推荐的跨浏览器 `@font-face` CSS 写法：

``` css
/*声明 WebFont*/
@font-face {
  font-family: 'pinghei';
  src: url('../font/pinghei.eot');
  src:
    url('../font/pinghei.eot?#font-spider') format('embedded-opentype'),
    url('../font/pinghei.woff') format('woff'),
    url('../font/pinghei.ttf') format('truetype'),
    url('../font/pinghei.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}

/*使用选择器指定字体*/
.home h1, .demo > .test {
    font-family: 'pinghei';
}
```

> 特别说明： `@font-face` 中的 `src` 定义的 .ttf 文件必须存在，其余的格式将由工具自动生成

## API 

### fontSpider(options)

### options

``` javascript
{
    /**
     * 忽略加载的文件规则（支持正则） - 与 `resourceIgnore` 参数互斥
     * @type    {Array<String>}
     */
    ignore: [],

    /**
     * 映射的文件规则（支持正则） - 与 `resourceMap` 参数互斥 - 可以将远程字体文件映射到本地来
     * @type    {Array<Array<String>>}
     * @example [['http://font-spider.org/font', __diranme + '/font'], ...]
     */
    map: [],

    /**
     * 是否支持备份原字体
     * @type    {Boolean}
     */
    backup: true,

    /**
     * 是否对查询到的文本进行去重处理
     * @type    {Boolean}
     */
    unique: true,

    /**
     * 是否排序查找到的文本
     * @type    {Boolean}
     */
    sort: true,

    /**
     * 是否支持加载外部 CSS 文件
     */
    loadCssFile: true,

    /**
     * 是否忽略内部解析错误-关闭它有利于开发调试
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
     * @type    {Number}    数量
     */
    resourceMaxNumber: 64,

    /**
     * 是否缓存请求成功的资源
     * @type    {Boolean}
     */
    resourceCache: true,

    /**
     * 映射资源路径 - 与 `map` 参数互斥
     * @param   {String}    旧文件地址
     * @return  {String}    新文件地址
     */
    resourceMap: function(file) {},

    /**
     * 忽略资源 - 与 `ignore` 参数互斥
     * @param   {String}    文件地址
     * @return  {Boolean}   如果返回 `true` 则忽略当当前文件的加载
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
- CSS `content` 属性只支持普通文本，不支持属性、计数器等特性

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