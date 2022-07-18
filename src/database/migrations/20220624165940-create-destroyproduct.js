module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('Destroyproducts', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            barcode: Sequelize.STRING,
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        })
    },
    down(queryInterface) {
        return queryInterface.dropTable('Destroyproducts')
    },
}
