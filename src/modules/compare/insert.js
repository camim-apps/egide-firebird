const { chunk } = require('lodash')
const { Product } = require('../../models')

const insert = async ({ products }) => {
    if (!products.length) {
        return 0
    }   

    const items = products.map(product => ({
        ...product,
        status: 'created'
    }))

    for (const block of chunk(items, 500)) {
        await Product.bulkCreate(block)
    }

    console.log('>>> Produtos inseridos', items.length)
    console.log('>>> Produtos com valores maior que R$ 0,00', items.filter(item => item.price > 0).length)

    return items.length
}

module.exports = insert
