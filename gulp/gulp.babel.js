import {series, parallel} from 'gulp';

import {clean} from './tasks/clean';
import {sync} from './tasks/sync';
import {localesList} from './tasks/locales';
import {font} from './tasks/font';
import {internationalise} from './tasks/internationalise';
import {
    elementStyleTranspile, elementStyleTranspileWatch,
    elementMarkupTranspile, elementMarkupTranspileWatch,
    elementScriptTranspile, elementScriptTranspileWatch,
    componentMarkupTranspile, componentMarkupTranspileWatch,
    componentStyleTranspile, componentStyleTranspileWatch,
    componentScriptTranspile, componentScriptTranspileWatch
} from './tasks/transpile';

export {sync};
export {localesList};
export {font};
export {internationalise};

export const start = parallel(
    series(localesList),
    series(elementStyleTranspile, elementStyleTranspileWatch),
    series(elementMarkupTranspile, elementMarkupTranspileWatch),
    series(elementScriptTranspile, elementScriptTranspileWatch),
    series(componentMarkupTranspile, componentMarkupTranspileWatch),
    series(componentStyleTranspile, componentStyleTranspileWatch),
    series(componentScriptTranspile, componentScriptTranspileWatch)
);

export const build = parallel(
    elementStyleTranspile,
    elementMarkupTranspile,
    elementScriptTranspile,
    componentMarkupTranspile,
    componentStyleTranspile,
    componentScriptTranspile
);

export default series(clean, start);