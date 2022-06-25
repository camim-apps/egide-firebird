const extract = require("../modules/extract")

const handle = async () => {
    try {
       await extract()
    } catch (error) {
        console.log('>>> error', error)
    }
}

module.exports = {
    schedule: '*/3 * * * *',
    handle
}
