const { query, env } = require('./connection')
const BasePlugin = require('../../bases/BasePlugin')

const { FILIAL_ID = 1, CAN_USE_BARCODE_2 = 'false' } = env

class FarmaxPlugin extends BasePlugin {
    isDebugMode = false

    getSql() {
        const barcodeField =
            CAN_USE_BARCODE_2 === 'false'
                ? 'p.CODIGO_BARRAS_1'
                : 'iif(p.CODIGO_BARRAS_2 is not null and char_length(p.CODIGO_BARRAS_2) > 10, p.CODIGO_BARRAS_2, p.CODIGO_BARRAS_1)'

        const barcodeConditionField =
            CAN_USE_BARCODE_2 === 'false'
                ? 'p.CODIGO_BARRAS_1'
                : 'iif(p.CODIGO_BARRAS_2 is not null, p.CODIGO_BARRAS_2, p.CODIGO_BARRAS_1)'

        return `
            SELECT
                p.ID_PRODUTO AS ID
                , ${barcodeField} AS BARCODE
                , p.DESCRICAO AS NAME
                , cast(iif(p.PRECO_PROMOCAO_${FILIAL_ID} > 0, p.PRECO_PROMOCAO_${FILIAL_ID}, p.PRECO_VENDA_${FILIAL_ID}) * 100 as bigint) AS PRICE
                , p.ESTOQUE_${FILIAL_ID} AS INVENTORY
                , l.NOME AS SUPPLIER
            FROM PRODUTOS p
            JOIN CLASSES c ON c.CD_CLASSE = p.CD_CLASSE
            JOIN GRUPOS g ON g.CD_GRUPO = p.CD_GRUPO
            JOIN LABORATORIOS l ON l.CD_LABORATORIO = p.CD_LABORATORIO
            where
            char_length(${barcodeConditionField}) > 10
            order by p.ID_PRODUTO
        `
    }

    getRecords() {
        if (this.isDebugMode) {
            console.log('>>> sql', this.getSql())
        }
        return query(this.getSql())
    }
}

module.exports = FarmaxPlugin
