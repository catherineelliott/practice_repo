var gulp = require('gulp');
var sass = require('gulp-sass');
var sassInheritance = require('gulp-sass-inheritance');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var jshint = require('gulp-jshint');
var sourcemaps = require('gulp-sourcemaps');
var rename = require('gulp-rename');

var paths = {
  source: {scripts: './source/javascript/**/*.js', stylesheets: './source/stylesheets/**/*.scss'},
  target: {scripts: './public/javascript', stylesheets: './public/stylesheets'}
};

gulp.task('lint', function() {
  return gulp.src(paths.source.scripts)
    .pipe(jshint())
    .pipe(jshint.reporter('default'))
});

gulp.task('minifyjs', ['lint'], function () {
  return gulp.src(paths.source.scripts)
    .pipe(sourcemaps.init())
    .pipe(uglify())
    .pipe(rename({
            suffix: '.min'
        }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(paths.target.scripts));
});

gulp.task('sass', function () {
  return gulp.src(paths.source.stylesheets)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(paths.target.stylesheets));
});

gulp.task('watch', function () {
    gulp.watch(paths.source.stylesheets, ['sass:watch']);
    gulp.watch(paths.source.scripts, ['minifyjs']);
});
 
var inheritanceCondition = function (file) {
    //as a result of this, only partials will trigger inheritance compiling
    //i.e. if a full file (not a partial) (1) is imported by another (2), changes to (1) will not trigger compilation in (2)
    var filepath = file.history[0];
    var filename = filepath.replace(/^.*[\\\/]/, '');
    return /\/_/.test(filename) || /^_/.test(filename); // check whether partial (starts with '_');
};

gulp.task('sass:watch', function() {
    console.log('sass:watch')
    return gulp.src(paths.source.stylesheets)
        .pipe(gulpif(inheritanceCondition, sassInheritance({dir: 'stylesheets/'})))
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.target.stylesheets));
});

gulp.task('default', ['sass', 'minifyjs', 'watch']);