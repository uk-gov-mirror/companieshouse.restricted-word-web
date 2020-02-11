"use strict";

const proxyUrl = new URL(process.env.HTTPS_PROXY);

const config = {
    port: process.env.RESTRICTED_WORD_ADMIN_WEB_PORT,
    apiAddress: process.env.RESTRICTED_WORD_ADMIN_WEB_API_URL,
    internalApiKey: process.env.INTERNAL_API_KEY,
    proxy: {
        host: proxyUrl.hostname,
        port: proxyUrl.port
    },
    env: (process.env.NODE_ENV || "development").toLowerCase()
};

export = config;
