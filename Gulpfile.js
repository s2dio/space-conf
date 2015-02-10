var gulp = require("gulp"),
    imagemin = require('gulp-image-optimization'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    concatCss = require('gulp-concat-css'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css');


gulp.task('js', function() {
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/angular-cookies/angular-cookies.js',
        './bower_components/angular-translate/angular-translate.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-resource/angular-resource.js',
        './js/lib/*',
        './bower_components/modernizr/modernizr.js',
        './js/script.js',

    ])
        .pipe(sourcemaps.init())
        .pipe(concat("app.js"))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest("./build/assets/"));
});


gulp.task("css", function() {
    gulp.src([
        './css/*.css'
    ])
        .pipe(sourcemaps.init({ loadMaps: true }))
        .pipe(concatCss('app.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./build/assets/'))
});




gulp.task('images', function(cb) {
    gulp.src(['images/**/*.png','images/**/*.jpg','images/**/*.gif','images/**/*.jpeg']).pipe(imagemin({
        optimizationLevel: 5,
        progressive: true,
        interlaced: true
    })).pipe(gulp.dest('./build/images')).on('end', cb).on('error', cb);
});




gulp.task("watch", ['js', 'css', 'images'], function() {
    gulp.watch('./js/**/*', ['js']);
    gulp.watch('./css/*', ['css']);
    gulp.watch('./images/*', ['images']);

});

gulp.task("connect", function() {
    console.log(connect);

    connect.server({
        root: "./",
        hostname: 'localhost',
        livereload: true,
        port: 3000
    });
});


gulp.task("default", ["watch", "connect"], function() {});