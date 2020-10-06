const gulp = require('gulp');
const sass = require('gulp-sass');
const server = require('browser-sync');
const rename = require('gulp-rename');
const minify = require('gulp-cssnano');
const imagemin = require('gulp-imagemin');
const del = require('del');
const autoprefixer = require('gulp-autoprefixer');
const sourcemaps = require('gulp-sourcemaps');
const plumber = require('gulp-plumber');
const svgstore = require('gulp-svgstore');
const posthtml = require('gulp-posthtml');
const include = require('posthtml-include');
const cache = require('gulp-cache');
const pngquant = require('imagemin-pngquant');
const webpack = require('webpack');
const webpackStream = require('webpack-stream');
const webpackConfig = require('./webpack.config.js');

gulp.task('html', () => gulp.src('source/*.html')
  .pipe(posthtml([
    include()
  ]))
  .pipe(gulp.dest('docs'))
);

gulp.task('style', () => gulp.src('source/sass/style.scss')
  .pipe(plumber())
  .pipe(sourcemaps.init())
  .pipe(sass())
  .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('docs/css'))
  .pipe(minify())
  .pipe(rename('style.min.css'))
  .pipe(sourcemaps.write('./'))
  .pipe(gulp.dest('docs/css'))
  .pipe(server.stream())
);

gulp.task('scripts', function () {
  return gulp.src('./source/js/main.js')
    .pipe(webpackStream(webpackConfig), webpack)
    .pipe(gulp.dest('./docs/'));
});

gulp.task('json', () => gulp.src('source/json/*.json')
  .pipe(plumber())
  .pipe(gulp.dest('docs/json'))
);

gulp.task('images', () => gulp.src('source/img/**/*.{gif,png,jpg,svg}')
  .pipe(cache(imagemin({ // Сжимаем их с наилучшими настройками
    interlaced: true,
    progressive: true,
    svgoPlugins: [{ removeViewBox: false }],
    use: [pngquant()]
  })))
  .pipe(gulp.dest('docs/img/'))
);

gulp.task('sprite', () => gulp.src('source/img/sprite/*.svg')
  .pipe(svgstore({
    inlineSvg: true
  }))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('docs/img'))
);

gulp.task('copy', () => gulp.src([
    'source/fonts/**/*.{ttf,woff,woff2}',
    'source/img/**',
    'source/favicon/*',
    'source/json/**',
  ],
  {
    base: 'source'
  })
    .pipe(gulp.dest('docs'))
);

gulp.task('clean', () =>
  del('docs')
);

gulp.task('serve', () => {
  server.init({
    server: 'docs/',
    notify: false,
    open: true,
    cors: true,
    ui: false
  });

  gulp.watch('source/img/**/*.{gif,png,jpg,svg,webp}', gulp.series('images'));
  gulp.watch('source/img/sprite/*.svg', gulp.series('sprite'));
  gulp.watch('source/sass/**/*.scss', gulp.series('style'));
  gulp.watch('source/**/*.html', gulp.series('html')).on('change', server.reload);
  gulp.watch('source/js/**/*.js', gulp.series('scripts')).on('change', server.reload);

});

gulp.task('docs', gulp.series('clean', 'images', 'sprite', 'copy', 'style', 'html', 'scripts', 'json'));
