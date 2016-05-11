// 引入 gulp
var gulp = require('gulp'); 

// 引入组件
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');

// 检查脚本  Link任务会检查js/目录下得js文件有没有报错或警告。
gulp.task('lint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// 编译Sass  Sass任务会编译scss/目录下的scss文件，并把编译完成的css文件保存到/css目录中。
gulp.task('sass', function() {
    gulp.src('./scss/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('./css'));
});

// 合并，压缩文件
// scripts任务会合并js/目录下得所有得js文件并输出到dist/目录，然后gulp会重命名、压缩合并的文件，也输出到dist/目录。
gulp.task('scripts', function() {
    gulp.src('./js/*.js')
        .pipe(concat('all.js'))
        .pipe(gulp.dest('./dist'))
        .pipe(rename('all.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./dist'));
});

// 默认任务
gulp.task('default', function(){
    gulp.run('lint', 'sass', 'scripts');

    // 监听文件变化
    gulp.watch('./js/*.js', function(){
        gulp.run('lint', 'sass', 'scripts');
    });
});
// 这时，我们创建了一个基于其他任务的default任务。使用.run()方法关联和运行我们上面定义的任务，使用.watch()方法去监听指定目录的文件变化，当有文件变化时，会运行回调定义的其他任务。
// 以常见的Gulp插件为例,如下：

// js代码校验(gulp-jshint)
// 合并js文件(gulp-concat)
// 压缩js代码(gulp-uglify)
// sass的编译(gulp-sass)
// less的编译(gulp-less)
// 压缩css(gulp-minify-css)
// 重命名(gulp-rename)
// npm install gulp-jshint gulp-concat gulp-uglify gulp-sass gulp-less gulp-minify-css gulp-rename --save-dev