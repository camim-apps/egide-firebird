const { Op } = require('sequelize')
const { chunk } = require('lodash')
const { Product } = require('../../models')
const insert = require('./insert')
const update = require('./update')

const compare = async (items) => {
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
                    [Op.in]: block.map((item) => item.ID),
                },
            },
        })

        for (const item of block) {
            const product = products.find((p) => p.id === item.ID)
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

    const updateTime = new Date().getTime()
    const inserted = await insert({ products: newProduts, updateTime })
    const updated = await update({ products: foundProducts, updateTime })
    return inserted + updated
}

module.exports = compare
