var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();
var imagemin = require('gulp-imagemin');
var pngquant = require('imagemin-pngquant');
var autoprefixer = require('gulp-autoprefixer');
var useref = require('gulp-useref');
var gulpif = require('gulp-if');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var del = require('del');

//browser prefixer systems;
var AUTOPREFIXER_BROWSERS = [
    'Android 2.3',
    'Android >= 4',
    'Chrome >= 20',
    'Firefox >= 24', // Firefox 24 is the latest ESR
    'Explorer >= 9',
    'iOS >= 6',
    'Safari >= 6'
];

//build task less to css;
gulp.task('less', function () {
    return gulp.src('./src/less/*.less')
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
gulp.task('server', ['less'], function () {
    browserSync.init({
        server: {
            baseDir: "./src",
            directory: true
        },
        port: 3600 //port  can set self
    });
    gulp.watch('./src/**/*.less', ['less']);
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
        .pipe(gulp.dest('dist'));
});