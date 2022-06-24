const { chunk } = require('lodash')
const Action = require('../../config/Action')
const { Product } = require('../../models')
const fs = require('fs')

const insert = async (values) => {
    if (!values.length) {
        return
    }

    const items = values.map((item) => ({
        id: item.ID,
        barcode: item.BARCODE,
        name: item.NAME,
        price: item.PRICE,
        inventory: item.INVENTORY,
        category: item.CATEGORY,
        subcategory: item.SUBCATEGORY,
        supplier: item.SUPPLIER,
        action: Action.Insert,
    }))

    const file = __dirname + '/../../db/data.json'
    fs.writeFileSync(file, JSON.stringify(items, null, 2), { encoding: 'utf8' })

    for (const block in chunk(items, 500)) {
        await Product.bulkCreate(block)
    }
}

module.exports = insert
