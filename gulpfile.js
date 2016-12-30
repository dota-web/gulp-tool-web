var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var browserify = require('gulp-browserify');
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var rename = require('gulp-rename');
var del = require('del');

//deal with error;
var plumber = require('gulp-plumber')
var handleErrors = require('./gulp/handleErrors.js')

//browser prefixer systems;
var AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24', // Firefox 24 is the latest ESR
    'Explorer >= 9',
    'iOS >= 8',
    'Safari >= 6'
];

//build task less to css;
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
        .pipe(plumber({
            errorHandler: handleErrors
        }))
        .pipe(less())
        .pipe(autoprefixer({browsers: AUTOPREFIXER_BROWSERS}))
        .pipe(gulp.dest('src/styles'))
        .pipe(browserSync.stream())
});

// build task to watch less files change and carry out task less;
gulp.task('watch-less', function () {
    gulp.watch('src/less/*.less', ['less']);
});

//build web server； node web server， like apache, nginx; 
gulp.task('server', ['less', 'js'], function () {
    console.log('watch')
    browserSync.init({
        server: {
            baseDir: "./src",
            directory: true
        },
        port: 3600 //port  can set self
    });
    gulp.watch('./src/**/*.less', ['less']);
    gulp.watch('src/scripts/**/*.js', ['js-watch']);
    gulp.watch('./src/pages/*.html').on('change', browserSync.reload)
});

//imgages min task
gulp.task('imagemin', function () {
    return gulp.src('src/images/**/*')
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('dist/images'))
});

//built probuct web pages (js、css min and)
gulp.task('html', function () {
    del(['dist']);
    return gulp.src('src/pages/*.html')
        .pipe(useref())
        .pipe(gulpif('*.js', uglify() ))
        .pipe(gulpif('*.css', minifyCss() ))
        .pipe(gulp.dest('dist/pages'));
});

//watch js reload pages
gulp.task('js-watch', ['js'], function (done) {
    browserSync.reload();
    done();
});

// build module js
gulp.task('js', function () {
    return gulp.src('./src/scripts/main.js') //set index modules js 
    .pipe(plumber({
        errorHandler: handleErrors
    }))
    .pipe(browserify())
    // .pipe(uglify())
    .pipe(rename('bundle.js'))
    .pipe(gulp.dest('./src/build/'));
});