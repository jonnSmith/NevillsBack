import express from 'express';
import path from 'path';
import config from './config.json';
import cors from 'cors';
import cron from 'node-cron';
import fcm from './helpers/fcm';
import db from './helpers/database';

const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const eventsLayer = require('./routes/events');
const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Setup events REST API layer
app.use('/'+config.routes.events.layer, eventsLayer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
  next();
});

// Temporary image for push message until realize photo miniature web storing
const image = 'https://raw.githubusercontent.com/jonnSmith/Nevills/master/resources/android/icon/drawable-hdpi-icon.png';

// Cron task for send pushes from current minute datestamp Firebase DB folder to FCM
cron.schedule('30 * * * * *', () => {
    // Current minute datestamp
    const datestamp = new Date().setSeconds(0,0).toString();
    // Query folder from FDB
    db.getItemsFromFolder(config.routes.events.layer, datestamp).then((snap) => {
        if(snap) {
            // Send all events to FCM
            for (let e in snap) {
                let event = snap[e];
                if (event.token !== 'browser') {
                    fcm.sendMessage(event.token, event.title, event.description, event.id, image);
                }
            }
        }
    });
});

module.exports = app;
