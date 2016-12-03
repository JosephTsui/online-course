import gulp from 'gulp';
import gutil from 'gulp-util';
import notifier from 'node-notifier';
import webpack from 'webpack';
import makeWebpackConfig from '../webpack/config.webpack';

gulp.task('webpack', callback => {
    const config = makeWebpackConfig(process.env);
    webpack(config, (fatalError, stats) => {
        const jsonStats = stats.toJson();
        const buildError = fatalError || jsonStats.errors[0] || jsonStats.warnings[0];

        if (buildError)
            throw new gutil.PluginError('webpack', buildError);

        gutil.log('[webpack]', stats.toString({
            colors: true,
            version: false,
            hash: false,
            timings: false,
            chunks: false,
            chunkModules: false
        }));

        notifier.notify('webpack build completed');
        callback();
    });
});
