import path from 'path';
const models = require('../model-config.json');

const DB_NAME = 'db';
const ENVS = ['development', 'staging', 'production'];

function autoUpdateAll(db) {
    console.log('autoUpdateAll');
    console.log(process.env.AUTO_UPDATE_SCHEMAS);
    if (process.env.AUTO_UPDATE_SCHEMAS !== 'true') return;

    Object.keys(models).forEach(key => {
        if (DB_NAME !== models[key].dataSource) return;
        db.isActual(key, (err, actual) => {
            if (actual) return;
            console.debug('autoupdate > ', key);
            db.autoupdate(key, err => {
                if (err) console.error('autoupdate error: ', err);
                else console.info('autoupdate updated: ', key);
            });
        });
    });
}

function autoMigrateAll(app) {
    const schemas = app.models;
    const { DROP_CREATE: existed, NODE_ENV } = process.env;
    if (!existed && ENVS.indexOf(NODE_ENV) >= 0) return;
    Object.keys(schemas).forEach(key => {
        automigrate(schemas[key], key);
    });
}

function automigrate(schema, name) {
    schema.dataSource.automigrate(err => {
        if (err) console.error('automigrate error: ', err);
        else console.info('automigrated: ', name);
    });
}

module.exports = app => {
    const db = app.dataSources[DB_NAME];
    if (db.connected) {
        autoUpdateAll(db);
        // autoMigrateAll(app);
    } else {
        db.once('connected', () => {
            autoUpdateAll(db);
            // autoMigrateAll(app);
        });
    }
};
