const gulp = require('gulp');
const del = require('del');
const typescript = require('gulp-typescript');
const tscConfig = require('./tsconfig.json');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync');


gulp.task('clean', function () {
    return del('dist/**/*');
});

gulp.task('compile', function(){
    gulp.src(['app/**/*.ts'])
        .pipe(sourcemaps.init())
        .pipe(typescript(tscConfig.compilerOptions))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/app'));
});

gulp.task('copy:libs', ['clean'], function() {
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

gulp.task('copy:assets', ['clean'], function() {
    return gulp.src(['index.html'], { base : './' })
        .pipe(gulp.dest('dist'))
});

gulp.task('serve', ['compile', 'copy:libs','copy:assets'], function() {
    browserSync({
        server: {
            baseDir: 'dist'
        }
    });
});

gulp.task('default', ['serve']);

