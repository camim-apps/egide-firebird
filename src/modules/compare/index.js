const { Op } = require('sequelize')
const { chunk } = require('lodash')
const { Product } = require('../../models')
const insert = require('./insert')
const update = require('./update')

const compare = async (items, mustStopOnUpdate = false) => {
    if (!items.length) {
        return 0
    }

    const foundProducts = []
    const newProduts = []

    const blocks = chunk(items, 500)

    for (const block of blocks) {
        const products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: block.map((item) => item.id),
                },
            },
        })

        for (const item of block) {
            const product = products.find((p) => p.id === item.id)
            if (product) {
                foundProducts.push({
                    product,
                    item,
                })
            } else {
                newProduts.push(item)
            }
        }
    }

    const inserted = await insert({ products: newProduts })
    const updated = await update({ products: foundProducts, mustStopOnUpdate })

    return inserted + updated
}

module.exports = compare
