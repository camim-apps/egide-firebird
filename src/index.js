require('dotenv').config()
const express = require('express')
const formidable = require('formidable')
const fs = require('fs')
const { resolve } = require('path')

const app = express()

app.use(express.json())

const port = process.env.PORT || 3000

const middleware = (req, res, next) => {
    try {
        const [, basicToken] = ((req.headers && req.headers.authorization) || '').split(' ')
        if (!basicToken) {
            throw new Error('Missing token')
        }
        const [username, password] = Buffer.from(basicToken, 'base64')
            .toString('ascii')
            .split(':')

        console.log(username, password)
        next()
    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

app.post('/upload', middleware, (req, res) => {
    const form = new formidable.IncomingForm()
    form.parse(req, (err, fields, files) => {
        if (err) {
            return res.status(400).json({ error: err.message })
        }

        const oldpath = files.file.filepath
        const newpath = resolve(
            __dirname,
            '..',
            'download',
            files.file.originalFilename || 'db.zip'
        )

        fs.rename(oldpath, newpath, function (err) {
            if (err) {
                return res.status(400).json({ error: err.message })
            }
            res.json({ message: 'File uploaded and moved!' })
        })
    })
})

app.listen(port, () => {
    console.log(`Server listening on port ${port}`)
})
