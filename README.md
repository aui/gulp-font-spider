# 字蛛 gulp 插件

> 中文 WebFont 自动化压缩工具 [字蛛](https://github.com/aui/font-spider) 的 gulp 插件。 

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