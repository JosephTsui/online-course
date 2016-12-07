import path from 'path';
import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import methodOverride from 'method-override';
import ip from 'ip';
import * as render from './render';

require('dotenv').config({ slient: true });

const { PORT, NODE_ENV } = process.env;
const isProduction = NODE_ENV === 'production';

const scriptSrc = isProduction ? '/dist/app.js' : `//${ip.address()}:8080/dist/app.js`;
const styleSrc = isProduction ? '/dist/app.css' : null;
const { version } = require('../../package.json');

const app = express();

app.use(helmet.xssFilter());
app.use(helmet.noSniff());
app.use(helmet.ieNoOpen());
app.use(helmet.hidePoweredBy());

app.set('view engine', 'pug');
app.set('views', __dirname);

app.use('/dist', express.static(path.join(__dirname, '..', '..', 'dist')));

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(methodOverride());

app.get('/status', (req, res) => {
    res.send('OK');
});

app.get('*', (req, res) => {
    render.render().then(html => {
        res.render('index.server.pug', {
            version,
            content: html,
            initialState: render.initialState,
            src: {
                script: scriptSrc,
                style: styleSrc
            },
            title: 'Online Course'
        });
    }, () => {
        res.status(500).send();
    });
});

app.listen(PORT || 3000, () => {
    console.info('App listening on port', PORT);
});
