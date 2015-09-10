var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');

gulp.task('scripts', function () {
  return gulp.src('public/javascripts/*js')
  .pipe(concat('all.js'))
  .pipe(uglify())
  .pipe(gulp.dest('public/dist'))
})

gulp.task('styles', function () {
  return gulp.src('public/stylesheets/style.css')
  .pipe(gulp.dest('public/dist'))
})

gulp.task('watchout', function () {
  gulp.watch('public/javascripts/*js', ['scripts']);
  gulp.watch('public/stylesheets/style.css', ['styles']);
})

gulp.task('default', ['scripts', 'styles', 'watchout'])
