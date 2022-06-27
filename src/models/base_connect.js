
const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')
const exceptFiles = require('./except_files')
const basename = path.basename(__filename)

class BaseConnect {
    db = {}
    sequelize = null

    constructor(config) {
        const sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config
        )

        const db = {}

        fs.readdirSync(__dirname)
            .filter((file) => {
                return (
                    file.indexOf('.') !== 0 &&
                    file !== basename &&
                    !exceptFiles.includes(file) &&
                    file.slice(-3) === '.js'
                )
            })
            .forEach((file) => {
                const model = require(path.join(__dirname, file))(
                    sequelize,
                    Sequelize.DataTypes
                )
                db[model.name] = model
            })

        Object.keys(db).forEach((modelName) => {
            if (db[modelName].associate) {
                db[modelName].associate(db)
            }
        })

        db.sequelize = sequelize
        db.Sequelize = Sequelize
        this.db = db
        this.sequelize = sequelize
    }

    shrink() {
        return this.sequelize.query('VACUUM')
    }

    close() {
        return this.sequelize.close()
    }
}

module.exports = BaseConnect
