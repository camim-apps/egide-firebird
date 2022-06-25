const { Op } = require('sequelize') 
const { chunk } = require('lodash')
const { Product } = require('../../models')

const update = async ({ products, updateTime }) => {
    const elements = products
        .filter(
            ({ product, item }) =>
                product.price !== item.PRICE ||
                product.inventory !== item.INVENTORY
        )
        .map((element) => element.item)

    if (!elements.length) {
        return 0
    }

    const items = elements.map((item) => ({
        id: item.ID,
        barcode: item.BARCODE,
        name: item.NAME,
        price: item.PRICE,
        inventory: item.INVENTORY,
        category: item.CATEGORY,
        subcategory: item.SUBCATEGORY,
        supplier: item.SUPPLIER,
        updateTime,
        status: 'updated'
    }))

    for (const block of chunk(items, 500)) {
        await Product.destroy({
            where: {
                id: {
                    [Op.in]: block.map((x) => x.id),
                },
            },
        })
        await Product.bulkCreate(block)
    }

    console.log('>>> Produtos atualizados', items.length)

    return items.length
}

module.exports = update
