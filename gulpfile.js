var gulp = require('gulp');
var copy = require('gulp-copy');
var rename = require('gulp-rename');


gulp.task('copylibs', function() {

  var libs = [
    './node_modules/angular/angular.js',
    './node_modules/angular-route/angular-route.js'
  ]

  libs.forEach(function(lib){
    gulp
      .src(lib)
      .pipe(rename({ dirname: '' }))
      .pipe(gulp.dest('./public/vendor'));
  });
});
