/**
 * https://expressjs.com/en/guide/writing-middleware.html
 * 
 * Middleware functions are functions that have access to the request object (req), 
 * the response object (res), and the next function in the application’s request-response cycle. 
 * The next function is a function in the Express router which, when invoked, executes the middleware succeeding the current middleware.
 * Middleware functions can perform the following tasks:
 * 1. Execute any code.
 * 2. Make changes to the request and the response objects.
 * 3. End the request-response cycle.
 * 4. Call the next middleware in the stack.
 */

var express = require('express')
var app = express()
const port = 7777;

var router = require('./router')

/**
 * Notice the call above to next(). 
 * Calling this function invokes the next middleware function in the app. 
 * The next() function is not a part of the Node.js or Express API, but is the third argument that is passed to the middleware function. 
 * The next() function could be named anything, but by convention it is always named “next”. 
 * To avoid confusion, always use this convention.
 */
app.use(function (req, res, next) {
    console.log('middleware 1 is called')
    next()
})

/**
 * The order of middleware loading is important: middleware functions that are loaded first are also executed first.
 */
app.use("/test", function (req, res, next) {
    console.log('middleware 2 is called')
    next()
})

app.get('/test', function (req, res, next) {
    res.send('test test test')
})

app.use(router)

const configurableMiddleware = require('./configurable-middleware.js')
app.use(configurableMiddleware({ options1: '1', options2: '2' }))

app.listen(port, () => console.log(`App is listening on port ${port}`))