const fs = require('fs')
const { resolve } = require('path')

const { PLUGIN } = process.env

const extract = async (mustStopOnUpdate = false, isDebugMode = false) => {
    const pathPlugins = resolve(__dirname, '../../plugins')
    const files = PLUGIN ? [PLUGIN] : fs.readdirSync(pathPlugins)

    const plugins = files.map(file => require(resolve(pathPlugins, file)))

    for (const Plugin of plugins) {
        const plugin = new Plugin()
        plugin.isDebugMode = isDebugMode
        plugin.mustStopOnUpdate = mustStopOnUpdate
        await plugin.extract()
    }
}

module.exports = extract
