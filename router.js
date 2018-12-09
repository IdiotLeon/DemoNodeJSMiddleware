var express = require('express')

// A Router instance is a complete middleware and routing system; 
// for this reason, it is often referred to as a “mini - app”.
var router = express.Router()

// The middleware that is specific to this router
router.use(function timeLog(req, res, next) {
    console.log('Router: Time - ', Date.now())
    next()
})

// To define route methods
// To define the home page route
router.get('/', function (req, res) {
    res.send('Router: a GET request to Leon')
})

router.post('/', (req, res) => {
    res.send('Router: a POST request to Leon')
})

// To define the about route
router.get('/about', function (req, res) {
    res.send('Router: About Leon')
})

// There is a special routing method, app.all(), 
// used to load middleware functions at a path for all HTTP request methods.
router.all('/all_routes', (req, res) => {
    res.send('Router: all routes to Leon')
})

// To define a route with route parameters
router.get('/users/:userId/books/:bookId', (req, res) => {
    res.send(req.params)
})

/*
* Query strings are not part of the route path.
*/

module.exports = router