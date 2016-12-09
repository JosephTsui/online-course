import path from 'path';
import { promisify, promisifyAll } from 'bluebird';
import bodyParser from 'body-parser';
import loopback from 'loopback';
import boot from 'loopback-boot';
import { PassportConfigurator } from 'loopback-component-passport';

const bootAsync = promisify(boot);

const app = loopback();
// promisifyAll(app, { filter: name => name === 'listen' });
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

bootAsync(app, path.join(__dirname, 'config'))
    .then(() => {
        app.use(loopback.token({
            model: app.models.accessToken
        }));
        const passportConfigurator = new PassportConfigurator(app);
        passportConfigurator.init(true);
        passportConfigurator.setupModels({
            userModel: app.models.user,
            userIdentityModel: app.models.userIdentity,
            userCredentialModel: app.models.userCredential
        });
        passportConfigurator.configureProvider('local', {
            authScheme: 'local',
            provider: 'local',
            module: 'passport-local',
            usernameField: 'username',
            passwordField: 'password',
            authPath: '/auth/local'
        });

        app.listen(() => {
            app.emit('started');
            const baseUrl = app.get('url').replace(/\/$/, '');
            console.info('API server listening at', baseUrl);
            const componentExplorer = app.get('loopback-component-explorer');
            if (componentExplorer) {
                console.info('REST API Explorer at', componentExplorer.mountPath);
            }
        });

    });
