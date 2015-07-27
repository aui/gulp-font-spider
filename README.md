# 字蛛-gulp插件

中文 WebFont 自动化压缩工具，它能自动分析页面使用的 WebFont 并进行按需压缩。

官方网站：<http://font-spider.org>

## 特性

相对于图片，WebFont 拥有更好的体验。它支持选中、搜索、翻译、朗读、缩放等，而字蛛作为一个 WebFont 压缩转码工具，拥有如下特性：

1. 按需压缩：数 MB 的中文字体可被压成几十 KB
2. 简单可靠：完全基于 CSS 规则，无需 js 与服务端辅助
3. 自动转码：支持 IE 与标准化的浏览器

## 安装

```
npm install gulp-font-spider --save-dev
```

## 使用

```
var gulp = require( 'gulp' ),
	fontSpider = require( 'gulp-font-spider' );
	
gulp.task( 'fontspider', function(){
	return gulp.src( './index.html' )
		.pipe( fontSpider() );
});

gulp.task( 'defualt', ['fontspider'] );
```

## API 

### fontSpider( options )

### options

名称 | 类型 | 默认值 | 说明
---- | ---- | ---- | -----
map | Array | [] | 映射 CSS 内部 HTTP 路径到本地。示例：[['http://demo.io/css', __dirname + '/css']]
ignore | Array | [] | 忽略的文件配置（可以是字体、CSS、HTML）。示例：['icons.ttf', '*.bk.css']
backup | Boolean | true | 是否备份字体
silent | Boolean | false | 不显示非关键错误

## 使用场景限制

- 不支持元素行内样式（仅支持 `<link>` 与 `<style>` 标签声明的样式）
- CSS `content` 属性插入的字符需要定义 `font-family`，不支持继承
- 不支持 javascript 动态插入的样式与元素节点
- 不支持 .otf 格式的字体

##	字体兼容性参考

格式 | IE | Firefox | Chrome | Safari | Opera | iOS Safari | Android Browser | Chrome for Android 
----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | -----
``.eot`` | 6  | -- | -- | -- | -- | -- | -- | --
``.woff`` | 9 | 3.6 | 5 | 5.1 | 11.1 | 5.1 | 4.4 | 36 
``.ttf`` | --  | 3.5 | 4 | 3.1 | 10.1 | 4.3 | 2.2 | 36
``.svg`` | -- | -- | 4 | 3.2 | 9.6 | 3.2 | 3 | 36

来源：<http://caniuse.com/#feat=fontface>

## 贡献者

*  [@chenmnkken](https://github.com/chenmnkken)

=============

*字体受版权保护，若在网页中使用商业字体，请联系相关字体厂商购买授权*