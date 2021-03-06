var gulp = require("gulp"),
    imagemin = require('gulp-image-optimization'),
    concat = require('gulp-concat'),
    sourcemaps = require('gulp-sourcemaps'),
    concatCss = require('gulp-concat-css'),
    connect = require('gulp-connect'),
    uglify = require('gulp-uglify'),
    minifyCSS = require('gulp-minify-css'),
    htmlmin = require('gulp-htmlmin');

gulp.task('js', function() {
    gulp.src([
        './bower_components/jquery/dist/jquery.js',
        './bower_components/angular/angular.js',
        './bower_components/angular-route/angular-route.js',
        './bower_components/angular-cookies/angular-cookies.js',
        './bower_components/angular-translate/angular-translate.js',
        './bower_components/angular-sanitize/angular-sanitize.js',
        './bower_components/angular-resource/angular-resource.js',
        './js/script.js',
        './js/lib/*'


    ])
        //.pipe(sourcemaps.init())
        //.pipe(concat("app.js"))
        //.pipe(sourcemaps.write())
        //.pipe(gulp.dest("./build/assets/"));
        //.pipe(sourcemaps.init())



        .pipe(concat('app.js'))
        //.pipe(ngmin())
        .pipe(gulp.dest("./build/assets/"))

        //.pipe(uglify({mangle: false}))
        //.pipe(gulp.dest("./build/assets/"));


        //.pipe(liveReload(server));
        //.pipe(rename('app.js'))
        //.pipe(sourcemaps.write())

});


gulp.task("css", function() {
    gulp.src([
        'css/reset.css',
        'css/style.css',
        'css/slide-them.css',
        'css/responsive.css'
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

gulp.task('minify',function(){
   gulp.src('src/*.html')
       .pipe(htmlmin({collapseWhitespace: true}))
       .pipe(gulp.dest('dist'))
});




gulp.task("watch", ['js', 'css', 'images', 'minify'], function() {
    gulp.watch('./js/**/*', ['js']);
    gulp.watch('./css/*', ['css']);
    gulp.watch('./images/*', ['images']);

});

gulp.task("connect", function() {
    console.log(connect);
    connect.server({
        root: "./",
        hostname: 'localhost',
        port: 3000
    });
});


gulp.task("default", ["watch", "connect"], function() {});