require('dotenv').config()
const cron = require('node-cron')
const { forEach } = require('lodash')
const jobs = require('./cronjobs')

const installJobs = () => {
    try {
        console.log('>>> Initializing...')
        forEach(jobs, (job, jobName) => {
            console.log(`>>> Installing ${jobName}...`)
            cron.schedule(job.schedule, job.handle)
        })
        console.log('>>> Jobs installed!')
    } catch (error) {
        console.log('>>> error', error)
        process.exit(1)
    }
}

installJobs()
