const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {}

    Product.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            barcode: DataTypes.STRING,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            inventory: DataTypes.DOUBLE,
            category: DataTypes.STRING,
            subcategory: DataTypes.STRING,
            supplier: DataTypes.STRING,
            updateTime: DataTypes.INTEGER,
            status: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Product',
        }
    )
    return Product
}
