class BasePlugin {
    extract(callback) {
        throw new Error('init() method must be implemented')
    }
}

module.exports = BasePlugin
