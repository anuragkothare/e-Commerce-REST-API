const express = require('express')
const http = require('http')
const mongoose = require('mongoose')
const fs = require('fs')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const globalErrorMiddleware = require('./middlewares/appErrorHandler')
const routeLoggerMiddleware = require('./middlewares/routeLogger')
var helmet = require('helmet')
const logger = require('./libs/loggerLib')
const appConfig = require('./config/appConfig')

// creating an application instance
const app = express()


// middlewares
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))
app.use(cookieParser())

app.get('/', (req, res) => res.send('Hello11'))

app.use(globalErrorMiddleware.globalErrorHandler)
app.use(routeLoggerMiddleware.logIp)
app.use(helmet())

// bootstrap the models
let modelsPath = './models'
fs.readdirSync(modelsPath).forEach(function (file) {
    if(~file.indexOf('.js')) require(modelsPath + '/' + file);
});

// routes
let routesPath = './routes'
fs.readdirSync(routesPath).forEach(function (file) {
    if(~file.indexOf('.js')) {
        console.log("including the following file...")
        console.log(routesPath + '/' + file)
        let route = require(routesPath + '/' + file);
        route.setRouter(app);
    }
});

// calling global 404 handler after route
app.use(globalErrorMiddleware.globalNotFoundHandler)



// listening the server
app.listen(appConfig.port, () => {
    console.log('App Listening on port 5000')
    // creating the mongoDB connection
    let db = mongoose.connect(appConfig.db.uri, { useNewUrlParser: true })
})














// handling mongoose connection error
mongoose.connection.on('error', function (err) {
    console.log('database connection error');
    console.log(err)

}); // end mongoose connection error

// handling mongoose success event
mongoose.connection.on('open', function (err) {
    if (err) {
        console.log("database error");
        console.log(err);
    } else {
        console.log("database connection open success");
    }

}); // end mongoose connection open handler