const gulp = require('gulp'),
  source = require('vinyl-source-stream'),
  browserify = require("browserify"),
  babelify = require("babelify"),
  gutil = require('gulp-util'),
  browserSync = require('browser-sync').create(),
  compass = require('gulp-compass'),
  gcmq = require('gulp-group-css-media-queries'),
  autoprefixer = require('gulp-autoprefixer'),
  jade = require('gulp-jade'),
  reload = browserSync.reload;

gulp.task('jade', function () {
  gulp.src('build/*.jade')
    .pipe(jade({
      pretty: true,
      // locals: dataJade
    }))
    .pipe(gulp.dest('dist/'))
    .pipe(reload({stream: true}));
});

gulp.task('sass', function () {
  gulp.src('build/style/common.sass')
    .pipe(compass({
      sourcemap: true,
      image: 'dist/assets/images',
      sass: 'build/style',
      css: 'dist/css'
    }))
    .on('error', function (error) {
      // Would like to catch the error here
      console.log(error);
      this.emit('end');
    })
    .pipe(gcmq())
    .pipe(autoprefixer({
      browsers: ['last 4 versions'],
      cascade: false
    }))
    // .pipe(minifyCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());

});

gulp.task('es6', function () {
  browserify({debug: true})
    .transform(babelify)
    .require("./build/index.js", {entry: true})
    .bundle()
    .on('error', gutil.log)
    .pipe(source('script.min.js'))
    // .pipe(streamify(uglify()))
    .pipe(gulp.dest('dist/script/'))
    .pipe(reload({stream: true}));
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: "./dist/"
    },
    open: false
  });
});

gulp.task('watch', function () {
  gulp.watch('build/**/*.jade', ['jade']);
  gulp.watch('build/**/*.sass', ['sass']);
  gulp.watch('dist/assets/images/icons/*.png', ['sass']);
  gulp.watch('build/**/*.js', ['es6']);
});

gulp.task('default', [
  'jade',
  'sass',
  'es6',
  'browser-sync',
  'watch'
]);
