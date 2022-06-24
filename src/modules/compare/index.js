const { Op } = require('sequelize')
const { chunk } = require('lodash')
const { Product } = require('../../models')
const insert = require('./insert')
const update = require('./update')

const compare = async (items) => {
    if (!items.length) {
        return
    }

    console.log('>>> Quantidade de produtos', items.length)

    const foundProducts = []
    const newProduts = []

    const blocks = chunk(items, 500)

    for (const block of blocks) {
        const products = await Product.findAll({
            where: {
                id: {
                    [Op.in]: block.map(item => item.id)
                }
            }
        })

        for (const item of block) {
            const product = products.find(p => p.ID === item.id)
            if (product) {
                foundProducts.push({
                    product,
                    item
                })
            } else {
                newProduts.push(item)
            }
        }
    }

    await insert(newProduts)
    await update(foundProducts)
}

module.exports = compare
