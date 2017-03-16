`use strict`;

import {DEBUG} from './../env';
import {cyan, magenta, dim, yellow, red} from 'chalk';

export function debug() {
    let date = new Date().toTimeString(`HH:mm:ss`).replace(/\ .+/, ``);
    let args = [].slice.call(arguments);
    args.unshift(`[${dim(date)}] [${magenta(`DEBUG`)}]`);
    DEBUG && console.log.apply(console, args);
}

export function info() {
    let date = new Date().toTimeString(`HH:mm:ss`).replace(/\ .+/, ``);
    let args = [].slice.call(arguments);
    args.unshift(`[${dim(date)}] [${cyan(`INFO`)}]`);
    console.log.apply(console, args);
}

export function warn() {
    let date = new Date().toTimeString(`HH:mm:ss`).replace(/\ .+/, ``);
    let args = [].slice.call(arguments);
    args.unshift(`[${dim(date)}] [${yellow(`WARN`)}]`);
    console.log.apply(console, args);
}

export function error() {
    let date = new Date().toTimeString(`HH:mm:ss`).replace(/\ .+/, ``)
    let args = [].slice.call(arguments);
    args.unshift(`[${dim(date)}] [${red(`ERROR`)}]`);
    console.log.apply(console, args);
}

let module = {
    debug,
    info,
    warn,
    error
};

export default module;