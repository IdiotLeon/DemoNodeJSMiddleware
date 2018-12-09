var express = require('express')
var app = express()
const port = 7777;

var router = require('./router')

app.use(function (req, res, next) {
    console.log('middleware 1 is called')
    next()
})

app.use("/test", function (req, res, next) {
    console.log('middleware 2 is called')
    next()
})

app.get('/test', function (req, res, next) {
    res.send('test test test')
})

app.use(router)

app.listen(port, () => console.log(`App is listening on port ${port}`))