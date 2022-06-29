const fs = require('fs')
const { resolve } = require('path')

const extract = async (mustStopOnUpdate = false) => {
    const pathPlugins = resolve(__dirname, '../../plugins')
    const files = fs.readdirSync(pathPlugins)
    const plugins = files.map(file => require(resolve(pathPlugins, file)))

    for (const Plugin of plugins) {
        const plugin = new Plugin()
        plugin.mustStopOnUpdate = mustStopOnUpdate
        await plugin.extract()
    }
}

module.exports = extract
