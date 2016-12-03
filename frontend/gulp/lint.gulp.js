import gulp from 'gulp';
import gutil from 'gulp-util';
import eslint from 'gulp-eslint';
import notifier from 'node-notifier';

const MAX_WARNINGS = 10;

gulp.task('lint', () => {
    let count = 0;

    const stream = gulp
        .src(['src/client/*.js'], { dot: true })
        .pipe(eslint())
        .pipe(eslint.formatEach())
        .pipe(eslint.result(result => {
            count += result.warningCount;

            if (count > MAX_WARNINGS)
                throw {
                    name: 'TooManyWarnings',
                    fileName: result.filePath,
                    message: 'Too many warnings!',
                    showStack: false
                };
        }))
        .pipe(eslint.results(() => {
            notifier.notify('lint completed');
        }));
});
