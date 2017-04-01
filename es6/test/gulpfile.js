var gulp = require('gulp');
var babel= require('gulp-babel');
 
gulp.task('es625', function(){
  return gulp.src('src/**/*.js')   //ES6 
             .pipe(babel())
         .pipe(gulp.dest('dist'));  //result of ES6 to ES5 
});
