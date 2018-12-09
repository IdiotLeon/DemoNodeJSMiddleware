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

/**
 * Application-level middlewares
 * https://expressjs.com/en/guide/using-middleware.html#middleware.application
 * Here is an example of loading a series of middleware functions at a mount point, with a mount path. 
 * It illustrates a middleware sub-stack that prints request info for any type of HTTP request to the /test/mwstack path.
 */
app.use('/test/mwstack',
    (req, res, next) => {
        console.log('middleware stack 01')
        next()
    }, (req, res, next) => {
        console.log('middleware stack 02')
        next()
    }, (req, res) => {
        res.send('Hello World from middleware stacks')
    })



/**
 * Application-level middlewares 
 * https://expressjs.com/en/guide/using-middleware.html#middleware.application
 * Route handlers enable you to define multiple routes for a path. 
 * The example below defines two routes for GET requests to the /user/:id path. 
 * The second route will not cause any problems, 
 * but it will never get called because the first route ends the request-response cycle.
 */
app.get('/test/multipleroutes', (req, res, next) => {
    console.log('multiple routes 01')
    next()
}, (req, res) => {
    res.send('Hello World from multipleroutes 01')
})

/**
 * Application-level middlewares 
 * https://expressjs.com/en/guide/using-middleware.html#middleware.application
 * The second route will not cause any problems, 
 * but it will never get called because the first route ends the request-response cycle.
 */
app.get('/test/multipleroutes', (req, res, next) => {
    res.end('Hello World from multipleroutes 02')
})



/**
 * Application-level middlewares
 * https://expressjs.com/en/guide/using-middleware.html#middleware.application
 * To skip the rest of the middleware functions from a router middleware stack, 
 * call next('route') to pass control to the next route. 
 * NOTE: next('route') will work only in middleware functions that were loaded 
 * by using the app.METHOD() or router.METHOD() functions.
 */
app.get('/test/skip/:id', (req, res, next) => {
    console.log(`req.params, middleware: ${JSON.stringify(req.params)}`)
    if (req.params.id === '0') next('route')
    if (!req.headers['x-access-token']) next('route')
    else next()
}, (req, res, next) => {
    console.log(`req.params: ${JSON.stringify(req.params)}`)
    res.send('regular')
    console.log('Will this be executed, regular?')
})

app.get('/test/skip/:id', (req, res, next) => {
    res.send('special')
    console.log('Will this be executed, special?')
})

app.listen(port, () => console.log(`App is listening on port ${port}`))