const { isEqual, groupBy } = require("lodash")
const { fields } = require('../config')
const { formatProducts } = require('../shared/formatProducts')
const compare = require('../modules/compare')

class BasePlugin {

    mustStopOnUpdate = false

    getRecords() {
        throw new Error('getSql() method must be implemented')
    }

    async extract() {
        const records = await this.getRecords()
        const items = this.getUniqueItems(records)
        if (!items.length) {
            return
        }
        return compare(items, this.mustStopOnUpdate)
    }

    getUniqueItems(items) {
        if (!items.length) {
            return []
        }

        const [item] = items
        const recordFields = Object.keys(item)

        if (!isEqual(recordFields.map(key => key.toLowerCase()), fields)) {
            throw new Error(`Fields must be equal to: ${fields.join(', ')}`)
        }

        const pairs = fields.reduce((acc, field) => ({
            ...acc,
            [field]: recordFields.find(item => item.toLowerCase() === field)
        }), {})

        const updateTime = new Date().getTime()

        const products = formatProducts({
            pairs,
            items,
            status: 'idle',
            updateTime
        })

        return this.uniqueProducts(products)
    }

    uniqueProducts(products) {
        const items = Object.values(groupBy(products, 'barcode'))
        return items.map(values => {
            if (values.length === 1) {
                return values[0]
            }

            const sorted = values.sort((a, b) => b.price !== a.price ? b.price - a.price : b.inventory - a.inventory)

            return sorted[0]
        })
    }
}

module.exports = BasePlugin
