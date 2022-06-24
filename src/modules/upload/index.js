const { resolve } = require('path')
const fs = require('fs')
const FormData = require('form-data')
const Axios = require('axios')

const { INTEGRATION_URL, INTEGRATION_USERNAME, INTEGRATION_PASSWORD } =
    process.env

const upload = async () => {

    const file = resolve(__dirname, '..', '..', '..', 'db', 'db.sqlite')

    const axios = Axios.create({
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
    })

    const form = new FormData()
    form.append('file', fs.createReadStream(file))

    const response = await axios.post(`${INTEGRATION_URL}/upload`, form, {
        auth: {
            username: INTEGRATION_USERNAME,
            password: INTEGRATION_PASSWORD,
        },
    })

    return response.data
}

module.exports = upload
