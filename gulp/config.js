export let config = {
    cwd: `./..`,
    elements: {
        scripts: [
            `./client/+(elements)/**/*.js`
        ],
        styles: [
            `./client/+(elements)/**/*.css`
        ],
        markups: [
            `./client/+(components|shared|elements)/**/*.html`
        ]
    },
    components: {
        scripts: [
            `./client/+(components|shared)/**/*.js`
        ],
        styles: [
            `./client/+(components|shared)/**/*.css`
        ],
        markups: [
            `./client/+(components)/**/*.html`,
            `./client/index.html`
        ]
    },
    data: `./www/assets/data`,
    api: {
        url: `api.phraseapp.com/api/v2`,
        projectId: `2bb0a495c85a79d155bf38af80448e60`,
        fileFormat: `nested_json`,
        accessToken: `9220d73a14d176f6a687f45913a0cf64583a9b5c25b0a9436ad3c036396ffd11`
    },
    css: [
        `./client/+(components|elements)/**/*.css`],
    client: {
        test: {
            unit: [
                `./client/**/*.unit.test.js`
            ],
            web: [
                `./client/**/*.web.test.js`
            ],
            e2e: [
                `./client/+(components|elements|shared)/**/*.e2e.test.js`,
                `./client/index.e2e.test.js`
            ]
        }
    },
    server: {
        test: {
            unit: [
                `./server/**/*.test.js`
            ]
        }
    },
    assets: `client/assets/**/*.*`,
    libs: `client/assets/libs/**/*.{html, js}`,
    fonts: `client/assets/fonts/**/*.{ttf, otf}`,
    icons: `client/assets/icons/**/*.{svg}`,
    images: `client/assets/images/**/*.{jpeg, jpg, png}`,
    vectors: `client/assets/vectors/**/*.{svg}`,
    root: `client/assets/root/**/*.*`,
    src: `./client`,
    dest: `./www`
};

export default config;
