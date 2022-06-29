const { query } = require('./connection')
const BasePlugin = require('../../bases/BasePlugin')
const { mapKeys } = require('lodash')

class FarmaxPlugin extends BasePlugin {

    sql = `
        SELECT
              p.ID_PRODUTO AS ID
            , p.CODIGO_BARRAS_1 AS BARCODE
            , p.DESCRICAO AS NAME
            , p.PRECO_VENDA_1 * 100 AS PRICE
            , p.ESTOQUE_1 AS INVENTORY
            , l.NOME AS SUPPLIER
        FROM PRODUTOS p
        JOIN CLASSES c ON c.CD_CLASSE = p.CD_CLASSE
        JOIN GRUPOS g ON g.CD_GRUPO = p.CD_GRUPO
        JOIN LABORATORIOS l ON l.CD_LABORATORIO = p.CD_LABORATORIO
        where
            char_length(p.CODIGO_BARRAS_1) > 10
        order by p.ID_PRODUTO
    `

    getRecords() {
        return query(this.sql)
    }
}

module.exports = FarmaxPlugin
