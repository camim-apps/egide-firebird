const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
    class Destroyproduct extends Model {}

    Destroyproduct.init(
        {
            id: {
                primaryKey: true,
                type: DataTypes.INTEGER,
            },
            barcode: DataTypes.STRING
        },
        {
            sequelize,
            modelName: 'Destroyproduct',
        }
    )
    return Destroyproduct
}
