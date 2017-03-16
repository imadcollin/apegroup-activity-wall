import {watch, src, dest, series} from 'gulp';

import {debug} from './../../server/helpers/log';

import {obj} from 'stream-combiner2';
import rename from 'gulp-rename';
import newer from 'gulp-newer';
import babel from 'gulp-babel';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import polymerPostcss from 'gulp-polymer-postcss';
import polymerBabel from 'gulp-polymer-babel';

import config from './../config';

/**
 * ------------------------------------------------------------
 * Angular Components
 * ------------------------------------------------------------
 */

export function componentScriptTranspile() {
    return obj([
        src(config.components.scripts),
        newer(config.dest),
        babel({
            presets: [`es2015`],
            plugins: [
                // `transform-es2015-modules-systemjs`,
                `transform-decorators-legacy`
            ]
        }),
        rename({
            extname: `.js`
        }),
        dest(config.dest)
    ]).on(`error`, console.error.bind(console));
}

componentScriptTranspile.description = `Angular components scripts transpile.`;


export function componentScriptTranspileWatch(next) {
    let watcher = watch(config.components.scripts, series(componentScriptTranspile));
    watcher.on(`add`, function (path) { debug(`${path} added.`); });
    watcher.on(`change`, function (path) { debug(`${path} changed.`); });
    watcher.on(`unlink`, function (path) { debug(`${path} removed.`); });
    next();
}

componentScriptTranspileWatch.description = `Watch Angular components scripts transpile.`;


export function componentStyleTranspile() {
    return obj([
        src(config.components.styles),
        newer(config.dest),
        postcss([
            autoprefixer({ browsers: [`last 2 versions`] })
        ]),
        rename({
            extname: `.css`
        }),
        dest(config.dest)
    ]).on(`error`, console.error.bind(console));
}

componentStyleTranspile.description = `Angular components styles transpile.`;


export function componentStyleTranspileWatch(next) {
    let watcher = watch(config.components.styles, series(componentStyleTranspile));
    watcher.on(`add`, function (path) { debug(`${path} added.`); });
    watcher.on(`change`, function (path) { debug(`${path} changed.`); });
    watcher.on(`unlink`, function (path) { debug(`${path} removed.`); });
    next();
}

componentStyleTranspileWatch.description = `Watch Angular components styles transpile.`;


export function componentMarkupTranspile() {
    return obj([
        src(config.components.markups),
        newer(config.dest),
        polymerPostcss([
            autoprefixer({ browsers: [`last 2 versions`] })
        ]),
        polymerBabel({
            presets: [`es2015`]
        }),
        rename({
            extname: `.html`
        }),
        dest(config.dest)
    ]).on(`error`, console.error.bind(console));
}

componentMarkupTranspile.description = `Angular components styles transpile.`;


export function componentMarkupTranspileWatch(next) {
    let watcher = watch(config.components.markups, series(componentMarkupTranspile));
    watcher.on(`add`, function (path) { debug(`${path} added.`); });
    watcher.on(`change`, function (path) { debug(`${path} changed.`); });
    watcher.on(`unlink`, function (path) { debug(`${path} removed.`); });
    next();
}

componentMarkupTranspileWatch.description = `Watch Angular components styles transpile.`;



/**
 * ------------------------------------------------------------
 * Polymer elements
 * ------------------------------------------------------------
 */

export function elementScriptTranspile() {
    return obj([
        src(config.elements.scripts),
        newer(config.dest),
        babel({
            presets: [`es2015`]
        }),
        rename({
            extname: `.js`
        }),
        dest(config.dest)
    ]).on(`error`, console.error.bind(console));
}

elementScriptTranspile.description = `Polymer elements scripts transpile.`;


export function elementScriptTranspileWatch(next) {
    let watcher = watch(config.components.scripts, series(elementScriptTranspile));
    watcher.on(`add`, function (path) { debug(`${path} added.`); });
    watcher.on(`change`, function (path) { debug(`${path} changed.`); });
    watcher.on(`unlink`, function (path) { debug(`${path} removed.`); });
    next();
}

elementScriptTranspileWatch.description = `Watch Polymer elements scripts transpile.`;


export function elementMarkupTranspile() {
    return obj([
        src(config.elements.markups),
        newer(config.dest),
        polymerPostcss([
            autoprefixer({ browsers: [`last 2 versions`] })
        ]),
        polymerBabel({
            presets: [`es2015`]
        }),
        rename({
            extname: `.html`
        }),
        dest(config.dest)
    ]).on(`error`, console.error.bind(console));
}

elementMarkupTranspile.description = `Polymer elements markups transpile.`;


export function elementMarkupTranspileWatch(next) {
    let watcher = watch(config.elements.markups, series(elementMarkupTranspile));
    watcher.on(`add`, function (path) { debug(`${path} added.`); });
    watcher.on(`change`, function (path) { debug(`${path} changed.`); });
    watcher.on(`unlink`, function (path) { debug(`${path} removed.`); });
    next();
}

elementMarkupTranspileWatch.description = `Watch Polymer elements markups transpile.`;


export function elementStyleTranspile() {
    return obj([
        src(config.elements.styles),
        newer(config.dest),
        postcss([
            autoprefixer({ browsers: [`last 2 versions`] })
        ]),
        rename({
            extname: `.css`
        }),
        dest(config.dest)
    ]).on(`error`, console.error.bind(console));
}

elementStyleTranspile.description = `Polymer elements markups transpile.`;


export function elementStyleTranspileWatch(next) {
    let watcher = watch(config.elements.styles, series(elementStyleTranspile));
    watcher.on(`add`, function (path) { debug(`${path} added.`); });
    watcher.on(`change`, function (path) { debug(`${path} changed.`); });
    watcher.on(`unlink`, function (path) { debug(`${path} removed.`); });
    next();
}

elementStyleTranspileWatch.description = `Watch Polymer elements markups transpile.`;