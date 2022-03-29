const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

require('dotenv').config()

const routes = require('./routes')

const app = express()
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(routes)

mongoose.connect(process.env.BD_URL)

app.listen(process.env.PORT || 3001, () => {
  console.log(`We've taken off 🛫 on ${process.env.PORT || 3001} port`)
})
