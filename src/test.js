const { Product } = require('./models')

const test = async () => {
    try {
        const items = [
            {
                id: 0,
                barcode: '7791293040394',
                name: 'TC REXONA PES ANTBAC SPORT 100GR',
                price: 999,
                inventory: -3406,
                category: 'PERFUMARIA',
                subcategory: 'PERFUMARIA',
                supplier: 'UNILEVER',
                action: 'insert',
            },
            {
                id: 11,
                name: 'Item 2',
            },
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
