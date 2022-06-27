const BaseConnect = require('./base_connect')
const config = require('../connection/sqlite/remote')

class RemoteDatabase extends BaseConnect {
    constructor() {
        super(config)
    }
}

module.exports = RemoteDatabase
