const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');


gulp.task('clean:libs', function () {
    return del('dist/lib');
});

gulp.task('clean:assets', function() {
    return del('dist/**/*.html');
});

gulp.task('clean:compiled', function() {
  return del('dist/app');
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

gulp.task('copy:assets', ['clean:assets'], function() {
    return gulp.src(['index.html'], { base : './' })
        .pipe(gulp.dest('dist'))
});

gulp.task('copy', ['copy:assets', 'copy:libs']);

gulp.task('serve', ['compile', 'copy'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });

    gulp.watch(['*.html'], ['copy:assets', browserSync.reload]);
    gulp.watch('app/**/*', ['compile', browserSync.reload]);
});

gulp.task('default', ['serve']);
