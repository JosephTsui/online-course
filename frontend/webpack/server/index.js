if (process.env.NODE_ENV === 'production')
    throw new Error('Do not start webpack hot reload server in production!');

require('babel-register');
require('./server.webpack');
