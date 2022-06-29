const { formatProduct } = require('../shared/formatProducts')

const test = async () => {
    try {
        const pairs = {
            id: 'ID',
            name: 'NOME',
            age: 'AGE',
        }

        const item = {
            NOME: 'Robson Fernandes',
            ID: 1,
            AGE: 46
        }

        const result = formatProduct({
            item,
            pairs,
            updateTime: new Date().getTime(),
            status: 'testing'
        })

        console.log(JSON.stringify(result, null, 2))
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
