const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const userRoutes = require('./routes/routes')

const app = express()

app.use(cors())
app.use(morgan('dev'))
app.use(express.json())

app.use(userRoutes)

app.use((err, req, res, next) => {
    return res.json({
        message: err.message
    })
})

app.use("/dashboard", require("./routes/dashboard"))

app.listen(5000)
console.log('server on port 5000')