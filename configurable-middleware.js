
/**
 * If you need your middleware to be configurable, 
 * export a function which accepts an options object or other parameters, 
 * which, then returns the middleware implementation based on the input parameters.
 */
module.exports = function (options) {
    return function (req, res, next) {
        console.log(`options: ${JSON.stringify(options)}`)
        next()
    }
}