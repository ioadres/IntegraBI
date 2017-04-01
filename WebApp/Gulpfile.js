/// <binding BeforeBuild='min' Clean='clean' />
"use strict";

var gulp = require("gulp"),
    concat = require("gulp-concat"),
    cssmin = require("gulp-cssmin"),
    htmlmin = require("gulp-htmlmin"),
    uglify = require("gulp-uglify"),
    merge = require("merge-stream"),
    del = require("del"),
    bundleconfig = require("./bundleconfig.json"),
    inject = require('gulp-inject');
    var run = require('run-sequence');
    var sass = require('gulp-sass');

var regex = {
    css: /\.css$/,
    scss: /\.scss$/,
    html: /\.(html|htm)$/,
    js: /\.js$/
};

gulp.task('dev',[], function(callback) {
	run(['dev:move','create:index.html','min:css']);
});

gulp.task('dev:move', ['move:app','move:lib','move:img']);
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


gulp.task('move:app', function () {
    gulp.src('App/**/*', { base: './App' })
        .pipe(gulp.dest('./wwwroot/App'));
});

gulp.task('move:views', function () {
    gulp.src('App/**/*.html', { base: './App' })
        .pipe(gulp.dest('./wwwroot/App'));
});

gulp.task('move:lib', function () {
    gulp.src('Content/Lib/**/*', { base: './Content/Lib' })
        .pipe(gulp.dest('./wwwroot/lib'));
});

gulp.task('move:img', function () {
    gulp.src('Content/img/**/*', { base: './Content/img' })
        .pipe(gulp.dest('./wwwroot/img'));
});

gulp.task('create:index.html', function () {
    gulp.src('./Views/index.html', { base: './Views/' })
        .pipe(gulp.dest('./wwwroot/'));

     gulp.src('./wwwroot/index.html')
	    .pipe(inject(gulp.src(['./App/**/*.js'], { read: false }),{starttag: '<!-- inject:dev:{{ext}} -->' }))
	    .pipe(gulp.dest('./wwwroot/'));
});

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