`use strict`;

import express from 'express';
import path from 'path';
import logger from 'morgan';
import bodyParser from 'body-parser';
import origins from './assets/data/origins';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.get(`/`, serviceIsReady);
app.post(`/origins`, originsHandler);

export function serviceIsReady(req, res) {
    res.status(200).send({
        message: `Api is ready!`
    });
}

export function originsHandler(req, res) {
    res.status(200).json(origins);
}

export default app;