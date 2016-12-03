import gulp from 'gulp';
import bg from 'gulp-bg';
import runSequence from 'run-sequence';

gulp.task('server-hot', bg('node', './webpack/server'));
gulp.task('server-node', bg('node', './src/server'));
gulp.task('server-nodedev', bg('node-dev', './src/server'));

gulp.task('server', ['env'], callback => {
    const { NODE_ENV } = process.env;
    if (NODE_ENV !== 'production') {
        runSequence('lint', 'watch', 'server-hot', 'server-nodedev', callback);
    } else {
        runSequence('build', 'server-node', callback);
    }
});
