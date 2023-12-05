import updateBuffPercent from './service/updateBuffPercent.js'
import powerCalculate from './service/powerCalculate.js'
import updateOdd from './service/updateOdd.js'
import updateRound from './service/updateRound.js'
import updateRealTimeStatusRound from './service/updateRealTimeStatusRound.js'
import updateRealTimeStatusEvent from './service/updateRealTimeStatusEvent.js'
import updateImage from './service/updateImage.js'
import express from 'express'
// import swaggerDocs from './swagger.js'
import * as dotenv from 'dotenv'
dotenv.config()
import { usersRouter, fakersRouter, roundsRouter, eventPlayersRouter } from './routers/index.js'
import connect from './database/database.js'
import cron from 'node-cron'

const app = express()

// cron.schedule("2 * * * *", function () {
//     console.log("---------------------");
//     updateRealTimeStatusRound();
// })

cron.schedule("*/2 * * * *", function () {
    console.log("---------------------");
    updateRealTimeStatusRound();
    updateRealTimeStatusEvent();
})

// cron.schedule("*/15 * * * * *", function () {
//     console.log("---------------------");
//     updateImage();
// })

// Run service
// cron.schedule("*/15 * * * * *", function () {
//     console.log("---------------------");
//     updateBuffPercent();
// }, {
//     scheduled: true,
//     timezone: "Asia/Ho_Chi_Minh"
// })

// cron.schedule("*/15 * * * * *", function () {
//     console.log("---------------------");
//     powerCalculate();
// }, {
//     scheduled: true,
//     timezone: "Asia/Ho_Chi_Minh"
// })

// cron.schedule("*/15 * * * * *", function () {
//     console.log("---------------------");
//     updateOdd();
// }, {
//     scheduled: true,
//     timezone: "Asia/Ho_Chi_Minh"
// })

// cron.schedule("*/15 * * * * *", function () {
//     console.log("---------------------");
//     updateRound();
// }, {
//     scheduled: true,
//     timezone: "Asia/Ho_Chi_Minh"
// })

// connect()
const port = process.env.PORT
app.use(express.json())
app.use('/api/bigpool/v1/users', usersRouter)
app.use('/api/bigpool/v1/faker', fakersRouter)
app.use('/api/bigpool/v1/round', roundsRouter)
app.use('/api/bigpool/v1/eventPlayer', eventPlayersRouter)
// app.use('/images', express.static('images'));

app.get('/api/bigpool/v1', (req, res) => {
    res.send("I'M READYYYYYY, BABE !!?")
})

app.listen(port, async () => {
    await connect()
    console.log(`Listening on port: ${port}`)
    // swaggerDocs(app, port)
})