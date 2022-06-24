require('dotenv').config()
const products = require('../db/db.json')
// const { mapKeys } = require('lodash')
// const compare = require('./modules/compare')
const upload = require('./modules/upload')

const test = async () => {
    try {
        // const items = products.map(item => mapKeys(item, (_, key) => key.toUpperCase()))
        // await compare(items)
        console.log(await upload())
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
