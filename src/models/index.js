const BaseConnect = require('./base_connect')
const config = require('../connection/sqlite/local')

const connection = new BaseConnect(config)

module.exports = connection.db
