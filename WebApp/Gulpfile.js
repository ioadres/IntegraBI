    /// <binding BeforeBuild='min' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    htmlmin = require("gulp-htmlmin"),
    uglify = require("gulp-uglify"),
    merge = require("merge-stream"),
    del = require("del"),    
    inject = require('gulp-inject'),
    sass = require('gulp-sass'),
    gulpSequence = require('gulp-sequence'),
    gulpReplace = require('gulp-replace'),
    bundleconfig = require("./bundleconfig.json");

var regex = {
    css: /\.css$/,
    scss: /\.scss$/,
    html: /\.(html|htm)$/,
    js: /\.js$/
};

gulp.task('dev', gulpSequence(['dev:move', 'min:css'],'dev:inject:WebApiUrl', 'dev:index.html'));
gulp.task('dev:move', gulpSequence(['move:app', 'move:lib', 'move:img']));
gulp.task('dev:index.html', gulpSequence('dev:create:index.html', 'dev:inject:index.html'));
gulp.task('dev:clean', ['clean:dev']);


gulp.task('clean:dev', function () {
    del('./wwwroot/App', { force: true });
    del('./wwwroot/lib', { force: true });
    del('./wwwroot/index.html', { force: true });
    var files = bundleconfig.map(function (bundle) {
        return bundle.outputFileName;
    });

    return del(files);
});

/** Move Folders **/
gulp.task('move:app', function () {
    return gulp.src('App/**/*', { base: './App' })
        .pipe(gulp.dest('./wwwroot/App'));
});

gulp.task('move:views', function () {
    return gulp.src('App/**/*.html', { base: './App' })
        .pipe(gulp.dest('./wwwroot/App'));
});

gulp.task('move:lib', function () {
    return gulp.src('Content/Lib/**/*', { base: './Content/Lib' })
        .pipe(gulp.dest('./wwwroot/lib'));
});

gulp.task('move:img', function () {
    return gulp.src('Content/img/**/*', { base: './Content/img' })
        .pipe(gulp.dest('./wwwroot/img'));
});

/** Manage index.html **/
gulp.task('dev:create:index.html', function() {
    return gulp.src('./Views/index.html', { base: './Views/' })
        .pipe(gulp.dest('./wwwroot/'));
});
gulp.task('dev:inject:index.html', function() {
   return gulp.src('./wwwroot/index.html')
        .pipe(inject(gulp.src(['./App/**/*.js'], { read: false }), { starttag: '<!-- inject:dev:{{ext}} -->' }))
        .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('dev:inject:WebApiUrl', function() {
    return gulp.src('./wwwroot/App/Common/ngConstants.js')
        .pipe(gulpReplace(/URLSERVICE/g, '"http://integrabiapi.azurewebsites.net/api"'))
        .pipe(gulp.dest('./wwwroot/App/Common/'));
});

gulp.task('local:inject:WebApiUrl', function() {
    return gulp.src('./wwwroot/App/Common/ngConstants.js')
        .pipe(gulpReplace(/URLSERVICE/g, '"http://localhost:5000/api"'))
        .pipe(gulp.dest('./wwwroot/App/Common/'));
});

/** Manage min.css **/
gulp.task('min:css', function () {
	gulp.src("./Content/css/site.scss")
	        .pipe(sass().on('error', sass.logError))
	        .pipe(gulp.dest("Content/css/"));
	
	var tasks = getBundles(regex.css).map(function (bundle) {

	    return gulp.src(bundle.inputFiles, { base: "." })
	        .pipe(concat(bundle.outputFileName))
	        .pipe(cssmin())
	        .pipe(gulp.dest("."));
	});
	return merge(tasks);
});


gulp.task("watch:dev", function () {
	gulp.watch('./Views/index.html', ['dev']);
});

function getBundles(regexPattern) {
    return bundleconfig.filter(function (bundle) {
        return regexPattern.test(bundle.outputFileName);
    });
}