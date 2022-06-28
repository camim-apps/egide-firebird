require('dotenv').config()
const extract = require('../modules/extract')

const test = async () => {
    try {
        await extract()
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
