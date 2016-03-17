const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');


gulp.task('clean:libs', function () {
    return del('dist/lib');
});

gulp.task('clean:html', function() {
    return del('dist/views/*.html');
});

gulp.task('clean:index', function() {
    return del('dist/index.html');
});

gulp.task('clean:compiled', function() {
  return del('dist/app');
});

gulp.task('clean:css', function() {
  return del('dist/css');
});

gulp.task('clean:js', function() {
  return del('dist/js');
});

gulp.task('clean:fonts', function() {
  return del('dist/fonts');
});

gulp.task('compile', ['clean:compiled'], function(){
    gulp.src(['app/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('copy:libs', ['clean:libs'], function() {
    return gulp.src([
            'node_modules/angular2/bundles/angular2-polyfills.js',
            'node_modules/systemjs/dist/system.src.js',
            'node_modules/rxjs/bundles/Rx.js',
            'node_modules/angular2/bundles/angular2.dev.js',
            'node_modules/angular2/bundles/router.dev.js',
            'node_modules/es6-shim/es6-shim.js'
        ])
        .pipe(gulp.dest('dist/lib'))
});

gulp.task('copy:html', ['clean:html'], function() {
    return gulp.src(['views/*.html'], { base : './' })
        .pipe(gulp.dest('dist'))
});

gulp.task('copy:css', ['clean:css'], function() {
    return gulp.src(['css/*'], { base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:js', ['clean:js'], function() {
    return gulp.src(['js/*'], { base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:fonts', ['clean:fonts'], function() {
    return gulp.src(['fonts/*'], { base: './'})
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:index',['clean:index'], function() {
   return gulp.src(['index.html'], {base: './'})
       .pipe(gulp.dest('dist'));
});

gulp.task('copy', ['copy:index','copy:html', 'copy:libs', 'copy:css', 'copy:js', 'copy:fonts']);

gulp.task('serve', ['compile', 'copy'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['index.html'], ['copy:index', browserSync.reload]);
    gulp.watch(['views/*.html'], ['copy:html', browserSync.reload]);
    gulp.watch('app/**/*', ['compile', browserSync.reload]);
    gulp.watch('css/**/*', ['copy:css', browserSync.reload])
});

gulp.task('default', ['serve']);
