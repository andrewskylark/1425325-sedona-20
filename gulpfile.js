const gulp = require("gulp");
const plumber = require("gulp-plumber");
const sourcemap = require("gulp-sourcemaps");
const sass = require("gulp-sass");
const postcss = require("gulp-postcss");
const autoprefixer = require("autoprefixer");
const sync = require("browser-sync").create(); // добавляет библиотеку. создает ее
const csso = require("gulp-csso"); // npm i --save-dev gulp-csso
const rename = require("gulp-rename");  //npm i --save-dev gulp-rename
const imagemin = require("gulp-imagemin"); // npm i --save-dev gulp-imagemin
const webp = require("gulp-webp");
const svgstore = require("gulp-svgstore");
const del = require("del");
const htmlmin = require("gulp-htmlmin");
const uglify = require("gulp-uglify");

// html таск: положить из сорса в билд, перезапустить сервер
const html = () => {
  return gulp.src("source/*.html")
    .pipe(htmlmin({
      collapseWhitespace: true})) //мумификация html
    .pipe(gulp.dest("build"))
    .pipe(sync.stream()); // перезапуск сервера
};

exports.html = html;

// Styles
const styles = () => {
  return gulp.src("source/sass/style.scss") //взять файл из
    .pipe(plumber())                       // обработчик ошибок
    .pipe(sourcemap.init())               // иницализирует карты кода
    .pipe(sass())                        // sass в css
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(csso())                     // мумифицирует css
    .pipe(rename("style.min.css"))   // переименовывает в
    .pipe(sourcemap.write("."))     // кладет карты кода в корень "."
    .pipe(gulp.dest("build/css"))  // положить файл в
    .pipe(sync.stream());         // перезапуск сервера
};

exports.styles = styles;

// минификация js и перезагрузка
const jsMin = () => {
  return gulp.src("source/js/*.js")
  .pipe(uglify())
  .pipe(gulp.dest("build/js"))
  .pipe(sync.stream());
};

exports.jsMin = jsMin;

// Server
const server = (done) => {
  sync.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

exports.server = server;

// Watcher
const watcher = () => {
  gulp.watch("source/sass/**/*.scss", gulp.series("styles"));
  gulp.watch("source/*.html", gulp.series("html"));
  gulp.watch("source/js/*.js", gulp.series("jsMin"));
}

exports.default = (done) => gulp.series(
  build, server, watcher
)
(done);

// мумификация изображений; каждый плагин для типа файла
const images = () => {
  return gulp.src("source/img/**/*.{jpg,png,svg}")
    .pipe(imagemin([
      imagemin.gifsicle({interlaced: true}),
      imagemin.mozjpeg({quality: 75, progressive: true}),
      imagemin.optipng({optimizationLevel: 3}),
      imagemin.svgo({
          plugins: [
              {removeViewBox: false},
              {cleanupIDs: false}
          ]
      })
    ]))
    .pipe(gulp.dest("source/img"))
}

exports.images = images;

// добавление фото в webp
const webpPics = () => {
  return gulp.src("source/img/**/*.{png,jpg}")
    .pipe(webp({quality: 90}))
    .pipe(gulp.dest("source/img"))
}

exports.webp = webpPics; // npx gulp webp

// создает свг спрайт, // npx gulp sprite - выполнить только задачу "sprite"
const sprite = () => {
  return gulp.src("source/img/**/icon-*.svg")
    .pipe(svgstore())
    .pipe(rename("sprite.svg"))
    .pipe(gulp.dest("build/img"))
}

exports.sprite = sprite

// коприрование в папку билда
const copy = () => {
  return gulp.src([
    "source/fonts/**/*.{woff,woff2}",
    "source/img/**",
    "source/*.ico",
    "source/css/simple-lightbox.min.css" // копирует лайтбокс
  ], {
    base: "source"  //  копируется вложенность после папки source
  })
  .pipe(gulp.dest("build"));
};

exports.copy = copy

// таск удаления содержимого папки build
const cleanBuild = () => {
  return del("build/**");
};

exports.cleanBuild = cleanBuild

// создать build в продакшн
const build = (done) => gulp.series (
  "cleanBuild",
  "copy",
  "styles",
  "html",
  "sprite",
  "jsMin"
)
(done);

exports.build = build
