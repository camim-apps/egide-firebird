const { Product } = require('./models')
const products = require('../db/db.json')
const { chunk } = require('lodash')

const test = async () => {
    try {
        for (const block of chunk(products, 500)) {
            await Product.bulkCreate(block)
        }
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
