const formatProduct = ({ status, updateTime, pairs, item }) => {
    const fields = Object.keys(pairs)
    return fields.reduce((acc, field) => {
        let value = item[pairs[field]]

        if (typeof value === 'string') {
            value = value.trim()
        }

        return {
            ...acc,
            [field]: value,
        }
    }, {
        status,
        updateTime
    })
}

const formatProducts = ({ pairs, items, status, updateTime }) => items.map(item => formatProduct({ item, status, pairs, item }))

const isSameProduct = ({ product, item }) => {
    return item.price === product.price && item.inventory === product.inventory
}

module.exports = {
    isSameProduct,
    formatProducts,
    formatProduct,
}
