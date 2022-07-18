require('dotenv').config()
const { Destroyproduct } = require('../models')

const test = async () => {
    try {
        const result = await Destroyproduct.destroy({ truncate: true })
        console.log(result)
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
