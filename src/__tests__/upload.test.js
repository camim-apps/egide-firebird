require('dotenv').config()
const upload = require('../modules/upload')

const test = async () => {
    try {
        console.log(await upload('upload-large'))
    } catch (error) {
        console.log(error)
    } finally {
        console.log('finalizado')
    }
}

test()
