const { Product } = require('./models')

const test = async () => {
    try {
        await Product.sync({ force: true })
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
