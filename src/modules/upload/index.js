const { Op } = require('sequelize')
const { resolve } = require('path')
const fs = require('fs')
const FormData = require('form-data')
const Axios = require('axios')
const { Product, Destroyproduct } = require('../../models')
const RemoteDatabase = require('../../models/remote')

const { INTEGRATION_URL, INTEGRATION_USERNAME, INTEGRATION_PASSWORD } =
    process.env

const upload = async (endpoint = 'upload') => {
    if (!INTEGRATION_URL) {
        return
    }

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

    const path = resolve(__dirname, '..', '..', '..', 'db')

    const file = resolve(path, 'db.sqlite')

    // Duplicate file - Delete old file
    const fileRemote = resolve(path, 'db_remote.sqlite')
    if (fs.existsSync(fileRemote)) {
        fs.unlinkSync(fileRemote)
    }

    fs.copyFileSync(file, fileRemote)

    // Remove all to not sync
    const remote = new RemoteDatabase()
    const { Product: ProductRemote } = remote.db

    await ProductRemote.destroy({ where: { status: 'idle' } })
    await remote.shrink()
    await remote.close()

    // Post to server
    const axios = Axios.create({
        baseURL: INTEGRATION_URL,
        maxContentLength: Infinity,
        maxBodyLength: Infinity,
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
    form.append('file', fs.createReadStream(fileRemote))

    const response = await axios.post(`robot/${endpoint}`, form)

    // Update all products
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

    // Destroy all products to delete remotely
    await Destroyproduct.destroy({ truncate: true })

    fs.unlinkSync(fileRemote)

    console.log('>>> Upload realizado', new Date().toISOString())

    return response.data
}

module.exports = upload
