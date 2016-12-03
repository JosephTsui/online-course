import del from 'del';
import gulp from 'gulp';

gulp.task('clean', () => del('dist/*'));
