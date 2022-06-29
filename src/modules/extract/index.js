const fs = require('fs')
const { resolve } = require('path')

const extract = async () => {
    const pathPlugins = resolve(__dirname, '../../plugins')
    const files = fs.readdirSync(pathPlugins)
    const plugins = files.map(file => require(resolve(pathPlugins, file)))

    for (const Plugin of plugins) {
        const plugin = new Plugin()
        await plugin.extract()
    }
}

module.exports = extract
