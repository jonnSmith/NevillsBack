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

cron.schedule('0 * * * * *', () => {
    const datestamp = new Date().setSeconds(0,0).toString();
    // console.log('datestamp', datestamp);
    db.readDataByDatestamp(config.routes.events.layer, datestamp).then((snap) => {
        // console.log('result', snap);
        if(snap && snap.length) {
            for (let e in snap) {
                // console.log('evt', snap[e]);
                if (snap.hasOwnProperty(e) && snap[e].token !== 'browser') fcm.sendMessage([snap[e].token], snap[e].title, snap[e].description, snap[e].id);
            }
        }
    });
});

module.exports = app;
