import gulp from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', callback => {
    runSequence('clean', 'webpack', callback);
});
