const { Product } = require('./models')

const test = async () => {
    try {
        const items = [
            {
                id: 10,
                name: 'Item 1',
            },
            {
                id: 11,
                name: 'Item 2',
            }
        ]
        const product = await Product.bulkCreate(items)
        console.log(product)
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
