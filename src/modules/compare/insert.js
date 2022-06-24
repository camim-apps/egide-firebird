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

    for (const block of chunk(items, 500)) {
        await Product.bulkCreate(block)
    }
}

module.exports = insert
