const config = require('./configs');
const pgp = require('pg-promise')();
const db = pgp(config.url);

module.exports = db;