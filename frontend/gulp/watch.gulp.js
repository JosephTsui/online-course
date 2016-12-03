import gulp from 'gulp';

gulp.task('watch', () => {
    gulp.watch(['src/client/*.js', 'src/client/**/*.js'], ['lint']);
});
