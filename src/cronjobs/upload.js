const upload = require("../modules/upload")

const handle = async () => {
    try {
       await upload()
    } catch (error) {
        console.log('>>> error', error)
    }
}

module.exports = {
    schedule: '*/10 * * * *',
    handle
}
