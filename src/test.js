const { Product } = require('./models')

const test = async () => {
    try {
        const product = await Product.findOne()
        console.log(product.toJSON())
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
