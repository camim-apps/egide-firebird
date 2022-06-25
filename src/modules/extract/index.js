const { query } = require('../../connection/firebird')
const compare = require('../compare')

const sql = `
    SELECT
          p.ID_PRODUTO AS ID
        , p.CODIGO_BARRAS_1 AS BARCODE
        , p.DESCRICAO AS NAME
        , p.PRECO_VENDA_1 * 100 AS PRICE
        , p.ESTOQUE_1 AS INVENTORY
        , c.DESCRICAO AS CATEGORY
        , c.DESCRICAO AS SUBCATEGORY
        , l.NOME AS SUPPLIER
    FROM PRODUTOS p
    JOIN CLASSES c ON c.CD_CLASSE = p.CD_CLASSE
    JOIN GRUPOS g ON g.CD_GRUPO = p.CD_GRUPO
    JOIN LABORATORIOS l ON l.CD_LABORATORIO = p.CD_LABORATORIO
    order by p.ID_PRODUTO
`

const extract = async () => {
    const results = await query(sql)
    await compare(results)
}

module.exports = extract
