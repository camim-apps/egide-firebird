const { query } = require('./connection/firebird')

const sql = `
    SELECT
        first 10
        p.CODIGO_BARRAS_1 AS BARCODE
        , p.DESCRICAO AS NAME
        , p.PRECO_VENDA_1 * 100 AS PRICE
        , p.ESTOQUE_1 AS INVENTORY
        , c.DESCRICAO AS CATEGORY
        , c.DESCRICAO AS SUBCATEGORY
        , l.NOME AS SUPPLIER
    FROM PRODUTOS p
    INNER JOIN CLASSES c ON c.CD_CLASSE = p.CD_CLASSE
    INNER JOIN GRUPOS g ON g.CD_GRUPO = p.CD_GRUPO
    INNER JOIN LABORATORIOS l ON l.CD_LABORATORIO = p.CD_LABORATORIO
`

const extract = async () => {
    try {
        const results = await query(sql)
        console.log(results)
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

module.exports = extract
