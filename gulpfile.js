var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');

gulp.task('scripts', function () {
  return gulp.src('public/javascripts/*js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'))
})

gulp.task('styles', function () {
  return gulp.src('public/stylesheets/style.css')
  .pipe(minifyCss())
  .pipe(gulp.dest('public/dist'))
})

gulp.task('watchout', function () {
  gulp.watch('public/javascripts/*js', ['scripts']);
  gulp.watch('public/stylesheets/style.css', ['styles']);
})

gulp.task('default', ['scripts', 'styles', 'watchout'])
