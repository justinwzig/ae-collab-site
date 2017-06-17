'use strict'

//PLUGINS
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

//DATA
const packageJSON = require ('./package.json')

/* COMPILE PUG
var pugLocals = {
  siteTitle: packageJSON.name
  siteDescription: packageJSON.description
}
*/

gulp.task('html', function () {
  return gulp.src(source + html)
    .pipe(pug())
    .pipe(gulp.dest(clientOutput))
})

/* COMPILE SASS */
gulp.task('styles', function () {
  return gulp.src(source + styles)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(gulp.dest(clientOutput))
})

/* COMPILE SASS */
gulp.task('scripts', function () {
  return gulp.src(source + scripts)
    .pipe(coffee())
    .pipe(uglify())
    .pipe(gulp.dest(clientOutput))
})

/* WATCH */
gulp.task('watch', function () {
  gulp.watch(source + html, ['html']).on('error', swallowError)
  gulp.watch(source + styles, ['styles']).on('error', swallowError)
  gulp.watch(source + scripts, ['scripts']).on('error', swallowError)
}).on('error', swallowError)


//gulp.task('default', ['watch', 'scripts', 'styles'])
gulp.task('default', ['watch', 'html', 'scripts', 'styles']).on('error', swallowError)

function swallowError (error){
  console.log(error.toString())
  this.emit('end')
}