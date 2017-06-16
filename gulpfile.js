'use strict'

const gulp = require('gulp')

const pug = require('gulp-pug')

const coffee = require('gulp-coffee')
const uglify = require('gulp-uglify')

const sass = require('gulp-sass')
const cleanCSS = require('gulp-clean-css')

const source = 'src/**/*'
const clientOutput = 'public'
const html = '.pug'
const styles = '.sass'
const scripts = '.coffee'

gulp.task('html', function () {
  return gulp.src(source + html)
    .pipe(pug())
    .pipe(gulp.dest(clientOutput))
})

gulp.task('styles', function () {
  return gulp.src(source + styles)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest(clientOutput))
})

gulp.task('scripts', function () {
  return gulp.src(source + scripts)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest(clientOutput))
})

gulp.task('watch', function () {
  gulp.watch(source + html, ['html'])
  gulp.watch(source + styles, ['styles'])
  gulp.watch(source + scripts, ['scripts'])
})

gulp.task('default', ['watch', 'html', 'scripts', 'styles'])