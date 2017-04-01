var gulp = require('gulp');
var babel= require('gulp-babel');

gulp.task('es625', function(){
  return gulp.src('src/**/*.js')   //ES6源码存放的路径
             .pipe(babel())
	     .pipe(gulp.dest('dist'));  //转换成es5存放的路径
});
