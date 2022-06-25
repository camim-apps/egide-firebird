const { Op } = require('sequelize')
const { resolve } = require('path')
const fs = require('fs')
const FormData = require('form-data')
const Axios = require('axios')
const { Product } = require('../../models')

const { INTEGRATION_URL, INTEGRATION_USERNAME, INTEGRATION_PASSWORD } =
    process.env

const upload = async () => {
    const product = await Product.findOne({
        where: {
            status: {
                [Op.ne]: 'idle',
            },
        },
    })

    if (!product) {
        return
    }

    const file = resolve(__dirname, '..', '..', '..', 'db', 'db.sqlite')

    const axios = Axios.create({
        baseURL: INTEGRATION_URL,
        headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
        },
        auth: {
            username: INTEGRATION_USERNAME,
            password: INTEGRATION_PASSWORD,
        },
    })

    const form = new FormData()
    form.append('file', fs.createReadStream(file))

    const response = await axios.post(`upload`, form)

    await Product.update(
        { status: 'idle' },
        {
            where: {
                status: {
                    [Op.ne]: 'idle',
                },
            },
        }
    )

    return response.data
}

module.exports = upload
