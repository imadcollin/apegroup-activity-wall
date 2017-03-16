`use strict`;

import path from 'path';
import http from 'https';
import connect from 'connect';
import c from 'chalk';
import morgan from 'morgan';
import serveStatic from 'serve-static';
import serveIndex from 'serve-index';
import connectModrewrite from 'connect-modrewrite';
// import parser from './../parser';
import fs from 'fs';

import services from './../services';
// const rootAssets = path.resolve(`${__dirname}/../../www/assets`);
// const clientAssets = path.resolve(`${__dirname}/../../client/assets`);
// const components = path.resolve(`${__dirname}/../../www/components`);
// const elements = path.resolve(`${__dirname}/../../www/elements`);
// const shared = path.resolve(`${__dirname}/../../www/shared`);

const root = path.resolve(`${__dirname}/../../www`);
const assets = path.resolve(`${__dirname}/../../client/assets`);

var server = connect();

server
    .use(`/services`, services)
    .use(connectModrewrite([`^[^\\.]*$ /index.html [L]`]))
    .use(morgan(`[${c.dim(`:date[web]`)}] ${c.cyan(`:method`)} ${c.magenta(`:status`)} [:url] ${c.magenta(`:response-time[3] ms`)}`))
    .use(serveStatic(root))
    .use(`/assets`, serveStatic(assets))
    .use(serveIndex(root, { 'icons': true }));

// .use(`/assets`, serveStatic(rootAssets))
// .use(`/assets`, serveStatic(clientAssets))
// .use(`/components`, serveStatic(components))
// .use(`/elements`, serveStatic(elements))
// .use(`/shared`, serveStatic(shared))
// .use(parser);
const options = {
    key: fs.readFileSync(`./server/connect/server.key`),
    cert: fs.readFileSync(`./server/connect/server.crt`)
};

http.createServer(options, server).listen(process.env.PORT || 3000);

export default server;
