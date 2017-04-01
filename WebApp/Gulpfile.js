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

var regex = {
    css: /\.css$/,
    html: /\.(html|htm)$/,
    js: /\.js$/
};

gulp.task("dev", ["clean:dev","move:app", "inject:index.html","move:lib","min:css",]);

gulp.task("move:app", function () {
    gulp.src('App/**/*', { base: './App' })
        .pipe(gulp.dest('./wwwroot/App'));
});

gulp.task("move:index.html", function () {
    gulp.src('./Views/index.html', { base: './Views/' })
        .pipe(gulp.dest('./wwwroot/'));
});

gulp.task("inject:index.html",["move:index.html"], function () {
    gulp.src('./wwwroot/index.html')
        .pipe(inject(gulp.src(['./App/**/*.js'], { read: false }),{starttag: '<!-- inject:dev:{{ext}} -->' }))
        .pipe(gulp.dest('./wwwroot/'));
});

gulp.task('clean:dev', function () {
    del('./wwwroot/App', { force: true });
    del('./wwwroot/lib', { force: true });
    del('./wwwroot/index.html', { force: true });
});

gulp.task("move:views", function () {
    gulp.src('App/**/*.html', { base: './App' })
        .pipe(gulp.dest('./wwwroot/App'));
});

gulp.task("move:lib", function () {
    gulp.src('Content/Lib/**/*', { base: './Content/Lib' })
        .pipe(gulp.dest('./wwwroot/lib'));
});

gulp.task("min:css", function () {
    var tasks = getBundles(regex.css).map(function (bundle) {
        return gulp.src(bundle.inputFiles, { base: "." })
            .pipe(concat(bundle.outputFileName))
            .pipe(cssmin())
            .pipe(gulp.dest("."));
    });
    return merge(tasks);
});

gulp.task("clean", function () {
    var files = bundleconfig.map(function (bundle) {
        return bundle.outputFileName;
    });

    return del(files);
});

function getBundles(regexPattern) {
    return bundleconfig.filter(function (bundle) {
        return regexPattern.test(bundle.outputFileName);
    });
}