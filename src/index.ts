import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import * as functions from 'firebase-functions';
import * as express from 'express';

const server = express();

export const createNestServer = async (expressInstance) => {
    const app = await NestFactory.create(
        AppModule,
        new ExpressAdapter(expressInstance),
    );
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    await app.init();
    return app;
};

createNestServer(server)
    .then(() => console.log('Nest Ready'))
    .catch((err) => console.error('Nest broken', err));

export const api = functions.https.onRequest(server);
