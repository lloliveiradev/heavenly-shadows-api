"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = exports.createNestServer = void 0;
const core_1 = require("@nestjs/core");
const platform_express_1 = require("@nestjs/platform-express");
const app_module_1 = require("./app.module");
const functions = require("firebase-functions");
const express = require("express");
const server = express();
const createNestServer = async (expressInstance) => {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, new platform_express_1.ExpressAdapter(expressInstance));
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    await app.init();
    return app;
};
exports.createNestServer = createNestServer;
(0, exports.createNestServer)(server)
    .then(() => console.log('Nest Ready'))
    .catch((err) => console.error('Nest broken', err));
exports.api = functions.https.onRequest(server);
//# sourceMappingURL=index.js.map