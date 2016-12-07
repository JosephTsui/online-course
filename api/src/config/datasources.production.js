const host = process.env.DB_HOST;
const port = process.env.DB_PORT;
const database = process.env.DB_NAME;
const username = process.env.DB_USERNAME;
const password = process.env.DB_PASSWORD;

if (!host ||
    !port ||
    !database ||
    !username ||
    !password) {
    throw new Error('no datasource specified in env');
}

module.exports = {
    db: {
        host: host,
        port: port,
        database: database,
        username: username,
        password: password,
        name: 'db',
        connector: 'mysql',
        debug: false
    }
};
