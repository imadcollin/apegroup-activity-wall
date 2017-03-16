`use strict`;

import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';

import api from './api';
import ci from './ci';

const app = express();

app.use(logger(`dev`));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Other services
app.use(`/api`, api);
app.use(`/ci`, ci);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error(`Not Found`);
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get(`env`) === `development`) {
    app.use(function(err, req, res) {
        res.status(err.status || 500);
        res.render(`error`, {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res) {
    res.status(err.status || 500);
    res.render(`error`, {
        message: err.message,
        error: {}
    });
});

export default app;
