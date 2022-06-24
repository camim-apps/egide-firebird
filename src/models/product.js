const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Product extends Model {
        static associate(models) {
            // define association here
        }
    }
    Product.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            barcode: DataTypes.STRING,
            name: DataTypes.STRING,
            price: DataTypes.INTEGER,
            inventory: DataTypes.DOUBLE,
            category: DataTypes.STRING,
            subcategory: DataTypes.STRING,
            supplier: DataTypes.STRING,
            action: DataTypes.STRING,
        },
        {
            sequelize,
            modelName: 'Product',
        }
    )
    return Product
}
