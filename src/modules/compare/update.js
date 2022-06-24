const { Op } = require('sequelize') 
const { chunk } = require('lodash')
const Action = require('../../config/Action')
const { Product } = require('../../models')

const update = async (values) => {
    const elements = values
        .filter(
            ({ product, item }) =>
                product.price !== item.PRICE ||
                item.inventory !== item.INVENTORY
        )
        .map((element) => element.item)

    if (!elements.length) {
        return
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
        action: Action.Update,
    }))

    for (const block in chunk(items, 500)) {
        await Product.delete({
            where: {
                id: {
                    [Op.in]: block.map((x) => x.id),
                },
            },
        })
        await Product.bulkCreate(block)
    }
}

module.exports = update
