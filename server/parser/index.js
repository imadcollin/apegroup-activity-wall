import fs from 'fs';
import handlebars from 'handlebars';
import uaParser from 'ua-parser-js';
import path from 'path';

const index = path.resolve(`${__dirname}/../../www/index.html`);

export default function parser(req, res) {
    fs.readFile(index, function read(error, data) {
        if (error) {
            throw error;
        } else {
            let ua = uaParser(req.headers[`user-agent`]) || ``;
            let template = handlebars.compile(data.toString());
            let context = {
                os: `${ua.os.name}`.toLowerCase(),
                browser: `${ua.browser.name}`.toLowerCase(),
                browserVersion: `${ua.browser.version}`.toLowerCase(),
                browserGeneration: function () {
                    console.log(JSON.stringify(ua));
                    if (typeof ua.browser.name === `undefined`) {
                        console.log(12);
                    } else {

                        if (ua.browser.name.toLowerCase() === `chrome`) {
                            if (parseInt(ua.browser.version.split(`.`)) >= 50) {
                                return `modern`;
                            }
                        }
                        if (ua.browser.name.toLowerCase() === `edge`) {
                            if (ua.browser.version >= 12) {
                                return `modern`;
                            }
                        }
                    }
                    return undefined;
                }
            };
            res.writeHeader(200, { "Content-Type": `text/html` });
            res.write(template(context));
            res.end();
        }
    });
}