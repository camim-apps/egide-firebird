module.exports = {
    up(queryInterface, Sequelize) {
        return queryInterface.createTable('Products', {
            id: {
                allowNull: false,
                autoIncrement: false,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            barcode: Sequelize.STRING,
            name: Sequelize.STRING,
            price: Sequelize.INT,
            inventory: Sequelize.DOUBLE,
            price: Sequelize.INTEGER,
            supplier: Sequelize.STRING,
            updateTime: Sequelize.INTEGER,
            status: Sequelize.STRING,
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
        return queryInterface.dropTable('Products')
    },
}
