var gulp = require('gulp'),
    concat = require('gulp-concat'),
    less = require('gulp-less'),
    pug = require('gulp-pug'),
    watch = require('gulp-watch'),
    LessAutoprefix = require('less-plugin-autoprefix'),
    autoprefix = new LessAutoprefix({ browsers: ['last 13 versions'] });
    imageMin = require('gulp-imagemin');
    pngquant = require('pngquant');
    myPngQuanter = new pngquant([192, '--quality', '60-80', '--nofs', '-']);
    jpegtran = require('jpegtran');
    optipng = require('optipng');
    gifsicle = require('gifsicle');

gulp.task('less', function() {
    return gulp.src('less/*.less').pipe(less({
        plugins: [autoprefix]
    })).pipe(gulp.dest('./build/css/'));
});

gulp.task('pug', function() {
    return gulp.src('pug/*.pug').pipe(pug({
        pretty: true
    })).pipe(gulp.dest('./build/'));
});

gulp.task('image', function() {
    return gulp.src('./images/*')
        .pipe(imageMin({
            progressive: false,
            optimizationLevel: 500,
            svgoPlugins: [{ removeViewBox: false }],
            use: [myPngQuanter, jpegtran(), optipng(), gifsicle]
        }))
        .pipe(gulp.dest('./build/img/'));
});

gulp.task('watch', function() {
    gulp.watch('./less/**/*.less', ['less']);
    gulp.watch('./pug/**/*.pug', ['pug']);
    gulp.watch('./img/*', ['image']);
});
