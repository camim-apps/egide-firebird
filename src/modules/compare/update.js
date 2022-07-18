const { Op } = require('sequelize')
const { chunk } = require('lodash')
const { Product, Destroyproduct } = require('../../models')
const { isSameProduct } = require('../../shared/formatProducts')

const update = async ({ products, mustStopOnUpdate = false }) => {
    const elements = products.filter((element) => !isSameProduct(element))

    if (!elements.length) {
        return 0
    } else if (mustStopOnUpdate) {
        // get 3
        const elementsToUpdate = elements.slice(0, 3)
        console.log(JSON.stringify(elementsToUpdate, null, 2))
        process.exit(0)
    }

    // To destroy remotely
    const toDeleteProducts = elements.filter(
        (element) => element.item.barcode !== element.product.barcode
    )

    for (const parts of chunk(toDeleteProducts, 200)) {
        const values = parts.map((part) => ({
            id: part.product.id,
            barcode: part.product.barcode,
        }))

        await Destroyproduct.bulkCreate(values)
    }

    const values = elements.map((element) => element.item)

    const items = values.map((element) => ({
        ...element,
        status: 'updated',
    }))

    for (const block of chunk(items, 500)) {
        await Product.destroy({
            where: {
                id: {
                    [Op.in]: block.map((x) => x.id),
                },
            },
        })
        await Product.bulkCreate(block)
    }

    console.log('>>> Produtos atualizados', items.length)
    console.log('>>> Produtos para exclusão', toDeleteProducts.length)

    return items.length
}

module.exports = update
