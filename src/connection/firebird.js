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

const query = (sql) =>
    new Promise((resolve, reject) => {
        Firebird.attach(options, function (err, db) {
            if (err) {
                reject(err)
                return
            }

            // db = DATABASE
            db.query(sql, (err, result) => {
                db.detach()
                if (err) {
                    reject(err)
                    return
                }
                resolve(result)
            })
        })
    })

module.exports = {
    query,
}
