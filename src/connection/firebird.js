const Firebird = require('node-firebird')

const { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } = process.env

const options = {
    host: DB_HOST,
    port: 3050,
    database: DB_DATABASE,
    user: DB_USER,
    password: DB_PASSWORD,
    lowercase_keys: false, // set to true to lowercase keys
    role: null, // default
    pageSize: 4096, // default when creating database
    pageSize: 4096, // default when creating database
    retryConnectionInterval: 1000, // reconnect interval in case of connection drop
}

const query = async (sql) => {
    const connection = await Firebird.attach(options)
    const result = await connection.query(sql)
    connection.detach()
    return result
}

module.exports = {
    query,
}
