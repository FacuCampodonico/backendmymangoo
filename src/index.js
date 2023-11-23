const express = require('express');
const morgan = require('morgan');

const userRoutes = require('./routes/routes');

const app = express();

app.use(morgan('dev'))
app.use(express.json())

app.use(userRoutes)

app.listen(3000)
console.log('server on port 3000')