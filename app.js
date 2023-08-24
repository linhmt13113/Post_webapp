const express = require('express')


const connectDB = require('./config/db')

// Khoi dong app
const app = express()


// Khoi dong express middleware
app.use(express.json())

// ket noi co so du lieu
connectDB()


const PORT = 5000

app.listen(PORT, () => console.log(`Server started at post ${PORT}`))
