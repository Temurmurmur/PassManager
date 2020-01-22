const gulp = require("gulp");
const browserSync = require("browser-sync").create();
const watch = require("gulp-watch");
const sass = require("gulp-sass");

// Gulp таск для компиляции SCSS в CSS
gulp.task("scss", function() {
    return gulp
        .src("./scss/main.sass")
        .pipe(sass())
        .pipe(gulp.dest("./css/"))
        .pipe(browserSync.stream());
});

// Gulp таск для поднятия локального сервера
gulp.task("server", function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        port: 8080,
        open: true,
        notify: false
    });
});

// Следим за файлами и обновляем браузер

// gulp.watch('./*html').on('change', function () {
//     browserSync.reload();
// });

gulp.task("watch", function() {
    watch(
        ["./*.html", "./*.js", "./img/*.*"],
        gulp.parallel(browserSync.reload)
    );
    watch("./scss/**/*.sass", function() {
        setTimeout(gulp.parallel("scss"), 1000);
    });
});

// Запускаем дефолтный таск
gulp.task("default", gulp.series("scss", gulp.parallel("server", "watch")));
