我先用中文吧...

### 包服务对象
针对开始学习es6陌生语法，希望在demo过程中自己对比出es6和es5区别的同学。
功能是将src目录下的es6.js文件通过 __gulp es625__ 打在 __dist__ 下，利用 __babel__ 的转换功能。
最终在编辑器里方便的对比。

### 依赖
依赖 __gulp__ 和 __babel__ ，具体如下:
```javascript
"gulp": "^3.9.1",
"gulp-babel": "^6.1.2" ,
"babel-preset-es2015": "^6.24.0",
"babel-plugin-transform-es2015-modules-amd": "^6.24.0"
```

### 需要你做的
项目结构如下：
```javascript
  -- dist
    -- es5.js
  -- src
    -- es6.js
  -- .babelrc
  -- .gitignore
  -- .npmignore
  -- gulpfile.js
  -- package.json
  -- README.md
```
配置文件内容如下：
```javascript
//.babelrc
{
  "presets": ["es2015"]
}
```
```javascript
// gulpfile.js
var gulp = require('gulp');
var babel= require('gulp-babel');

gulp.task('es625', function(){
  return gulp.src('src/**/*.js')   //ES6
             .pipe(babel())
	     .pipe(gulp.dest('dist'));  //result of ES6 to ES5
});
```
