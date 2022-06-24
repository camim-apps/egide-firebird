const { chunk } = require('lodash')
const { Product } = require('../../models')

const insert = async ({ products, updateTime }) => {
    if (!products.length) {
        return 0
    }

    const items = products.map((item) => ({
        id: item.ID,
        barcode: item.BARCODE,
        name: item.NAME,
        price: item.PRICE,
        inventory: item.INVENTORY,
        category: item.CATEGORY,
        subcategory: item.SUBCATEGORY,
        supplier: item.SUPPLIER,
        updateTime,
    }))

    for (const block of chunk(items, 500)) {
        await Product.bulkCreate(block)
    }

    console.log('>>> Produtos inseridos', items.length)

    return items.length
}

module.exports = insert
