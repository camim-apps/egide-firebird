const { Op } = require('sequelize')
const { chunk } = require('lodash')
const { Product } = require('../../models')
const { isSameProduct } = require('../../shared/formatProducts')

const update = async ({ products }) => {
    const elements = products
        .filter(
            element => !isSameProduct(element)
        )
        .map((element) => element.item)

    if (!elements.length) {
        return 0
    }

    const items = elements.map(element => ({
        ...element,
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
