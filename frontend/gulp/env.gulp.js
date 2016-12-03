import gulp from 'gulp';

gulp.task('env', () => {
    const {NODE_ENV} = process.env;
    if (!NODE_ENV || NODE_ENV !== 'production')
        process.env.NODE_ENV = 'local';
});
