`use strict`;

export const ENV = process.env.ENV;
export const DEBUG = process.env.DEBUG === `true`;

let module = {
    ENV,
    DEBUG
};

export default module;