import path from 'path';
import { promisify, promisifyAll } from 'bluebird';
import bodyParser from 'body-parser';
import loopback from 'loopback';
import boot from 'loopback-boot';
const bootAsync = promisify(boot);

const app = loopback();
promisifyAll(app, { filter: name => name === 'listen' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

bootAsync(app, path.join(__dirname, 'config'))
    .then(app.listenAsync)
    .then(() => {
        app.emit('started');
        const baseUrl = app.get('url').replace(/\/$/, '');
        console.info('API server listening at', baseUrl);
        const componentExplorer = app.get('loopback-component-explorer');
        if (componentExplorer) {
            console.info('REST API Explorer at', componentExplorer.mountPath);
        }
    });
