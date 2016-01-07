var gulp = require('gulp');
var less = require('gulp-less');
var browserSync = require('browser-sync').create();


//build task less to css;
gulp.task('less', function() {
    return gulp.src('./src/less/*.less')
        .pipe(less())
        .pipe(gulp.dest('src/styles'))
        .pipe(browserSync.stream())
});

// build task to watch less files change and carry out task less;
gulp.task('watch-less', function() {
    gulp.watch('src/less/*.less', ['less']);
});

//build web server； node web server， like apache, nginx; 
gulp.task('server', ['less'], function() {
    browserSync.init({
        server: {
            baseDir: "./src",
            directory: true
        },
        port: 4000
    });
    gulp.watch('./src/**/*.less', ['less']);
    gulp.watch('./src/pages/*.html').on('change', browserSync.reload)
});